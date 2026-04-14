<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Blog extends Model
{
    /** @use HasFactory<\Database\Factories\BlogFactory> */
    use HasFactory;

    protected $fillable = [
        'title',
        'slug',
        'description',
        'content',
        'image',
        'image_alt',
        'category',
        'tags',
        'keywords',
        'date',
        'author',
        'is_published',
    ];

    protected $casts = [
        'tags' => 'array',
        'keywords' => 'array',
        'date' => 'date',
        'is_published' => 'boolean',
    ];
}
