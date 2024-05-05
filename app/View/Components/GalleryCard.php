<?php

namespace App\View\Components;

use Closure;
use Illuminate\Contracts\View\View;
use Illuminate\View\Component;

class GalleryCard extends Component
{
    public $title, $desc, $link, $photo;

    public function __construct($title, $desc, $link, $photo)
    {
        $this->title = $title;
        $this->desc = $desc;
        $this->link = $link;
        $this->photo = $photo;
    }

    public function render()
    {
        return view('components.gallery-card');
    }
}

