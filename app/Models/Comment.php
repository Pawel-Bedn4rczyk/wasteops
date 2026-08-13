<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

#[Fillable(['incident_id', 'body', 'author_name'])]
class Comment extends Model
{
    /** @use HasFactory<\Database\Factories\IncidentFactory> */
    use HasFactory;

    public function incident(): BelongsTo
    {
        return $this->belongsTo(Incident::class);
    }
}
