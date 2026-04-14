<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Product extends Model
{
    use HasFactory;

    protected $fillable = [
        'name', 'slug', 'short_description', 'description', 'price', 'old_price',
        'sku', 'images', 'category_id', 'stock', 'is_featured', 'is_active',
        'seo_title', 'seo_description', 'seo_keywords', 'specifications', 'sort_order',
    ];

    protected $casts = [
        'images' => 'array',
        'seo_keywords' => 'array',
        'specifications' => 'array',
        'is_featured' => 'boolean',
        'is_active' => 'boolean',
        'price' => 'decimal:2',
        'old_price' => 'decimal:2',
    ];

    public function category(): BelongsTo
    {
        return $this->belongsTo(Category::class);
    }

    public function getDiscountPercentAttribute(): ?int
    {
        if ($this->old_price && $this->old_price > $this->price) {
            return (int) round((($this->old_price - $this->price) / $this->old_price) * 100);
        }
        return null;
    }

    public function getMainImageAttribute(): ?string
    {
        return $this->images[0] ?? null;
    }
}
