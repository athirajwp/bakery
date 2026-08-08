<?php

namespace App\Http\Controllers\Api\Traits;

use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;

trait UploadsImages
{
    protected function uploadImage(?UploadedFile $file, string $dir = 'uploads', ?string $oldPath = null): ?string
    {
        if (!$file) {
            return $oldPath;
        }

        if ($oldPath) {
            Storage::disk('public')->delete($oldPath);
        }

        $name = Str::uuid() . '.' . $file->getClientOriginalExtension();

        return $file->storeAs($dir, $name, 'public');
    }

    protected function deleteImage(?string $path): void
    {
        if ($path) {
            Storage::disk('public')->delete($path);
        }
    }
}
