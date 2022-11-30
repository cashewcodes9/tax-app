<?php

namespace Tests\Feature;

use App\Models\Item;
use Illuminate\Support\Facades\URL;
use Illuminate\Foundation\Testing\DatabaseTransactions;
use Tests\TestCase;

/**
 * ItemControllerTest Class
 *
 * Class ItemControllerTest tests the full HTTP Request to a JSON endpoint for Item Resource
 */
class ItemControllerTest extends TestCase
{
    use DatabaseTransactions;

    /** Setups for the tests
     * @return void
     */
    public function setUp(): void
    {
        parent::setUp();
    }

    public function testListItems(): void
    {
        Item::factory(10)->Create();

         $this
            ->getJson(URL::route('items.index'))
            ->assertStatus(200);
    }
}
