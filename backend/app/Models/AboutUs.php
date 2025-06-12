<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class AboutUs extends Model
{
    protected $fillable = [
        'title',
        'subtitle1',
        'description1',
        'subtitle2',
        'description2',
        'image1',
        'image2',
        'banner_image'
    ];
}