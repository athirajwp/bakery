<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Enquiry extends Model
{
    use HasFactory;

    public const STATUSES = ['new', 'read', 'replied'];

    protected $fillable = [
        'name',
        'phone',
        'email',
        'message',
        'status',
    ];
}
