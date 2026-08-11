<?php

namespace Database\Factories;

use App\Models\Equipment;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<Equipment>
 */
class EquipmentFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $catalog = [
            'waga' => [
                'Waga samochodowa brama A',
                'Waga pomostowa hala 1',
                'Waga kolejowa tor 2',
            ],
            'prasa' => [
                'Prasa belująca P-12',
                'Prasa kanałowa hala sortowni',
                'Prasa do PET',
            ],
            'sortownik' => [
                'Sortownik optyczny linia 1',
                'Sortownik bębnowy',
                'Przesiewacz wibracyjny',
            ],
            'kontener' => [
                'Kontener KP 7 m³',
                'Kontener hakowy 30 m³',
                'Kontener na szkło',
            ],
            'pojazd' => [
                'Śmieciarka Mercedes Actros',
                'Hakowiec SCANIA',
                'Ładowarka teleskopowa',
            ],
        ];

        $type = fake()->randomElement(array_keys(Equipment::TYPES));

        return [
            'name' => fake()->randomElement($catalog[$type]),
            'type' => $type,
            'serial_number' => fake()->optional()->bothify('SN-####-??'),
        ];
    }
}
