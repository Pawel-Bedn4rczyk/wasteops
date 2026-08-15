<?php

namespace App\Http\Requests;

use App\Models\Equipment;
use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class UpdateEquipmentRequest extends FormRequest
{
    public function authorize(): bool
    {
        /** @var Equipment $equipment */
        $equipment = $this->route('equipment');

        return $this->user()->can('update', $equipment);
    }

    /**
     * @return array<string, ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'name' => ['required', 'string', 'min:5', 'max:255'],
            'type' => ['required', 'string', Rule::in(array_keys(Equipment::TYPES))],
            'serial_number' => ['nullable', 'string', 'min:5', 'max:14'],
        ];
    }

    public function messages(): array
    {
        return [
            'name.required' => 'Nazwa jest wymagana.',
            'name.min' => 'Nazwa musi być dłuższa niż :min znaków.',
            'name.max' => 'Nazwa nie może być dłuższa niż :max znaków.',
            'type.required' => 'Typ jest wymagany.',
            'serial_number.min' => 'Numer seryjny musi być dłuższy niż :min znaków.',
            'serial_number.max' => 'Numer seryjny nie może być dłuższy niż :max znaków.',
            'type.in' => 'Nieprawidłowy typ urządzenia.',
        ];
    }
}
