<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory
 */
class ItemFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition()
    {
        $name = $this->faker->name . ' ' . $this->faker->randomElement(['', 'Book', '','Medicine', '' ,'', 'Food']);
        $randomCategory = $this->faker->randomElement(['Book', 'Food', 'Medicine', 'Miscellaneous']);


        return [
            'name' => $name,
            'tax_category' => $this->CategorySwitch($name, $randomCategory),
            'import_tax_rate' => 5,
            'sales_tax_rate' => in_array($this->CategorySwitch($name, $randomCategory), ['Book', 'Medicine', 'Food'])  ? 0 : 10,
            'price' => $this->faker->randomFloat(2, 0.5, 99),
            'description' => $name . ': '. $this->faker->sentence
        ];
    }

    /**
     * Private method to switch tax category according to item name
     *
     * @param string $name
     * @param string $randomCategory
     * @return string
     */
    private function CategorySwitch(string $name, string $randomCategory): string
    {
        switch ($randomCategory) {
            case str_contains($name, 'Book'):
                return 'Book';
            case str_contains($name, 'Medicine'):
                return 'Medicine';
            case str_contains($name, 'Food'):
                return 'Food';
            default:
                return 'Miscellaneous';

        }
    }
}
