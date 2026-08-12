<?php

namespace App\Http\Requests;

use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class StoreIncidentRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'title' => ['required', 'string', 'min:5', 'max:255'],
            'description' => ['nullable', 'string', 'min:10'],
            'equipment_id' => ['required', 'integer', Rule::exists('equipment', 'id')],
        ];
    }

    public function messages(): array
    {
        return [
            'title.required' => 'Tytuł jest wymagany.',
            'title.min' => 'Tytuł musi być dłuższy niż :min znaków.',
            'title.max' => 'Tytuł nie może być dłuższy niż :max znaków.',
            'description.min' => 'Opis musi być dłuższy niż :min znaków.',
            'equipment_id.required' => 'Urządzenie jest wymagane.',
        ];
    }
}
