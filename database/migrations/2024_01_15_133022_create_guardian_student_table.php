<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateGuardianStudentTable extends Migration
{
    public function up()
    {
        Schema::create('guardian_student', function (Blueprint $table) {
            $table->id();

            // Foreign key references to the guardians table
            $table->unsignedBigInteger('guardian_id');
            $table->foreign('guardian_id')->references('id')->on('guardians')->onDelete('cascade');

            // Foreign key references to the students table
            $table->unsignedBigInteger('student_id');
            $table->foreign('student_id')->references('id')->on('students')->onDelete('cascade');

            // You can add other columns specific to this relationship if needed

            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('guardian_student');
    }
}
