<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class DropStudentsBehaviorIdForeign extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('students', function (Blueprint $table) {
            // Replace 'students_behavior_id_foreign' with the actual name of your foreign key constraint
            $table->dropForeign('students_behavior_id_foreign');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        // If you want to reverse the drop operation, you can recreate the foreign key here
        // Be cautious with reversing dropping operations in production environments
    }
}
