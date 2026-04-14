<?php

namespace Database\Factories;

use App\Models\Blog;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<Blog>
 */
class BlogFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $title = fake()->sentence(6);
        return [
            'title' => $title,
            'slug' => \Illuminate\Support\Str::slug($title),
            'description' => fake()->paragraph(),
            'content' => fake()->paragraphs(5, true),
            'image' => null,
            'image_alt' => $title,
            'category' => fake()->randomElement(['تنجيد', 'ستائر', 'مراتب', 'مفروشات']),
            'tags' => [fake()->word(), fake()->word(), fake()->word()],
            'keywords' => [fake()->word(), fake()->word()],
            'date' => fake()->date(),
            'author' => 'الأشقاء',
            'is_published' => true,
        ];
    }
}
