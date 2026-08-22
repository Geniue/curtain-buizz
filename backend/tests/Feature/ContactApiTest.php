<?php

namespace Tests\Feature;

use App\Models\ContactMessage;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class ContactApiTest extends TestCase
{
    use RefreshDatabase;

    /**
     * The production defect: POST /api/contact returned 404 because the endpoint
     * only existed as a Next.js route handler, inside the /api namespace that the
     * reverse proxy hands to Laravel. Guard the route's existence explicitly.
     */
    public function test_contact_endpoint_is_registered_and_does_not_return_404(): void
    {
        $response = $this->postJson('/api/contact', []);

        $this->assertNotSame(404, $response->status(), 'POST /api/contact must be routed by Laravel.');
        $response->assertStatus(422);
    }

    public function test_valid_submission_is_accepted_and_persisted(): void
    {
        $response = $this->postJson('/api/contact', [
            'name' => 'اختبار',
            'email' => 'test@example.com',
            'subject' => 'استفسار عن تنجيد ركنة',
            'message' => 'أرجو التواصل معي لتحديد موعد معاينة.',
        ]);

        $response->assertStatus(201)
            ->assertJson(['success' => true]);

        $this->assertDatabaseHas('contact_messages', [
            'email' => 'test@example.com',
            'subject' => 'استفسار عن تنجيد ركنة',
            'is_read' => false,
        ]);
    }

    public function test_message_is_optional(): void
    {
        $this->postJson('/api/contact', [
            'name' => 'اختبار',
            'email' => 'test@example.com',
            'subject' => 'استفسار',
        ])->assertStatus(201);

        $this->assertSame(1, ContactMessage::count());
    }

    public function test_missing_required_fields_fail_validation_and_persist_nothing(): void
    {
        $this->postJson('/api/contact', ['message' => 'رسالة بدون بيانات'])
            ->assertStatus(422)
            ->assertJsonStructure(['errors' => ['name', 'email', 'subject']]);

        $this->assertSame(0, ContactMessage::count());
    }

    public function test_invalid_email_is_rejected(): void
    {
        $this->postJson('/api/contact', [
            'name' => 'اختبار',
            'email' => 'not-an-email',
            'subject' => 'استفسار',
        ])->assertStatus(422)
            ->assertJsonStructure(['errors' => ['email']]);

        $this->assertSame(0, ContactMessage::count());
    }

    public function test_endpoint_is_stateless_and_needs_no_csrf_token(): void
    {
        // The Arabic frontend posts cross-origin JSON with no CSRF token.
        $this->postJson('/api/contact', [
            'name' => 'اختبار',
            'email' => 'test@example.com',
            'subject' => 'استفسار',
        ])->assertStatus(201);
    }

    public function test_submitting_once_creates_exactly_one_record(): void
    {
        $this->postJson('/api/contact', [
            'name' => 'اختبار',
            'email' => 'dup@example.com',
            'subject' => 'استفسار',
        ])->assertStatus(201);

        $this->assertSame(1, ContactMessage::where('email', 'dup@example.com')->count());
    }
}
