<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ItemModel extends Model
{
    use HasFactory;

    /**
     * fillable attributes defined. Only these properties will be mass-assignable
     * @var string[]
     */
    protected $fillable = ['name', 'tax_category', 'price', 'import_tax_rate', 'sales_tax_rate', 'description'];
}
