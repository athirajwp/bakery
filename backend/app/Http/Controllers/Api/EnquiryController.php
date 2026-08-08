<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\EnquiryResource;
use App\Models\Enquiry;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\AnonymousResourceCollection;

class EnquiryController extends Controller
{
    public function store(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'phone' => ['required', 'string', 'max:20'],
            'email' => ['nullable', 'email'],
            'message' => ['required', 'string', 'max:2000'],
        ]);

        $enquiry = Enquiry::create($validated);

        return response()->json([
            'message' => 'Thank you! We will get back to you shortly.',
            'enquiry' => new EnquiryResource($enquiry),
        ], 201);
    }

    public function index(Request $request): AnonymousResourceCollection
    {
        return EnquiryResource::collection(
            Enquiry::orderByDesc('created_at')
                ->when($request->filled('status'), fn ($q) => $q->where('status', $request->input('status')))
                ->paginate(15)
        );
    }

    public function updateStatus(Request $request, Enquiry $enquiry): JsonResponse
    {
        $validated = $request->validate([
            'status' => ['required', 'in:' . implode(',', Enquiry::STATUSES)],
        ]);

        $enquiry->update($validated);

        return response()->json(new EnquiryResource($enquiry->fresh()));
    }

    public function destroy(Enquiry $enquiry): JsonResponse
    {
        $enquiry->delete();

        return response()->json(['message' => 'Enquiry deleted.']);
    }
}
