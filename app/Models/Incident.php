<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use App\Models\Equipment;
use Illuminate\Database\Eloquent\Relations\HasMany;


#[Fillable(['equipment_id', 'title', 'description', 'status'])]
class Incident extends Model
{

    /** @use HasFactory<\Database\Factories\IncidentFactory> */
    use HasFactory;

    /**
     * @var array<string, string>
     */
    public const STATUSES = [
        'open' => 'Otwarta',
        'in_progress' => 'W trakcie',
        'resolved' => 'Rozwiązana',
    ];

    public function equipment(): BelongsTo
    {
        return $this->belongsTo(Equipment::class);
    }

    public function comments(): HasMany
    {
        return $this->hasMany(Comment::class);
    }

    public function acceptsComments(): bool
    {
        return $this->status !== 'resolved';
    }
}
