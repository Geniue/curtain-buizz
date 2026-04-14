<?php

namespace App\Filament\Resources\Shop\Pages;

use App\Filament\Resources\Shop\OrderResource;
use Filament\Resources\Pages\EditRecord;

class EditOrder extends EditRecord
{
    protected static string $resource = OrderResource::class;
}
