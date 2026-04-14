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

        if ($request->has('category')) {
            $query->where('category', $request->category);
        }

        $blogs = $query->orderBy('date', 'desc')->get();

        return response()->json($blogs);
    }

    public function show(string $slug): JsonResponse
    {
        $blog = Blog::where('slug', $slug)
            ->where('is_published', true)
            ->firstOrFail();

        return response()->json($blog);
    }

    public function categories(): JsonResponse
    {
        $categories = Blog::where('is_published', true)
            ->distinct()
            ->pluck('category');

        return response()->json($categories);
    }
}
