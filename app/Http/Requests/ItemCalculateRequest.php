<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

/**
 * ItemCalculateRequest Class
 *
 * ItemCalculateRequest is responsible for request vaildation of input data
 */
class ItemCalculateRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, mixed>
     */
    public function rules()
    {
        return [
            'item_ids' => 'required|array',
            //TODO: Validate if the given id exist in items table
            //'item_ids.*' => 'exists:items,id',
        ];
    }

    public function messages()
    {
        return [
            'item_ids' => [
                'required' => 'Item ids are missing. please make sure to include item ids.',
                'array' => 'Error! Invalid data provided.',
            ]
        ];
    }
}
