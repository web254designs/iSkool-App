<?php

// database/migrations/YYYY_MM_DD_HHMMSS_add_guardian_id_to_users_table.php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AddGuardianIdToUsersTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('users', function (Blueprint $table) {
            $table->unsignedBigInteger('guardian_id')->nullable();

            // Define the foreign key constraint
            $table->foreign('guardian_id')
                  ->references('id')
                  ->on('guardians')
                  ->onDelete('set null'); // or onDelete('cascade') depending on your requirements
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('users', function (Blueprint $table) {
            $table->dropForeign(['guardian_id']);
            $table->dropColumn('guardian_id');
        });
    }
}
