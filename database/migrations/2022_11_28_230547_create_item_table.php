<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

/**
 * Migration file to add item table in the database.
 *
 */
return new class extends Migration
{
    /**
     * Table name
     * @var string
     */
    protected string $table = 'item';
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create($this->table, function (Blueprint $table) {
            $table->id();
            $table->string('name')->default('');
            $table->enum('tax_category', ['Book', 'Food', 'Medicine', 'Miscellaneous'])->default('Miscellaneous');
            $table->float('import_tax_rate')->default(5);
            $table->float('sales_tax_rate')->default(0);
            $table->float('price');
            $table->string('description');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('item');
    }
};
