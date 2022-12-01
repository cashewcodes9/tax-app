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
use Illuminate\Contracts\Support\Jsonable;
use Illuminate\Database\Eloquent\Model;

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
     * @return Jsonable
     */
    public function index(): Jsonable
    {
        return Item::all();
    }

    /**
     * calculate and return the sales tax for the items
     *
     * @param $itemIds
     * @return Jsonable
     */
    public function calculate($itemIds): Jsonable
    {
    //TODO:: add logic to calculate tax for items
        return $itemIds;
    }

    /**
     * Returns and item by id
     *
     * @param int $uid
     * @return Model|null
     */
    private function getById(int $uid): ?Model
    {
        return Item::query()->find($uid);
    }
}
