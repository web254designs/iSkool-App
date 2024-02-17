<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AddColumnsToAssignmentsTable extends Migration
{
    public function up()
    {
        Schema::table('assignments', function (Blueprint $table) {
            $table->text('description')->nullable();
            $table->dateTime('deadline');
            $table->unsignedBigInteger('subject_id');
            $table->unsignedBigInteger('student_id');
            $table->unsignedBigInteger('teacher_id');

            // Foreign key constraints
            $table->foreign('subject_id')->references('id')->on('subjects');
            $table->foreign('student_id')->references('id')->on('students');
            $table->foreign('teacher_id')->references('id')->on('teachers');
        });
    }

    public function down()
    {
        Schema::table('assignments', function (Blueprint $table) {
            $table->dropForeign(['subject_id']);
            $table->dropForeign(['student_id']);
            $table->dropForeign(['teacher_id']);

            $table->dropColumn(['description', 'deadline', 'subject_id', 'student_id', 'teacher_id']);
        });
    }
}
