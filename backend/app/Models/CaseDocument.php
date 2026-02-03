<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class CaseDocument extends Model
{
    protected $fillable = [
        'credit_case_id',
        'user_id',
        'original_name',
        'path',
        'mime_type',
        'size',
    ];

    public function creditCase(): BelongsTo
    {
        return $this->belongsTo(CreditCase::class);
    }

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }
}
