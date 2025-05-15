<?php

namespace App\Http\Controllers;

use App\Models\BankList;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;

class BankListController extends Controller
{
    /**
     * Get all banks (ordered by name).
     */
    public function index()
    {
        $banks = BankList::orderBy('bankname', 'desc')->get()->map(function ($bank) {
            return [
                'id' => $bank->id,
                'type' => $bank->type ?? 'Local',
                'dateOpened' => date('Y-m-d', strtotime($bank->dateOpened)),
                'company_type' => $bank->company_type,
                'name' => $bank->bankname,
                'branch' => $bank->branchname,
                'accountNumber' => $bank->acctnumber,
                'currency' => $bank->currency ?? 'PHP',
                'balance' => $bank->maintaining_balance,
                'account_type' => $bank->account_type ?? 'N/A',
            ];
        });

        return response()->json($banks);
    }


    /**
     * Store a new bank record.
     */
    public function store(Request $request)
    {
        try {
            $validated = $request->validate([
                'type' => 'required|string|in:Local,Foreign',
                'dateOpened' => 'required|date',
                'bankname' => 'required|string|max:255',
                'company_type' => 'required|string|max:255',
                'branchname' => 'required|string|max:255',
                'acctnumber' => 'required|string|max:50|unique:tbl_bank_list,acctnumber,' . $request->id,
                'currency' => 'required|string|max:10',
                'maintaining_balance' => 'required|numeric|min:0',
                'account_type' => 'required|string|in:S/A,C/A',
            ]);

            $bank = BankList::create($validated);

            return response()->json([
                'message' => 'Bank added successfully.',
                'data' => $bank,
            ], 201);
        } catch (\Illuminate\Validation\ValidationException $e) {
            return response()->json([
                'message' => 'Validation failed',
                'errors' => $e->errors()
            ], 422);
        }
    }


    /**
     * Get a single bank by ID.
     */
    public function show($id)
    {
        $bank = BankList::findOrFail($id);

        return response()->json($bank);
    }

    /**
     * Update an existing bank record.
     */
    public function update(Request $request, $id)
    {
        $bank = BankList::findOrFail($id);

        $request->validate([
            'type' => 'required|string|in:Local,Foreign',
            'dateOpened' => 'required|date',
            'company_type' => 'required|string|max:255',
            'bankname' => 'required|string|max:255',
            'branchname' => 'required|string|max:255',
            'acctnumber' => [
                'required',
                'string',
                'max:50',
                Rule::unique('tbl_bank_list', 'acctnumber')->ignore($id),
            ],
            'currency' => 'required|string|max:10',
            'maintaining_balance' => 'required|numeric|min:0',
            'account_type' => 'required|string|in:S/A,C/A',
        ]);

        $bank->update($request->all());

        return response()->json([
            'message' => 'Bank updated successfully.',
            'data' => $bank,
        ]);
    }

    /**
     * Delete a bank record.
     */
    public function destroy($id)
    {
        $bank = BankList::findOrFail($id);
        $bank->delete();

        return response()->json(['message' => 'Bank deleted successfully.']);
    }
}
