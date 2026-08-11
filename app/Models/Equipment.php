<?php

namespace App\Models;

use Database\Factories\EquipmentFactory;
use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Carbon;

/**
 * @property int $id
 * @property string $name
 * @property string $type
 * @property string|null $serial_number
 * @property Carbon|null $created_at
 * @property Carbon|null $updated_at
 */
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
}
