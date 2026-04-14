<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('blogs', function (Blueprint $table) {
            $table->id();
            $table->string('title');
            $table->string('slug')->unique();
            $table->string('description', 500);
            $table->longText('content');
            $table->string('image')->nullable();
            $table->string('image_alt')->nullable();
            $table->string('category')->default('تنجيد');
            $table->json('tags')->nullable();
            $table->json('keywords')->nullable();
            $table->date('date');
            $table->string('author')->default('الأشقاء');
            $table->boolean('is_published')->default(false);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('blogs');
    }
};
