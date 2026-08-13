<?php

namespace Database\Factories;

use App\Models\Comment;
use App\Models\Incident;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<Comment>
 */
class CommentFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'incident_id' => Incident::factory(),
            'body' => fake()->randomElement([
                'Sprawdziłem na miejscu — problem nadal występuje.',
                'Wymieniono czujnik, czekamy na testy.',
                'Po restarcie działa stabilnie od 2 godzin.',
                'Potrzebny dostęp do szafy sterowniczej.',
            ]),
            'author_name' => fake()->name(),
        ];
    }
}
