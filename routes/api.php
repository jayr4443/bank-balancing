<?php

use App\Http\Controllers\BankListController;
use App\Http\Controllers\TransactionController;
use Illuminate\Support\Facades\Route;

Route::middleware(['auth:sanctum'])->group(function () {
    // Banks API
    Route::get('/banks', [BankListController::class, 'index']);
    Route::post('/banks', [BankListController::class, 'store']);
    Route::get('/banks/{id}', [BankListController::class, 'show']);
    Route::put('/banks/{id}', [BankListController::class, 'update']);
    Route::delete('/banks/{id}', [BankListController::class, 'destroy']);

    // Transactions API
    Route::get('/transactions', [TransactionController::class, 'index']);
    Route::post('/transactions', [TransactionController::class, 'store']);
    Route::get('/transactions/{id}', [TransactionController::class, 'show']);
    Route::put('/transactions/{id}', [TransactionController::class, 'update']);
    Route::delete('/transactions/{id}', [TransactionController::class, 'destroy']);
});

