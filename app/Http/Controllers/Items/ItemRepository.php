<?php
/**
 * @author    <Rohit Paudel>
 * @copyright 2022 GAIA AG, Hamburg
 * @package   tax-app
 *
 * Created using PhpStorm at 01.12.22 01:01
 */

namespace App\Http\Controllers\Items;

use App\Models\Item;
use Illuminate\Support\Collection;

/**
 * ItemRepository Class
 *
 *ItemRepository class is responsible for handling data access for item model
 */
class ItemRepository
{
    /**
     * Return list of Items with pagination
     *
     * @return Collection
     */
    public function index(): Collection
    {
        return Item::all()->collect();
    }
}
