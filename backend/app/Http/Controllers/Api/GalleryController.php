<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Gallery;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class GalleryController extends Controller
{
    public function index(Request $request): JsonResponse
    {
        $query = Gallery::active()->orderBy('sort_order')->orderByDesc('created_at');

        if ($request->filled('category') && $request->category !== 'الكل') {
            $query->where('category', $request->category);
        }

        $galleries = $query->paginate($request->get('limit', 12));

        return response()->json($galleries);
    }

    public function home(): JsonResponse
    {
        $galleries = Gallery::active()
            ->home()
            ->orderBy('sort_order')
            ->orderByDesc('created_at')
            ->limit(15)
            ->get();

        return response()->json($galleries);
    }

    public function categories(): JsonResponse
    {
        $categories = Gallery::active()
            ->select('category')
            ->selectRaw('count(*) as count')
            ->groupBy('category')
            ->orderByDesc('count')
            ->get();

        return response()->json($categories);
    }
}
