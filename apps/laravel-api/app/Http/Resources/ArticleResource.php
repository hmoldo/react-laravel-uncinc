<?php
// app/Http/Resources/ArticleResource.php
namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Support\Facades\Storage;

class ArticleResource extends JsonResource
{

    /**
     * Summary of toArray
     * @param mixed $request
     * @return array{author: mixed, content: mixed, created_at: mixed, id: mixed, image_url: string, title: mixed, updated_at: mixed}
     */
    public function toArray($request): array
    {
        $path = '/storage/images/';
        $image = Storage::url($this->image);
        return [
            'id' => $this->id,
            'title' => $this->title,
            'author' => $this->author,
            'content' => $this->content,
            'image' => $this->image ? substr($image, strlen($path)) : null, // Add the URL here
            'created_at' => $this->created_at,
            'updated_at' => $this->updated_at,
        ];
    }
}