<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreCommentRequest;
use App\Models\Incident;
use Illuminate\Http\RedirectResponse;
use App\Models\IncidentActivity;

class CommentController extends Controller
{
    public function store(StoreCommentRequest $request, Incident $incident): RedirectResponse
    {
        $comment = $incident->comments()->create($request->validated());

        $incident->activities()->create([
            'type' => 'comment_added',
            'title' => IncidentActivity::TYPES['comment_added'],
            'subtitle' => $comment->author_name,
            'status_label' => null,
        ]);

        return redirect()->route('incidents.show', $incident);
    }
}
