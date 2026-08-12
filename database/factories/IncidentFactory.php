<?php

namespace Database\Factories;

use App\Models\Equipment;
use App\Models\Incident;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<Incident>
 */
class IncidentFactory extends Factory
{
    /**
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $catalog = [
            [
                'title' => 'Waga nie waży poprawnie',
                'description' => 'Odczyty różnią się od wzorca o ponad 50 kg. Wymagana kalibracja.',
            ],
            [
                'title' => 'Prasa nie domyka bel',
                'description' => 'Siłownik hydrauliczny nie osiąga ciśnienia roboczego. Słychać wyciek oleju.',
            ],
            [
                'title' => 'Sortownik optyczny zatrzymuje linię',
                'description' => 'Czujnik wykrywa ciągły błąd. Linia staje co kilka minut.',
            ],
            [
                'title' => 'Awaria napędu taśmociągu',
                'description' => 'Silnik się przegrzewa, zabezpieczenie wyłącza napęd.',
            ],
            [
                'title' => 'Uszkodzony hak kontenera',
                'description' => 'Hak ma luz, ryzyko odpadnięcia kontenera podczas transportu.',
            ],
            [
                'title' => 'Pojazd nie startuje',
                'description' => 'Brak komunikacji z komputerem pokładowym po diagnostyce.',
            ],
            [
                'title' => 'Czujnik poziomu pełny mimo pustego bunkra',
                'description' => 'Fałszywy sygnał pełnego zbiornika blokuje załadunek.',
            ],
        ];

        $incident = fake()->randomElement($catalog);

        return [
            'equipment_id' => Equipment::factory(),
            'title' => $incident['title'],
            'description' => $incident['description'],
            'status' => fake()->randomElement(array_keys(Incident::STATUSES)),
        ];
    }
}