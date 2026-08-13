<?php

namespace Database\Factories;

use App\Models\Incident;
use App\Models\IncidentActivity;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<IncidentActivity>
 */
class IncidentActivityFactory extends Factory
{
    /**
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $type = fake()->randomElement(array_keys(IncidentActivity::TYPES));

        return [
            'incident_id' => Incident::factory(),
            'type' => $type,
            'title' => IncidentActivity::TYPES[$type],
            'subtitle' => match ($type) {
                'created' => fake()->randomElement([
                    'Waga samochodowa brama A',
                    'Prasa belująca P-12',
                    'Sortownik optyczny linia 1',
                ]),
                'status_changed' => fake()->randomElement([
                    'Otwarta → W trakcie',
                    'W trakcie → Rozwiązana',
                    'Otwarta → Rozwiązana',
                ]),
                'comment_added' => fake()->name(),
                default => null,
            },
            'status_label' => match ($type) {
                'created', 'status_changed' => fake()->randomElement(array_values(Incident::STATUSES)),
                default => null,
            },
        ];
    }
}
