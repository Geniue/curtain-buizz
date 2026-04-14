<?php

namespace App\Filament\Resources\Shop\Pages;

use App\Filament\Resources\Shop\OrderResource;
use Filament\Resources\Pages\ListRecords;

class ListOrders extends ListRecords
{
    protected static string $resource = OrderResource::class;
}
