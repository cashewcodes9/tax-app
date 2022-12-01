<?php

namespace App\Http\Controllers\Items;

use App\Http\Controllers\Controller;
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

    public function __construct(ItemRepository $itemRepository)
    {
        $this->itemRepository = $itemRepository;
    }

    public function index(): JsonResponse
    {
        $items = $this->itemRepository->index();
        return response()->json($items);
    }
}
