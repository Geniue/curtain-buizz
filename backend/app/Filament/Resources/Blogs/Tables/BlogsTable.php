<?php

namespace App\Filament\Resources\Blogs\Tables;

use Filament\Actions\BulkActionGroup;
use Filament\Actions\DeleteBulkAction;
use Filament\Actions\EditAction;
use Filament\Tables\Columns\IconColumn;
use Filament\Tables\Columns\ImageColumn;
use Filament\Tables\Columns\TextColumn;
use Filament\Tables\Filters\SelectFilter;
use Filament\Tables\Filters\TernaryFilter;
use Filament\Tables\Table;

class BlogsTable
{
    public static function configure(Table $table): Table
    {
        return $table
            ->columns([
                TextColumn::make('title')
                    ->label('العنوان')
                    ->searchable()
                    ->limit(50),
                ImageColumn::make('image')
                    ->label('الصورة'),
                TextColumn::make('category')
                    ->label('التصنيف')
                    ->badge()
                    ->searchable(),
                TextColumn::make('date')
                    ->label('التاريخ')
                    ->date()
                    ->sortable(),
                TextColumn::make('author')
                    ->label('الكاتب')
                    ->searchable(),
                IconColumn::make('is_published')
                    ->label('منشور')
                    ->boolean(),
                TextColumn::make('created_at')
                    ->label('تاريخ الإنشاء')
                    ->dateTime()
                    ->sortable()
                    ->toggleable(isToggledHiddenByDefault: true),
            ])
            ->defaultSort('date', 'desc')
            ->filters([
                SelectFilter::make('category')
                    ->label('التصنيف')
                    ->options([
                        'تنجيد' => 'تنجيد',
                        'ستائر' => 'ستائر',
                        'مراتب' => 'مراتب',
                        'مفروشات' => 'مفروشات',
                    ]),
                TernaryFilter::make('is_published')
                    ->label('حالة النشر'),
            ])
            ->recordActions([
                EditAction::make(),
            ])
            ->toolbarActions([
                BulkActionGroup::make([
                    DeleteBulkAction::make(),
                ]),
            ]);
    }
}
