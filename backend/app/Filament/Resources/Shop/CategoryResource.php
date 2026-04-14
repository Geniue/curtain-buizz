<?php

namespace App\Filament\Resources\Shop;

use App\Filament\Resources\Shop\Pages\ListCategories;
use App\Filament\Resources\Shop\Pages\CreateCategory;
use App\Filament\Resources\Shop\Pages\EditCategory;
use App\Models\Category;
use Filament\Forms\Components\FileUpload;
use Filament\Forms\Components\TextInput;
use Filament\Forms\Components\Toggle;
use Filament\Schemas\Components\Section;
use Filament\Resources\Resource;
use Filament\Schemas\Schema;
use Filament\Support\Icons\Heroicon;
use Filament\Tables\Columns\IconColumn;
use Filament\Tables\Columns\ImageColumn;
use Filament\Tables\Columns\TextColumn;
use Filament\Tables\Table;
use Filament\Actions\EditAction;
use Filament\Actions\DeleteBulkAction;
use Filament\Actions\BulkActionGroup;
use Illuminate\Support\Str;

class CategoryResource extends Resource
{
    protected static ?string $model = Category::class;

    protected static string|\BackedEnum|null $navigationIcon = Heroicon::OutlinedTag;

    protected static ?string $modelLabel = 'تصنيف';

    protected static ?string $pluralModelLabel = 'التصنيفات';

    protected static ?string $navigationLabel = 'التصنيفات';

    protected static string|\UnitEnum|null $navigationGroup = 'المتجر';

    protected static ?int $navigationSort = 2;

    public static function form(Schema $schema): Schema
    {
        return $schema->components([
            Section::make('بيانات التصنيف')->schema([
                TextInput::make('name')->label('الاسم')->required()
                    ->live(onBlur: true)
                    ->afterStateUpdated(fn ($state, callable $set) => $set('slug', Str::slug($state))),
                TextInput::make('slug')->label('الرابط')->required()->unique(ignoreRecord: true),
                TextInput::make('description')->label('الوصف'),
                FileUpload::make('image')->label('الصورة')->image()->directory('categories'),
                TextInput::make('sort_order')->label('الترتيب')->numeric()->default(0),
                Toggle::make('is_active')->label('نشط')->default(true),
            ]),
        ]);
    }

    public static function table(Table $table): Table
    {
        return $table
            ->columns([
                ImageColumn::make('image')->label('صورة')->circular(),
                TextColumn::make('name')->label('الاسم')->searchable(),
                TextColumn::make('products_count')->label('المنتجات')->counts('products'),
                IconColumn::make('is_active')->label('نشط')->boolean(),
                TextColumn::make('sort_order')->label('الترتيب')->sortable(),
            ])
            ->defaultSort('sort_order')
            ->recordActions([EditAction::make()])
            ->toolbarActions([BulkActionGroup::make([DeleteBulkAction::make()])]);
    }

    public static function getPages(): array
    {
        return [
            'index' => ListCategories::route('/'),
            'create' => CreateCategory::route('/create'),
            'edit' => EditCategory::route('/{record}/edit'),
        ];
    }
}
