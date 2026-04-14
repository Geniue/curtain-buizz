<?php

namespace App\Filament\Resources\Shop;

use App\Filament\Resources\Shop\Pages\ListOrders;
use App\Filament\Resources\Shop\Pages\ViewOrder;
use App\Models\Order;
use Filament\Infolists\Components\TextEntry;
use Filament\Infolists\Components\RepeatableEntry;
use Filament\Resources\Resource;
use Filament\Schemas\Schema;
use Filament\Support\Icons\Heroicon;
use Filament\Tables\Columns\TextColumn;
use Filament\Tables\Columns\BadgeColumn;
use Filament\Tables\Filters\SelectFilter;
use Filament\Tables\Table;
use Filament\Schemas\Components\Section;

class OrderResource extends Resource
{
    protected static ?string $model = Order::class;

    protected static string|\BackedEnum|null $navigationIcon = Heroicon::OutlinedClipboardDocumentList;

    protected static ?string $modelLabel = 'طلب';

    protected static ?string $pluralModelLabel = 'الطلبات';

    protected static ?string $navigationLabel = 'الطلبات';

    protected static string|\UnitEnum|null $navigationGroup = 'المتجر';

    protected static ?int $navigationSort = 3;

    public static function form(Schema $schema): Schema
    {
        return $schema->components([
            Section::make('بيانات الطلب')->schema([
                \Filament\Forms\Components\TextInput::make('order_number')->label('رقم الطلب')->disabled(),
                \Filament\Forms\Components\TextInput::make('customer_name')->label('اسم العميل')->required(),
                \Filament\Forms\Components\TextInput::make('customer_phone')->label('الهاتف')->required(),
                \Filament\Forms\Components\TextInput::make('customer_email')->label('البريد'),
                \Filament\Forms\Components\TextInput::make('customer_address')->label('العنوان'),
                \Filament\Forms\Components\TextInput::make('city')->label('المدينة'),
                \Filament\Forms\Components\TextInput::make('governorate')->label('المحافظة'),
                \Filament\Forms\Components\TextInput::make('total')->label('الإجمالي')->prefix('ج.م')->disabled(),
                \Filament\Forms\Components\Select::make('status')->label('الحالة')->options([
                    'pending' => 'قيد الانتظار',
                    'confirmed' => 'مؤكد',
                    'processing' => 'جاري التجهيز',
                    'shipped' => 'تم الشحن',
                    'delivered' => 'تم التوصيل',
                    'cancelled' => 'ملغي',
                ])->required(),
                \Filament\Forms\Components\Select::make('payment_status')->label('حالة الدفع')->options([
                    'pending' => 'قيد الانتظار',
                    'paid' => 'مدفوع',
                    'failed' => 'فشل',
                    'refunded' => 'مرتجع',
                ]),
            ]),
        ]);
    }

    public static function table(Table $table): Table
    {
        return $table
            ->columns([
                TextColumn::make('order_number')->label('رقم الطلب')->searchable()->sortable(),
                TextColumn::make('customer_name')->label('العميل')->searchable(),
                TextColumn::make('customer_phone')->label('الهاتف'),
                TextColumn::make('city')->label('المدينة'),
                TextColumn::make('total')->label('الإجمالي')->money('EGP')->sortable(),
                TextColumn::make('status')->label('الحالة')->badge()
                    ->color(fn (string $state): string => match ($state) {
                        'pending' => 'warning',
                        'confirmed' => 'info',
                        'processing' => 'primary',
                        'shipped' => 'info',
                        'delivered' => 'success',
                        'cancelled' => 'danger',
                        default => 'gray',
                    })
                    ->formatStateUsing(fn (string $state): string => match ($state) {
                        'pending' => 'قيد الانتظار',
                        'confirmed' => 'مؤكد',
                        'processing' => 'جاري التجهيز',
                        'shipped' => 'تم الشحن',
                        'delivered' => 'تم التوصيل',
                        'cancelled' => 'ملغي',
                        default => $state,
                    }),
                TextColumn::make('payment_method')->label('طريقة الدفع')
                    ->formatStateUsing(fn (string $state): string => $state === 'cod' ? 'عند الاستلام' : 'أونلاين'),
                TextColumn::make('created_at')->label('التاريخ')->dateTime()->sortable(),
            ])
            ->defaultSort('created_at', 'desc')
            ->filters([
                SelectFilter::make('status')->label('الحالة')->options([
                    'pending' => 'قيد الانتظار',
                    'confirmed' => 'مؤكد',
                    'processing' => 'جاري التجهيز',
                    'shipped' => 'تم الشحن',
                    'delivered' => 'تم التوصيل',
                    'cancelled' => 'ملغي',
                ]),
            ])
            ->recordActions([
                \Filament\Actions\EditAction::make(),
            ]);
    }

    public static function getPages(): array
    {
        return [
            'index' => ListOrders::route('/'),
            'edit' => \App\Filament\Resources\Shop\Pages\EditOrder::route('/{record}/edit'),
        ];
    }
}
