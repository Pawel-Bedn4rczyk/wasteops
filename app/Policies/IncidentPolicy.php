<?php

namespace App\Policies;

use App\Models\Incident;
use App\Models\User;

class IncidentPolicy
{
    public function viewAny(User $user): bool
    {
        return $user->can('incidents.view');
    }

    public function view(User $user, Incident $incident): bool
    {
        return $user->can('incidents.view');
    }

    public function create(User $user): bool
    {
        return $user->can('incidents.create');
    }

    /**
     * Change only status (technician + admin).
     */
    public function updateStatus(User $user, Incident $incident): bool
    {
        return $user->can('incidents.update_status');
    }

    /**
     * Full edit of incident: description, equipment, etc. (only admin).
     */
    public function update(User $user, Incident $incident): bool
    {
        return $user->can('incidents.update');
    }

    public function delete(User $user, Incident $incident): bool
    {
        return $user->can('incidents.delete');
    }

    public function comment(User $user, Incident $incident): bool
    {
        return $user->can('incidents.comment');
    }
}
