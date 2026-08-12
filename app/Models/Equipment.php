<?php

namespace App\Models;

use Database\Factories\EquipmentFactory;
use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use App\Models\Incident;

#[Fillable(['name', 'type', 'serial_number'])]
class Equipment extends Model
{
    /** @use HasFactory<EquipmentFactory> */
    use HasFactory;

    /**
     * @var array<string, string>
     */
    public const TYPES = [
        'waga' => 'Waga',
        'prasa' => 'Prasa',
        'sortownik' => 'Sortownik',
        'kontener' => 'Kontener',
        'pojazd' => 'Pojazd',
    ];

    public function incidents(): HasMany
    {
        return $this->hasMany(Incident::class);
    }

}
