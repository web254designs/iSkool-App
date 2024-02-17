<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateAcademicPerformancesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('academic_performances', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('student_id'); // Assuming student_id is the foreign key
            $table->string('subject_name');
            $table->string('academic_performance');
            // Add other columns as needed
            $table->timestamps();

            // Define foreign key constraint
            $table->foreign('student_id')->references('id')->on('students')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('academic_performances');
    }
}
