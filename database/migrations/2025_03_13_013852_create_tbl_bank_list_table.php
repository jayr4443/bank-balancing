<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('tbl_bank_list', function (Blueprint $table) {
            $table->id();
            $table->date('dateOpened');
            $table->string('company_type');
            $table->string('bankname');
            $table->string('branchname');
            $table->string('acctnumber')->unique();
            $table->decimal('maintaining_balance', 15, 2); 
            $table->enum('type', ['Local', 'Foreign'])->default('Local');
            $table->enum('currency', ['PHP', 'USD', 'CNY', 'EUR'])->default('PHP');
            $table->enum('account_type', ['S/A', 'C/A'])->nullable(); 
            $table->timestamps();
        });
    }
    
    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('tbl_bank_list');
    }
};
