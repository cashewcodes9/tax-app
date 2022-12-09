<?php

namespace Database\Seeders;

use App\Models\Item;
use Carbon\Carbon;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class TestSeeder extends Seeder
{
    protected array $data = [];
    protected Carbon $now;

    public function __construct()
    {
        $this->now = Carbon::now();
    }

    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $this->addData(1, 'book at 12.49', Item::BOOK, 0, 12.49);
        $this->addData(2, 'music CD at 14.99', Item::MISCELLANEOUS, 0, 14.99);
        $this->addData(3, 'chocolate bar at 0.85', Item::FOOD, 0, 0.85);
        $this->addData(4, 'imported box of chocolates at 10.00', Item::FOOD, 1, 10);
        $this->addData(5, 'imported bottle of perfume at 47.50', Item::MISCELLANEOUS, 1, 47.50);
        $this->addData(6, 'imported bottle of perfume at 27.99', Item::MISCELLANEOUS, 1, 27.99);
        $this->addData(7, 'bottle of perfume at 18.99', Item::MISCELLANEOUS, 0, 18.99);
        $this->addData(8, 'packet of headache pills at 9.75', Item::MEDICINE, 0, 9.75);
        $this->addData(9, 'box of imported chocolates at 11.25', Item::FOOD, 1, 11.25);


        DB::table('items')->insert($this->data);



    }

    private function addData($uid, $name, $tax_category, $imported, $price)
    {
        $this->data[] = [
            'id' => $uid,
            'name' => $name,
            'tax_category' => $tax_category,
            'imported' => $imported,
            'price' => $price,
            'created_at' => $this->now
        ];
    }
}
