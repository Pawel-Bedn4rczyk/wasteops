<?php

namespace App\Http\Requests;

use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;
use App\Models\Incident;

class StoreCommentRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        /** @var Incident $incident */
        $incident = $this->route('incident');
        return $incident->acceptsComments();
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'author_name' => ['required', 'string', 'min:2', 'max:255'],
            'body' => ['required', 'string', 'min:5'],
        ];
    }

    public function messages(): array
    {
        return [
            'author_name.required' => 'Nazwa autora jest wymagana.',
            'author_name.string' => 'Nazwa autora musi być tekstem.',
            'author_name.min' => 'Nazwa autora musi mieć co najmniej :min znaki.',
            'author_name.max' => 'Nazwa autora może mieć co najwyżej :max znaków.',
            'body.required' => 'Treść komentarza jest wymagana.',
            'body.min' => 'Treść komentarza musi mieć co najmniej :min znaki.',
        ];
    }
}
