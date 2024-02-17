<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AddBehaviorIdToStudentsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('students', function (Blueprint $table) {
            $table->unsignedBigInteger('behavior_id')->nullable();

            $table->foreign('behavior_id')
                ->references('id')
                ->on('behaviors')
                ->onDelete('set null'); // You can adjust the onDelete behavior based on your requirements
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('students', function (Blueprint $table) {
            $table->dropForeign(['behavior_id']);
            $table->dropColumn('behavior_id');
        });
    }
}
