<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class DropForeignKeyAssignmentsUserId extends Migration
{
    public function up()
    {
        // Drop the foreign key constraint
        Schema::table('assignments', function (Blueprint $table) {
            $table->dropForeign('assignments_user_id_foreign');
        });
    }

    public function down()
    {
        // Re-add the foreign key constraint
        Schema::table('assignments', function (Blueprint $table) {
            $table->foreign('student_id')->references('id')->on('students');
        });
    }
}
