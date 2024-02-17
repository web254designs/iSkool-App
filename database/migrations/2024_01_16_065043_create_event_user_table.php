<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up()
{
    Schema::create('event_user', function (Blueprint $table) {
        $table->id();
        $table->foreignId('event_id')->constrained();
        $table->foreignId('user_id')->constrained();
        $table->boolean('is_interested')->default(false);
        $table->boolean('is_attending')->default(false);
        $table->timestamps();
    });
}

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('event_user');
    }
};
