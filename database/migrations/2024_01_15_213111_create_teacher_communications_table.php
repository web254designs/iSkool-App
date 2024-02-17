<?php

// database/migrations/{timestamp}_create_teacher_communications_table.php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateTeacherCommunicationsTable extends Migration
{
    public function up()
    {
        Schema::create('teacher_communications', function (Blueprint $table) {
            $table->id();
            $table->foreignId('teacher_id')->constrained(); // Assuming you have a 'teachers' table
            $table->foreignId('student_id')->constrained(); // Assuming you have a 'students' table
            $table->text('message');
            // Add other fields as needed
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('teacher_communications');
    }
}
