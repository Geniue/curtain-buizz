<?php

namespace Tests\Feature;

use App\Models\Category;
use App\Models\Product;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

/**
 * The public storefront now reads these endpoints directly, so their contract
 * is what keeps the CMS connected to the website.
 */
class ShopApiTest extends TestCase
{
    use RefreshDatabase;

    private function category(array $overrides = []): Category
    {
        return Category::create(array_merge([
            'name' => 'ركنات',
            'slug' => 'ركنات',
            'description' => 'ركنات مودرن',
            'sort_order' => 1,
            'is_active' => true,
        ], $overrides));
    }

    private function product(Category $category, array $overrides = []): Product
    {
        return Product::create(array_merge([
            'name' => 'ركنة مودرن حرف L قماش قطيفة',
            'slug' => 'modern-l-shape-velvet-corner-sofa',
            'short_description' => 'ركنة مودرن حرف L',
            'description' => 'وصف كامل',
            'price' => 22000,
            'old_price' => 28000,
            'sku' => 'RK-L-VELVET-001',
            'images' => ['products/01M0Q00AETN6ATN29BAGTYT6SE.jpeg'],
            'category_id' => $category->id,
            'stock' => 10,
            'is_featured' => true,
            'is_active' => true,
            'seo_title' => 'ركنة مودرن حرف L',
            'seo_description' => 'اشتري ركنة مودرن',
            'seo_keywords' => ['ركنة مودرن'],
            'specifications' => ['القماش' => 'قطيفة'],
            'sort_order' => 1,
        ], $overrides));
    }

    public function test_a_newly_created_product_is_returned_by_the_listing(): void
    {
        $this->product($this->category());

        $response = $this->getJson('/api/shop/products?limit=100')->assertOk();

        $this->assertSame(1, $response->json('total'));
        $this->assertSame('modern-l-shape-velvet-corner-sofa', $response->json('data.0.slug'));
        // The storefront relies on the eager-loaded category for its labels.
        $this->assertSame('ركنات', $response->json('data.0.category.name'));
    }

    public function test_upload_paths_are_returned_untouched_for_the_frontend_to_normalize(): void
    {
        $this->product($this->category());

        $this->getJson('/api/shop/products?limit=100')
            ->assertOk()
            ->assertJsonPath('data.0.images.0', 'products/01M0Q00AETN6ATN29BAGTYT6SE.jpeg');
    }

    /** J. */
    public function test_inactive_products_are_never_public(): void
    {
        $category = $this->category();
        $this->product($category, ['slug' => 'active-one', 'sku' => 'A-1']);
        $this->product($category, [
            'slug' => 'hidden-one',
            'sku' => 'H-1',
            'is_active' => false,
        ]);

        $slugs = collect($this->getJson('/api/shop/products?limit=100')->json('data'))
            ->pluck('slug')
            ->all();

        $this->assertContains('active-one', $slugs);
        $this->assertNotContains('hidden-one', $slugs);

        $this->getJson('/api/shop/products/hidden-one')->assertStatus(404);
    }

    /** K. */
    public function test_category_counts_come_from_the_database_and_exclude_inactive(): void
    {
        $corners = $this->category();
        $curtains = $this->category(['name' => 'ستائر', 'slug' => 'ستائر', 'sort_order' => 2]);

        $this->product($corners, ['slug' => 'c-1', 'sku' => 'C-1']);
        $this->product($corners, ['slug' => 'c-2', 'sku' => 'C-2']);
        $this->product($corners, ['slug' => 'c-3', 'sku' => 'C-3', 'is_active' => false]);
        $this->product($curtains, ['slug' => 'k-1', 'sku' => 'K-1']);

        $response = $this->getJson('/api/shop/categories')->assertOk();

        $counts = collect($response->json())->pluck('products_count', 'slug');

        $this->assertSame(2, $counts['ركنات']);
        $this->assertSame(1, $counts['ستائر']);
    }

    /** L. */
    public function test_product_detail_returns_the_product_with_related_items(): void
    {
        $category = $this->category();
        $product = $this->product($category);
        $this->product($category, ['slug' => 'sibling', 'sku' => 'S-1']);

        $response = $this->getJson('/api/shop/products/modern-l-shape-velvet-corner-sofa')->assertOk();

        $this->assertSame($product->id, $response->json('product.id'));
        $this->assertSame('ركنات', $response->json('product.category.name'));
        $this->assertSame(['sibling'], collect($response->json('related'))->pluck('slug')->all());
    }

    public function test_related_products_exclude_inactive_and_the_product_itself(): void
    {
        $category = $this->category();
        $this->product($category);
        $this->product($category, ['slug' => 'hidden-sibling', 'sku' => 'HS-1', 'is_active' => false]);

        $related = collect(
            $this->getJson('/api/shop/products/modern-l-shape-velvet-corner-sofa')->json('related')
        )->pluck('slug')->all();

        $this->assertSame([], $related);
    }

    /** M. SEO fields must survive the API boundary. */
    public function test_seo_fields_are_exposed_for_metadata(): void
    {
        $this->product($this->category(), [
            'seo_title' => 'عنوان سيو',
            'seo_description' => 'وصف سيو',
            'seo_keywords' => ['كلمة', 'أخرى'],
        ]);

        $this->getJson('/api/shop/products/modern-l-shape-velvet-corner-sofa')
            ->assertOk()
            ->assertJsonPath('product.seo_title', 'عنوان سيو')
            ->assertJsonPath('product.seo_description', 'وصف سيو')
            ->assertJsonPath('product.seo_keywords', ['كلمة', 'أخرى']);
    }

    public function test_a_missing_slug_returns_404_so_the_page_can_render_not_found(): void
    {
        $this->getJson('/api/shop/products/no-such-product')->assertStatus(404);
    }

    /** Requirement 10: price and stock stay server-authoritative. */
    public function test_checkout_prices_the_order_from_the_database_not_the_client(): void
    {
        $product = $this->product($this->category(), ['price' => 100, 'old_price' => null, 'stock' => 5]);

        $response = $this->postJson('/api/shop/checkout', [
            'customer_name' => 'عميل اختبار',
            'customer_phone' => '01105001387',
            'customer_address' => 'عنوان الاختبار',
            'city' => 'القاهرة',
            'payment_method' => 'cod',
            'items' => [['product_id' => $product->id, 'quantity' => 2, 'price' => 1]],
        ])->assertStatus(201);

        $this->assertSame('200.00', $response->json('order.subtotal'));
        $this->assertSame('350.00', $response->json('order.total'));
        $this->assertSame('100.00', $response->json('order.items.0.price'));
    }

    public function test_checkout_rejects_quantities_above_available_stock(): void
    {
        $product = $this->product($this->category(), ['stock' => 1]);

        $this->postJson('/api/shop/checkout', [
            'customer_name' => 'عميل اختبار',
            'customer_phone' => '01105001387',
            'customer_address' => 'عنوان الاختبار',
            'city' => 'القاهرة',
            'payment_method' => 'cod',
            'items' => [['product_id' => $product->id, 'quantity' => 5]],
        ])->assertStatus(400);
    }

    public function test_checkout_rejects_an_unknown_product_id(): void
    {
        $this->postJson('/api/shop/checkout', [
            'customer_name' => 'عميل اختبار',
            'customer_phone' => '01105001387',
            'customer_address' => 'عنوان الاختبار',
            'city' => 'القاهرة',
            'payment_method' => 'cod',
            'items' => [['product_id' => 999999, 'quantity' => 1]],
        ])->assertStatus(422);
    }
}
