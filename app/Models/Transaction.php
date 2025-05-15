<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Transaction extends Model
{
    use HasFactory;

    protected $table = 'tbl_transactions';

    protected $fillable = [
        'transaction_no',
        'company_type',
        'bank_name',
        'beginning_balance',
        'account_type',
        'account_number',
        'type',
        'maintaining_balance',
    ];
}
