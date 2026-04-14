<?php

namespace App\Filament\Resources\Shop;

use App\Filament\Resources\Shop\Pages\CreateProduct;
use App\Filament\Resources\Shop\Pages\EditProduct;
use App\Filament\Resources\Shop\Pages\ListProducts;
use App\Filament\Resources\Shop\Schemas\ProductForm;
use App\Filament\Resources\Shop\Tables\ProductsTable;
use App\Models\Product;
use Filament\Resources\Resource;
use Filament\Schemas\Schema;
use Filament\Support\Icons\Heroicon;
use Filament\Tables\Table;

class ProductResource extends Resource
{
    protected static ?string $model = Product::class;

    protected static string|\BackedEnum|null $navigationIcon = Heroicon::OutlinedShoppingBag;

    protected static ?string $recordTitleAttribute = 'name';

    protected static ?string $modelLabel = 'منتج';

    protected static ?string $pluralModelLabel = 'المنتجات';

    protected static ?string $navigationLabel = 'المنتجات';

    protected static string|\UnitEnum|null $navigationGroup = 'المتجر';

    protected static ?int $navigationSort = 1;

    public static function form(Schema $schema): Schema
    {
        return ProductForm::configure($schema);
    }

    public static function table(Table $table): Table
    {
        return ProductsTable::configure($table);
    }

    public static function getPages(): array
    {
        return [
            'index' => ListProducts::route('/'),
            'create' => CreateProduct::route('/create'),
            'edit' => EditProduct::route('/{record}/edit'),
        ];
    }
}
