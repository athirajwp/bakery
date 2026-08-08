<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class OrderResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'order_number' => $this->order_number,
            'customer_name' => $this->customer_name,
            'phone' => $this->phone,
            'email' => $this->email,
            'address' => $this->address,
            'city' => $this->city,
            'items_total' => (float) $this->items_total,
            'delivery_charge' => (float) $this->delivery_charge,
            'total' => (float) $this->total,
            'status' => $this->status,
            'payment_method' => $this->payment_method,
            'notes' => $this->notes,
            'items' => $this->whenLoaded('items'),
            'created_at' => $this->created_at?->toIso8601String(),
        ];
    }
}
