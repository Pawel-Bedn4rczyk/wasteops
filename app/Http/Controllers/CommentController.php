<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreCommentRequest;
use App\Models\Incident;
use Illuminate\Http\RedirectResponse;

class CommentController extends Controller
{
    public function store(StoreCommentRequest $request, Incident $incident): RedirectResponse
    {
        $incident->comments()->create($request->validated());

        return redirect()->route('incidents.show', $incident);
    }
}
