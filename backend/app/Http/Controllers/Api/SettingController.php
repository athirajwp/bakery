<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Setting;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class SettingController extends Controller
{
    public function public(): JsonResponse
    {
        $general = collect(Setting::where('group', 'general')->get())
            ->mapWithKeys(fn ($s) => [$s->key => $s->value]);

        return response()->json(['settings' => $general]);
    }

    public function all(): JsonResponse
    {
        return response()->json(['settings' => Setting::allGrouped()]);
    }

    public function update(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'settings' => ['required', 'array'],
            'settings.*' => ['nullable', 'string'],
        ]);

        $group = $request->input('group', 'general');

        foreach ($validated['settings'] as $key => $value) {
            Setting::set($key, $value, $group);
        }

        return response()->json(['message' => 'Settings updated.', 'settings' => Setting::allGrouped()]);
    }
}
