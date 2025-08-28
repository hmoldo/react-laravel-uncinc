<?php

namespace App\Http\Controllers;

use App\Models\Article;
use App\Http\Resources\ArticleResource;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse; // Import JsonResponse for explicit return types

class ArticleController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(): array
    {
        // $articles = Article::all(); // Retrieve all articles
        // return response()->json($articles);
        $resp = ArticleResource::collection(Article::all());
        return $resp->resolve();
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request): JsonResponse
    {
        // Validate incoming request data
        $validatedData = $request->validate([
            'title' => 'required|string|max:255',
            'content' => 'required|string',
            'author' => 'nullable|string',
            'image' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:8000'
        ]);

        // Check if an image was uploaded
        if ($request->hasFile('image')) {
            // Store the file in the 'public' disk under the 'images' folder
            $imagePath = $request->file('image')->store('images', 'public');
            $validatedData['image'] = $imagePath;
        }

        $article = Article::create($validatedData); // Create a new article
        return response()->json($article, 201); // 201 Created status
    }

    /**
     * Display the specified resource.
     */
    public function show(Article $article): JsonResponse // Route model binding
    {
        return response()->json(new ArticleResource($article));
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Article $article): JsonResponse // Route model binding
    {
        // dd($article);
        // Validate incoming request data
        $validatedData = $request->validate([
            'title' => 'sometimes|string|max:255',
            'content' => 'sometimes|string',
            'author' => 'sometimes|nullable|string',
            'image' => 'sometimes|nullable|image|mimes:jpeg,png,jpg,gif|max:8000'
        ]);
        // dd($validatedData);

        if ($request->hasFile('image')) {
            // Store the file in the 'public' disk under the 'images' folder
            $imagePath = $request->file('image')->store('images', 'public');
            $validatedData['image'] = $imagePath;
        }
        $article->update($validatedData); // Update the article
        return response()->json($article);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Article $article): JsonResponse // Route model binding
    {
        $article->delete(); // Delete the article
        return response()->json(null, 204); // 204 No Content status
    }
}