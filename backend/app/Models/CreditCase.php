<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class CreditCase extends Model
{
    protected $fillable = [
        'lead_id',
        'status',
        'summary',
        'assigned_to',
    ];

    public function lead(): BelongsTo
    {
        return $this->belongsTo(Lead::class);
    }

    public function assignee(): BelongsTo
    {
        return $this->belongsTo(User::class, 'assigned_to');
    }

    public function notes(): HasMany
    {
        return $this->hasMany(CaseNote::class);
    }

    public function documents(): HasMany
    {
        return $this->hasMany(CaseDocument::class);
    }
}
