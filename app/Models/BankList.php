<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class BankList extends Model
{
    use HasFactory;

    protected $table = 'tbl_bank_list'; 

    protected $fillable = [
        'dateOpened',
        'bankname',
        'company_type',
        'branchname',
        'acctnumber',
        'maintaining_balance',
        'type',       
        'currency',
        'account_type',
    ];
}

