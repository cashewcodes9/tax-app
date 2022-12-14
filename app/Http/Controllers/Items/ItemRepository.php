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
     * @return float
     */
    public function calculate($itemIds): float
    {
        $taxCounter = 0;

        foreach ($itemIds as $itemId)  {
            $item = $this->getById($itemId);
            // returns the rounded value of sales tax with precision 2 i.e nearest 0.05
            if ($item) {

                $salesTax = $item->tax_category == Item::MISCELLANEOUS ?
                    round(($item->sales_tax_rate * $item->price)/100, 2) : 0;

                $importTax = $item->imported ? round(($item->import_tax_rate * $item->price)/100, 2) : 0;
                $taxCounter = $taxCounter + $salesTax + $importTax;
            }
        }
        // rounding the final result with precision 2.
        return  round($taxCounter, 2);
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
