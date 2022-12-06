<?php

namespace App\Http\Controllers\Items;

use App\Http\Controllers\Controller;
use App\Http\Requests\ItemCalculateRequest;
use App\Http\Resources\ItemCollection;
use Illuminate\Http\JsonResponse;

/**
 * ItemController
 *
 * Item controller for handling Item resource operations
 *
 */
class ItemController extends Controller
{
    /**
     * @var ItemRepository
     */
    private ItemRepository $itemRepository;

    /**
     * Item controller constructor
     *
     * @param ItemRepository $itemRepository
     */
    public function __construct(ItemRepository $itemRepository)
    {
        $this->itemRepository = $itemRepository;
    }

    /**
     * Index method return list of items
     *
     * @return ItemCollection
     */
    public function index(): ItemCollection
    {
        $items = $this->itemRepository->index();
        return new ItemCollection($items);
    }

    /**
     * Calculate the sales tax for items
     *
     * @param ItemCalculateRequest $request
     * @return JsonResponse
     */
    public function calculate(ItemCalculateRequest $request): JsonResponse
    {
        $itemIds = $request->validated("item_ids");
        $result = $this->itemRepository->calculate($itemIds);
        return response()->json($result);
    }

}
