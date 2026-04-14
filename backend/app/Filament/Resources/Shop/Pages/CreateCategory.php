<?php

namespace App\Filament\Resources\Shop\Pages;

use App\Filament\Resources\Shop\CategoryResource;
use Filament\Resources\Pages\CreateRecord;

class CreateCategory extends CreateRecord
{
    protected static string $resource = CategoryResource::class;
}
