<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Permission;
use Spatie\Permission\Models\Role;
use Spatie\Permission\PermissionRegistrar;

class RolesAndPermissionsSeeder extends Seeder
{
    public function run(): void
    {
        app()[PermissionRegistrar::class]->forgetCachedPermissions();

        $permissions = [
            'equipment.view',
            'equipment.create',
            'equipment.update',
            'equipment.delete',
            'incidents.view',
            'incidents.create',
            'incidents.update_status',
            'incidents.update',
            'incidents.delete',
            'incidents.comment',
        ];

        foreach ($permissions as $permission) {
            Permission::findOrCreate($permission);
        }

        Role::findOrCreate('admin')->syncPermissions($permissions);

        Role::findOrCreate('technician')->syncPermissions([
            'equipment.view',
            'incidents.view',
            'incidents.update_status',
            'incidents.comment',
        ]);

        Role::findOrCreate('operator')->syncPermissions([
            'equipment.view',
            'incidents.view',
            'incidents.create',
            'incidents.comment',
        ]);
    }
}
