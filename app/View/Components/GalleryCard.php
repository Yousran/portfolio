<?php

namespace App\View\Components;

use Closure;
use Illuminate\Contracts\View\View;
use Illuminate\View\Component;

class GalleryCard extends Component
{
    public $title;
    public $desc;
    public $link;
    public $photo;
    public $categoryIcon;

    public function __construct($title, $desc, $link, $photo, $categoryIcon)
    {
        $this->title = $title;
        $this->desc = $desc;
        $this->link = $link;
        $this->photo = $photo;
        $this->categoryIcon = $categoryIcon;
    }

    public function render()
    {
        return view('components.gallery-card');
    }
}

