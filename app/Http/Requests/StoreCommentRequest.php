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

        return $this->user()->can('comment', $incident)
            && $incident->acceptsComments();
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'body' => ['required', 'string', 'min:5'],
        ];
    }

    public function messages(): array
    {
        return [
            'body.required' => 'Treść komentarza jest wymagana.',
            'body.min' => 'Treść komentarza musi mieć co najmniej :min znaki.',
        ];
    }
}
