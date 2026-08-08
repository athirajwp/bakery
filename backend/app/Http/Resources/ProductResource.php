<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ProductResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'name' => $this->name,
            'slug' => $this->slug,
            'description' => $this->description,
            'price' => (float) $this->price,
            'old_price' => $this->old_price ? (float) $this->old_price : null,
            'weight' => $this->weight,
            'image' => $this->image ? asset('storage/' . $this->image) : null,
            'rating' => (float) $this->rating,
            'reviews_count' => $this->reviews_count,
            'tags' => $this->tags,
            'is_best_seller' => (bool) $this->is_best_seller,
            'category' => new CategoryResource($this->whenLoaded('category')),
        ];
    }
}
