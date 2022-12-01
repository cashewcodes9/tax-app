<?php

use App\Http\Controllers\Items\ItemController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

//TODO:: Add throttle middleware for limiting the number of calls

Route::resource('items', ItemController::class, [
    'only' => [
        'index',
    ]
]);

Route::post('items/calculate',[ItemController::class, 'calculate'])->name('items.calculate');

