<?php

namespace Tests\Feature;

use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use PHPUnit\Framework\Attributes\DataProvider;
use Livewire\Mechanisms\HandleRequests\EndpointResolver;
use Tests\TestCase;

class AdminPanelTest extends TestCase
{
    use RefreshDatabase;

    private function admin(): User
    {
        return User::factory()->create();
    }

    public function test_guest_is_redirected_to_login(): void
    {
        $this->get('/admin')->assertRedirect('/admin/login');
    }

    public function test_authorized_admin_can_load_the_dashboard(): void
    {
        $this->actingAs($this->admin())
            ->get('/admin')
            ->assertOk();
    }

    /**
     * The panel rendered as an empty shell in production, so assert the
     * navigation entries are actually present in the dashboard markup.
     */
    public function test_dashboard_renders_navigation_for_registered_resources(): void
    {
        $this->actingAs($this->admin())
            ->get('/admin')
            ->assertOk()
            ->assertSee('admin/blogs')
            ->assertSee('admin/galleries')
            ->assertSee('admin/shop/products')
            ->assertSee('admin/contact-messages');
    }

    #[DataProvider('resourcePages')]
    public function test_representative_resource_pages_are_accessible(string $path): void
    {
        $this->actingAs($this->admin())
            ->get($path)
            ->assertOk();
    }

    public static function resourcePages(): array
    {
        return [
            'blogs' => ['/admin/blogs'],
            'galleries' => ['/admin/galleries'],
            'products' => ['/admin/shop/products'],
            'orders' => ['/admin/shop/orders'],
            'categories' => ['/admin/shop/categories'],
            'contact messages' => ['/admin/contact-messages'],
        ];
    }

    /**
     * Regression guard for the admin defect: Livewire v4 serves its JS from an
     * APP_KEY-derived prefix (/livewire-<hash>/livewire.min.js). In production
     * that URI fell through the reverse proxy to Next.js and 404'd, so Alpine
     * never booted and Filament's .fi-main-ctn stayed at opacity:0.
     *
     * Assert the app really does serve the exact URI it advertises, and that the
     * URI carries the hashed prefix the proxy must forward.
     */
    public function test_livewire_asset_uri_is_hashed_and_served_by_the_application(): void
    {
        $scriptPath = EndpointResolver::scriptPath(minified: ! config('app.debug'));

        $this->assertMatchesRegularExpression(
            '#^/livewire-[0-9a-f]{8}/livewire(\.min)?\.js$#',
            $scriptPath,
            'Livewire v4 must expose its script under the hashed prefix the proxy forwards.'
        );

        $this->get($scriptPath)
            ->assertOk()
            ->assertHeader('content-type', 'application/javascript; charset=utf-8');
    }

    public function test_livewire_update_and_upload_endpoints_share_the_hashed_prefix(): void
    {
        $prefix = EndpointResolver::prefix();

        $this->assertSame($prefix.'/update', EndpointResolver::updatePath());
        $this->assertSame($prefix.'/upload-file', EndpointResolver::uploadPath());
    }
}
