<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Contact extends Model
{
    protected $fillable = [
        'title',
        'image',
        'address',
        'phone',
        'email',
        'banner_image',
        'message',
        'status'
    ];
}