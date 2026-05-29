<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Blog;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class BlogController extends Controller
{
    public function index(Request $request): JsonResponse
    {
        $query = Blog::where('is_published', true);

        if ($request->filled('category')) {
            $query->where('category', $request->category);
        }

        $blogs = $query
            ->orderByRaw('COALESCE(`date`, `created_at`) DESC')
            ->orderByDesc('created_at')
            ->get()
            ->map(fn (Blog $blog): array => $this->formatBlog($blog));

        return response()->json($blogs);
    }

    public function show(string $slug): JsonResponse
    {
        $blog = Blog::where('slug', $slug)
            ->where('is_published', true)
            ->firstOrFail();

        return response()->json($this->formatBlog($blog, includeContent: true));
    }

    public function categories(): JsonResponse
    {
        $categories = Blog::where('is_published', true)
            ->whereNotNull('category')
            ->distinct()
            ->pluck('category');

        return response()->json($categories);
    }

    private function formatBlog(Blog $blog, bool $includeContent = false): array
    {
        return [
            'id' => $blog->id,
            'title' => $blog->title,
            'slug' => $blog->slug,
            'description' => $blog->description,
            'content' => $includeContent ? $blog->content : null,
            'image' => $blog->image,
            'image_url' => $this->publicImageUrl($blog->image),
            'image_alt' => $blog->image_alt,
            'category' => $blog->category,
            'tags' => $blog->tags ?? [],
            'keywords' => $blog->keywords ?? [],
            'date' => $blog->date?->toDateString() ?? $blog->created_at?->toDateString(),
            'author' => $blog->author,
            'created_at' => $blog->created_at?->toISOString(),
            'updated_at' => $blog->updated_at?->toISOString(),
        ];
    }

    private function publicImageUrl(?string $image): ?string
    {
        if (blank($image)) {
            return null;
        }

        if (str_starts_with($image, '/') || str_starts_with($image, 'http://') || str_starts_with($image, 'https://')) {
            return $image;
        }

        return '/storage/' . ltrim($image, '/');
    }
}
