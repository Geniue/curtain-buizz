<?php

namespace App\Filament\Resources\Blogs\Schemas;

use Filament\Forms\Components\DatePicker;
use Filament\Forms\Components\FileUpload;
use Filament\Forms\Components\RichEditor;
use Filament\Forms\Components\Select;
use Filament\Forms\Components\TagsInput;
use Filament\Forms\Components\TextInput;
use Filament\Forms\Components\Toggle;
use Filament\Schemas\Components\Grid;
use Filament\Schemas\Components\Section;
use Filament\Schemas\Schema;
use Illuminate\Support\Str;

class BlogForm
{
    public static function configure(Schema $schema): Schema
    {
        return $schema
            ->components([
                Section::make('محتوى المقال')
                    ->schema([
                        TextInput::make('title')
                            ->label('العنوان')
                            ->required()
                            ->maxLength(255)
                            ->live(onBlur: true)
                            ->afterStateUpdated(fn ($state, callable $set) => $set('slug', Str::slug($state))),
                        TextInput::make('slug')
                            ->label('الرابط')
                            ->required()
                            ->unique(ignoreRecord: true),
                        TextInput::make('description')
                            ->label('الوصف')
                            ->required()
                            ->maxLength(500),
                        RichEditor::make('content')
                            ->label('المحتوى')
                            ->required()
                            ->columnSpanFull(),
                    ]),
                Section::make('الصورة')
                    ->schema([
                        FileUpload::make('image')
                            ->label('صورة المقال')
                            ->image()
                            ->directory('blog-images')
                            ->imageResizeMode('cover')
                            ->imageCropAspectRatio('16:9'),
                        TextInput::make('image_alt')
                            ->label('وصف الصورة')
                            ->maxLength(255),
                    ]),
                Section::make('التصنيف والكلمات')
                    ->schema([
                        Grid::make(2)->schema([
                            Select::make('category')
                                ->label('التصنيف')
                                ->options([
                                    'تنجيد' => 'تنجيد',
                                    'ستائر' => 'ستائر',
                                    'مراتب' => 'مراتب',
                                    'مفروشات' => 'مفروشات',
                                ])
                                ->required()
                                ->default('تنجيد'),
                            TextInput::make('author')
                                ->label('الكاتب')
                                ->required()
                                ->default('الأشقاء'),
                        ]),
                        TagsInput::make('tags')
                            ->label('الوسوم')
                            ->separator(','),
                        TagsInput::make('keywords')
                            ->label('الكلمات المفتاحية')
                            ->separator(','),
                    ]),
                Section::make('النشر')
                    ->schema([
                        Grid::make(2)->schema([
                            DatePicker::make('date')
                                ->label('تاريخ النشر')
                                ->required()
                                ->default(now()),
                            Toggle::make('is_published')
                                ->label('منشور')
                                ->default(false),
                        ]),
                    ]),
            ]);
    }
}
