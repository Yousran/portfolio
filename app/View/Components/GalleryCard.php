<?php

namespace App\View\Components;

use Closure;
use Illuminate\Contracts\View\View;
use Illuminate\View\Component;

class GalleryCard extends Component
{
    public $id;
    public $title;
    public $desc;
    public $link;
    public $photo;
    public $show;
    public $categoryIcon;

    public function __construct($id, $title, $desc, $link, $photo, $show, $categoryIcon)
    {
        $this->id = $id;
        $this->title = $title;
        $this->desc = $desc;
        $this->link = $link;
        $this->photo = $photo;
        $this->show = $show;
        $this->categoryIcon = $categoryIcon;
    }

    public function render()
    {
        return view('components.gallery-card');
    }
}

