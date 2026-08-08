<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\ReviewResource;
use App\Models\Review;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\AnonymousResourceCollection;

class ReviewController extends Controller
{
    public function index(): AnonymousResourceCollection
    {
        return ReviewResource::collection(Review::approved()->latest()->get());
    }

    public function indexAll(): AnonymousResourceCollection
    {
        return ReviewResource::collection(Review::latest()->paginate(20));
    }

    public function store(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'customer_name' => ['required', 'string', 'max:255'],
            'place' => ['nullable', 'string', 'max:255'],
            'rating' => ['required', 'integer', 'between:1,5'],
            'comment' => ['required', 'string', 'max:1000'],
        ]);

        $review = Review::create([
            ...$validated,
            'user_id' => $request->user()?->id,
            'is_approved' => false,
        ]);

        return response()->json([
            'message' => 'Thank you! Your review is pending approval.',
            'review' => new ReviewResource($review),
        ], 201);
    }

    public function update(Request $request, Review $review): JsonResponse
    {
        $validated = $request->validate([
            'is_approved' => ['required', 'boolean'],
        ]);

        $review->update($validated);

        return response()->json(new ReviewResource($review->fresh()));
    }

    public function destroy(Review $review): JsonResponse
    {
        $review->delete();

        return response()->json(['message' => 'Review deleted.']);
    }
}
