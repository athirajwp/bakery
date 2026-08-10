<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ReviewResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'customer_name' => $this->customer_name,
            'place' => $this->place,
            'rating' => $this->rating,
            'comment' => $this->comment,
            'is_approved' => (bool) $this->is_approved,
            'created_at' => $this->created_at?->toIso8601String(),
        ];
    }
}
