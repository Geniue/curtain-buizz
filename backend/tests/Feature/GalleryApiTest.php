<?php

namespace Tests\Feature;

use App\Models\Gallery;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class GalleryApiTest extends TestCase
{
    use RefreshDatabase;

    private function item(array $overrides = []): Gallery
    {
        static $n = 0;
        $n++;

        return Gallery::create(array_merge([
            'title' => "صورة {$n}",
            'slug' => "gallery-item-{$n}",
            'description' => 'وصف الصورة',
            'image' => "gallery/upload-{$n}.jpeg",
            'category' => 'ركنات',
            'alt_text' => "نص بديل {$n}",
            'sort_order' => $n,
            'is_active' => true,
            'show_on_home' => false,
        ], $overrides));
    }

    public function test_active_items_are_listed_with_upload_paths_intact(): void
    {
        $this->item(['image' => 'gallery/upload-a.jpeg']);

        $response = $this->getJson('/api/gallery?limit=200')->assertOk();

        $this->assertSame(1, $response->json('total'));
        $this->assertSame('gallery/upload-a.jpeg', $response->json('data.0.image'));
        $this->assertArrayHasKey('alt_text', $response->json('data.0'));
    }

    public function test_inactive_items_are_never_public(): void
    {
        $this->item(['slug' => 'visible-item']);
        $this->item(['slug' => 'hidden-item', 'is_active' => false]);

        $slugs = collect($this->getJson('/api/gallery?limit=200')->json('data'))
            ->pluck('slug')
            ->all();

        $this->assertContains('visible-item', $slugs);
        $this->assertNotContains('hidden-item', $slugs);
    }

    public function test_homepage_endpoint_returns_only_items_flagged_for_home(): void
    {
        $this->item(['slug' => 'on-home', 'show_on_home' => true]);
        $this->item(['slug' => 'not-on-home', 'show_on_home' => false]);
        $this->item(['slug' => 'inactive-home', 'show_on_home' => true, 'is_active' => false]);

        $slugs = collect($this->getJson('/api/gallery/home')->json())->pluck('slug')->all();

        $this->assertSame(['on-home'], $slugs);
    }

    public function test_items_follow_admin_sort_order(): void
    {
        $this->item(['slug' => 'third', 'sort_order' => 30]);
        $this->item(['slug' => 'first', 'sort_order' => 10]);
        $this->item(['slug' => 'second', 'sort_order' => 20]);

        $slugs = collect($this->getJson('/api/gallery?limit=200')->json('data'))
            ->pluck('slug')
            ->all();

        $this->assertSame(['first', 'second', 'third'], $slugs);
    }

    public function test_category_counts_exclude_inactive_items(): void
    {
        $this->item(['category' => 'ركنات']);
        $this->item(['category' => 'ركنات']);
        $this->item(['category' => 'ستائر']);
        $this->item(['category' => 'ستائر', 'is_active' => false]);

        $counts = collect($this->getJson('/api/gallery/categories')->json())
            ->pluck('count', 'category');

        $this->assertSame(2, $counts['ركنات']);
        $this->assertSame(1, $counts['ستائر']);
    }

    public function test_filtering_by_category_returns_only_that_category(): void
    {
        $this->item(['category' => 'ركنات', 'slug' => 'corner-one']);
        $this->item(['category' => 'ستائر', 'slug' => 'curtain-one']);

        $slugs = collect($this->getJson('/api/gallery?category=' . urlencode('ستائر'))->json('data'))
            ->pluck('slug')
            ->all();

        $this->assertSame(['curtain-one'], $slugs);
    }
}
