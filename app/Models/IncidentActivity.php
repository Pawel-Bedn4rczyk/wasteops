<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Attributes\Fillable;

#[Fillable(['incident_id', 'type', 'title', 'subtitle', 'status_label'])]
class IncidentActivity extends Model
{
    /** @use HasFactory<\Database\Factories\IncidentActivityFactory> */
    use HasFactory;

    public const TYPES = [
        'created' => 'Utworzono',
        'status_changed' => 'Zmiana statusu',
        'comment_added' => 'Komentarz',
    ];
    public function incident(): BelongsTo
    {
        return $this->belongsTo(Incident::class);
    }
}
