<?php

namespace App\Http\Controllers;

use App\Models\Transaction;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class TransactionController extends Controller
{
    // Get all transactions
    public function index()
    {
        return response()->json(
            Transaction::orderBy('id', 'desc')
                ->orderBy('company_type', 'asc')
                ->orderBy('bank_name', 'asc')
                ->orderBy('beginning_balance', 'asc')
                ->orderBy('account_number', 'asc')
                ->orderBy('account_type', 'asc')
                ->orderBy('maintaining_balance', 'asc')
                ->orderBy('created_at', 'asc')
                ->orderBy('updated_at', 'asc')
                ->get(),
            200
        );
    }

    // Store a new transaction

    public function store(Request $request)
    {
        try {
            $validated = $request->validate([
                'company_type' => 'required|string',
                'bank_name' => 'required|string',
                'beginning_balance' => 'required|numeric',
                'account_type' => 'required|string',
                'account_number' => 'required|string',
                'type' => 'required|string|in:Local Bank,Foreign Bank',
                'maintaining_balance' => 'required|numeric',
            ]);

            $year = now()->year;
            $day = now()->format('d');
            $month = now()->format('m');

            $today = now()->toDateString();
            $countToday = Transaction::whereDate('created_at', $today)->count();

            $series = $countToday + 1;

            if ($series > 999999) {
                $series = 1;
            }

            // Format: YYYY/DD/MM-<series>
            $transactionNo = "{$year}{$day}{$month}-{$series}";

            $validated['transaction_no'] = $transactionNo;

            $transaction = Transaction::create($validated);

            return response()->json([
                'message' => 'Transaction added successfully.',
                'data' => $transaction,
            ], 201);
        } catch (\Illuminate\Validation\ValidationException $e) {
            return response()->json([
                'message' => 'Validation failed',
                'errors' => $e->errors(),
            ], 422);
        }
    }



    // Show a single transaction
    public function show($id)
    {
        $transaction = Transaction::find($id);

        if (!$transaction) {
            return response()->json(['message' => 'Transaction not found'], 404);
        }

        return response()->json($transaction);
    }

    public function update(Request $request, $id)
    {
        $transaction = Transaction::find($id);

        if (!$transaction) {
            return response()->json([
                'message' => 'Transaction not found.',
            ], 404);
        }

        $request->validate([
            'company_type' => 'required|string',
            'bank_name' => 'required|string',
            'beginning_balance' => 'required|numeric',
            'account_type' => 'required|string',
            'account_number' => 'required|string',
            'maintaining_balance' => 'required|numeric',
        ]);

        $transaction->update($request->all());

        return response()->json([
            'message' => 'Transaction updated successfully.',
            'data' => $transaction,
        ], 200);
    }


    // Delete a transaction
    public function destroy($id)
    {
        $transaction = Transaction::find($id);

        if (!$transaction) {
            return response()->json(['message' => 'Transaction not found'], 404);
        }

        $transaction->delete();

        return response()->json(['message' => 'Transaction deleted successfully']);
    }
}
