<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\ChamaGroup;

class ChamaGroupSeeder extends Seeder
{
    public function run()
    {
        $faker = \Faker\Factory::create();

        for ($i = 1; $i <= 10; $i++) {
            ChamaGroup::create([
                'group_name' => $faker->company . ' Chama',
                'description' => $faker->paragraph,
                'group_type' => $faker->randomElement(['Investment', 'Savings', 'Social', 'Business']),
                'group_rules' => $faker->sentence,
                'meeting_schedule' => $faker->optional()->time(),
                'membership_fee' => $faker->randomFloat(2, 0, 100),
                'contribution_structure' => $faker->paragraph,
                'financial_records' => $faker->optional()->paragraph,
                'bank_account_info' => $faker->optional()->text,
                'goals_and_objectives' => $faker->optional()->paragraph,
                'member_information' => $faker->optional()->paragraph,
                'communication_channels' => $faker->optional()->word,
                'decision_making_process' => $faker->optional()->sentence,
                'documents_repository' => $faker->optional()->paragraph,
                'events_and_activities' => $faker->optional()->paragraph,
                'member_contributions_history' => $faker->optional()->paragraph,
                'chama_logo' => $faker->optional()->imageUrl(),
                'is_private' => $faker->boolean(20), // 20% chance of being private
            ]);
        }
    }
}
