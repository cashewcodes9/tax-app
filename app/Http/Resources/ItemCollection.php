<?php

namespace App\Http\Resources;

use Illuminate\Contracts\Support\Arrayable;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\ResourceCollection;
use JsonSerializable;

class ItemCollection extends ResourceCollection
{
    /**
     * Transform the resource collection into an array.
     *
     * @param  Request  $request
     * @return array|Arrayable|JsonSerializable
     */
    public function toArray($request)
    {
        return [
            'data' => [
                'items' => $this->collection->map(function ($item) {
                    return [
                        'id' => $item->id,
                        'name' => $item->name,
                        'tax_category' => $item->tax_category,
                        'price' => $item->price,
                        'description' => $item->description,
                        'created_at' => $item->created_at,
                    ];
                })
            ]
        ];
    }

    /**
     * @param $request
     * @return array
     */
    public function with($request): array
    {
        return [
            'isSuccess' => true,
            'message' => '',
        ];
    }
}
