<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('tbl_transactions', function (Blueprint $table) {
            $table->id();
            $table->string('transaction_no')->unique();
            $table->string('company_type');
            $table->string('bank_name');
            $table->decimal('beginning_balance', 15, 2);
            $table->string('account_number');
            $table->enum('type', ['Local Bank', 'Foreign Bank'])->default('Local Bank');
            $table->string('account_type');
            $table->decimal('maintaining_balance', 15, 2);
            $table->timestamps();
        });
    }
    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('tbl_transactions');
    }
};
