<?php

namespace App\Filament\Resources;

use App\Filament\Resources\GalleryResource\Pages\ListGalleries;
use App\Filament\Resources\GalleryResource\Pages\CreateGallery;
use App\Filament\Resources\GalleryResource\Pages\EditGallery;
use App\Models\Gallery;
use Filament\Forms\Components\FileUpload;
use Filament\Forms\Components\Select;
use Filament\Forms\Components\TextInput;
use Filament\Forms\Components\Toggle;
use Filament\Forms\Components\Textarea;
use Filament\Schemas\Components\Section;
use Filament\Schemas\Components\Grid;
use Filament\Resources\Resource;
use Filament\Schemas\Schema;
use Filament\Support\Icons\Heroicon;
use Filament\Tables\Columns\IconColumn;
use Filament\Tables\Columns\ImageColumn;
use Filament\Tables\Columns\TextColumn;
use Filament\Tables\Filters\SelectFilter;
use Filament\Tables\Filters\TernaryFilter;
use Filament\Tables\Table;
use Filament\Actions\EditAction;
use Filament\Actions\DeleteBulkAction;
use Filament\Actions\BulkActionGroup;
use Illuminate\Support\Str;

class GalleryResource extends Resource
{
    protected static ?string $model = Gallery::class;

    protected static string|\BackedEnum|null $navigationIcon = Heroicon::OutlinedPhoto;

    protected static ?string $modelLabel = 'صورة';

    protected static ?string $pluralModelLabel = 'معرض الأعمال';

    protected static ?string $navigationLabel = 'معرض الأعمال';

    protected static ?int $navigationSort = 4;

    public static function form(Schema $schema): Schema
    {
        return $schema->components([
            Section::make('بيانات الصورة')->schema([
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
                Textarea::make('description')
                    ->label('الوصف')
                    ->rows(3),
                FileUpload::make('image')
                    ->label('الصورة')
                    ->image()
                    ->required()
                    ->directory('gallery')
                    ->imageResizeMode('cover')
                    ->maxSize(5120),
                TextInput::make('alt_text')
                    ->label('النص البديل (Alt)')
                    ->helperText('مهم لتحسين محركات البحث SEO')
                    ->maxLength(255),
                Select::make('category')
                    ->label('التصنيف')
                    ->options([
                        'ركن وستائر' => 'ركن وستائر',
                        'ستائر' => 'ستائر',
                        'انتريهات' => 'انتريهات',
                        'ركنات' => 'ركنات',
                        'صالونات' => 'صالونات',
                        'سراير كابتونيه' => 'سراير كابتونيه',
                        'كنب بلدي' => 'كنب بلدي',
                        'فريق العمل' => 'فريق العمل',
                    ])
                    ->required()
                    ->default('ركن وستائر'),
            ]),
            Section::make('الإعدادات')->schema([
                Grid::make(3)->schema([
                    TextInput::make('sort_order')
                        ->label('ترتيب العرض')
                        ->numeric()
                        ->default(0),
                    Toggle::make('is_active')
                        ->label('نشط')
                        ->default(true),
                    Toggle::make('show_on_home')
                        ->label('عرض في الصفحة الرئيسية')
                        ->default(false),
                ]),
            ]),
        ]);
    }

    public static function table(Table $table): Table
    {
        return $table
            ->columns([
                ImageColumn::make('image')->label('صورة')->height(60)->width(80),
                TextColumn::make('title')->label('العنوان')->searchable()->limit(40),
                TextColumn::make('category')->label('التصنيف')->badge()->sortable(),
                IconColumn::make('show_on_home')->label('الرئيسية')->boolean(),
                IconColumn::make('is_active')->label('نشط')->boolean(),
                TextColumn::make('sort_order')->label('الترتيب')->sortable(),
                TextColumn::make('created_at')->label('التاريخ')->dateTime()->sortable(),
            ])
            ->defaultSort('sort_order')
            ->filters([
                SelectFilter::make('category')->label('التصنيف')->options([
                    'ركن وستائر' => 'ركن وستائر',
                    'ستائر' => 'ستائر',
                    'انتريهات' => 'انتريهات',
                    'ركنات' => 'ركنات',
                    'صالونات' => 'صالونات',
                    'سراير كابتونيه' => 'سراير كابتونيه',
                    'كنب بلدي' => 'كنب بلدي',
                    'فريق العمل' => 'فريق العمل',
                ]),
                TernaryFilter::make('show_on_home')->label('الرئيسية'),
                TernaryFilter::make('is_active')->label('نشط'),
            ])
            ->recordActions([EditAction::make()])
            ->toolbarActions([BulkActionGroup::make([DeleteBulkAction::make()])]);
    }

    public static function getPages(): array
    {
        return [
            'index' => ListGalleries::route('/'),
            'create' => CreateGallery::route('/create'),
            'edit' => EditGallery::route('/{record}/edit'),
        ];
    }
}
