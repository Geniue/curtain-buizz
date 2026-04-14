<?php

namespace App\Filament\Resources\Shop\Schemas;

use App\Models\Category;
use Filament\Forms\Components\FileUpload;
use Filament\Forms\Components\KeyValue;
use Filament\Forms\Components\RichEditor;
use Filament\Forms\Components\Select;
use Filament\Forms\Components\TagsInput;
use Filament\Forms\Components\TextInput;
use Filament\Forms\Components\Toggle;
use Filament\Schemas\Components\Grid;
use Filament\Schemas\Components\Section;
use Filament\Schemas\Schema;
use Illuminate\Support\Str;

class ProductForm
{
    public static function configure(Schema $schema): Schema
    {
        return $schema
            ->components([
                Section::make('بيانات المنتج')
                    ->schema([
                        TextInput::make('name')
                            ->label('اسم المنتج')
                            ->required()
                            ->maxLength(255)
                            ->live(onBlur: true)
                            ->afterStateUpdated(fn ($state, callable $set) => $set('slug', Str::slug($state))),
                        TextInput::make('slug')
                            ->label('الرابط')
                            ->required()
                            ->unique(ignoreRecord: true),
                        TextInput::make('short_description')
                            ->label('وصف مختصر')
                            ->maxLength(500),
                        RichEditor::make('description')
                            ->label('الوصف التفصيلي')
                            ->columnSpanFull(),
                    ]),
                Section::make('السعر والمخزون')
                    ->schema([
                        Grid::make(3)->schema([
                            TextInput::make('price')
                                ->label('السعر (ج.م)')
                                ->required()
                                ->numeric()
                                ->prefix('ج.م'),
                            TextInput::make('old_price')
                                ->label('السعر القديم')
                                ->numeric()
                                ->prefix('ج.م'),
                            TextInput::make('stock')
                                ->label('المخزون')
                                ->required()
                                ->numeric()
                                ->default(0),
                        ]),
                        Grid::make(2)->schema([
                            TextInput::make('sku')
                                ->label('كود المنتج (SKU)')
                                ->unique(ignoreRecord: true),
                            Select::make('category_id')
                                ->label('التصنيف')
                                ->options(Category::pluck('name', 'id'))
                                ->searchable(),
                        ]),
                    ]),
                Section::make('الصور')
                    ->schema([
                        FileUpload::make('images')
                            ->label('صور المنتج')
                            ->image()
                            ->multiple()
                            ->reorderable()
                            ->directory('products')
                            ->imageResizeMode('cover')
                            ->maxSize(5120)
                            ->maxFiles(10),
                    ]),
                Section::make('المواصفات')
                    ->schema([
                        KeyValue::make('specifications')
                            ->label('المواصفات')
                            ->keyLabel('المواصفة')
                            ->valueLabel('القيمة')
                            ->reorderable(),
                    ])->collapsible(),
                Section::make('تحسين محركات البحث (SEO)')
                    ->schema([
                        TextInput::make('seo_title')
                            ->label('عنوان SEO'),
                        TextInput::make('seo_description')
                            ->label('وصف SEO')
                            ->maxLength(500),
                        TagsInput::make('seo_keywords')
                            ->label('كلمات مفتاحية'),
                    ])->collapsible(),
                Section::make('الإعدادات')
                    ->schema([
                        Grid::make(3)->schema([
                            Toggle::make('is_active')
                                ->label('نشط')
                                ->default(true),
                            Toggle::make('is_featured')
                                ->label('مميز')
                                ->default(false),
                            TextInput::make('sort_order')
                                ->label('ترتيب العرض')
                                ->numeric()
                                ->default(0),
                        ]),
                    ]),
            ]);
    }
}
