<?php

namespace Tests\Feature;

use App\Http\Controllers\Items\ItemRepository;
use App\Models\Item;
use Illuminate\Foundation\Testing\DatabaseMigrations;
use Illuminate\Support\Facades\URL;
use Tests\TestCase;

/**
 * ItemControllerTest Class
 *
 * Class ItemControllerTest tests the full HTTP Request to a JSON endpoint for Item Resource
 */
class ItemControllerTest extends TestCase
{
    use DatabaseMigrations;

    /** Setups for the tests
     * @return void
     */
    public function setUp(): void
    {
        parent::setUp();
    }

    /**
     *
     * Testing Item index resource
     *
     * @return void
     */
    public function testListItems(): void
    {
        Item::factory(10)->Create();

         $this
            ->getJson(URL::route('items.index'))
            ->assertStatus(200);
    }

    /**
     * Testing calculate tax for selected items
     *
     * @return void
     */
    public function testCalculate(): void
    {
        $items = Item::factory(3)->create();
        $itemIds = $items->pluck('id');
        $response = $this
            ->postJson(URL::route('items.calculate'), [
                "item_ids" => $itemIds,
            ])
            ->assertStatus(200);
        $itemRepository = new ItemRepository();
        $calculatedTotalTax = $itemRepository->calculate($itemIds);
        $this->assertEquals($calculatedTotalTax, $response->content());
    }
}
