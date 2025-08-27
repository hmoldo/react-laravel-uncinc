<?php

namespace App\Http\Controllers;

use App\Models\Article;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse; // Import JsonResponse for explicit return types

class ArticleController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $articles = Article::all(); // Retrieve all articles
        return response()->json($articles);
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
            'author' => '',
            //
            'image' => 'required|image|mimes:jpeg,png,jpg,gif|max:4096'
        ]);

        $imagePath = $request->file('image')->store('articles', 'public');
        $validatedData['image'] = $imagePath;

        $article = Article::create($validatedData); // Create a new article
        return response()->json($article, 201); // 201 Created status
    }

    /**
     * Display the specified resource.
     */
    public function show(Article $article): JsonResponse // Route model binding
    {
        return response()->json($article);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Article $article): JsonResponse // Route model binding
    {
        // Validate incoming request data
        $validatedData = $request->validate([
            'title' => 'sometimes|required|string|max:255',
            'content' => 'sometimes|required|string',
        ]);

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