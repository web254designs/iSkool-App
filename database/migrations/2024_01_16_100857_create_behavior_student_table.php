<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateBehaviorStudentTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('behavior_student', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('behavior_id');
            $table->unsignedBigInteger('student_id');
            $table->timestamps();

            $table->foreign('behavior_id')->references('id')->on('behaviors')->onDelete('cascade');
            $table->foreign('student_id')->references('id')->on('students')->onDelete('cascade');

            // Additional columns related to the relationship can be added here
            // $table->string('extra_information')->nullable();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('behavior_student');
    }
}
