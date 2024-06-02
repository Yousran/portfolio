<?php

namespace App\View\Components;

use Illuminate\View\Component;

class TimelineCard extends Component
{
    public $id;
    public $title;
    public $timeline;
    public $desc;
    public $photo;
    public $link;
    public $show;
    public $inverted;

    public function __construct($id, $title, $timeline, $desc, $photo, $link = null, $show, $inverted = false)
    {

        $this->id = $id;
        $this->title = $title;
        $this->timeline = $timeline;
        $this->desc = $desc;
        $this->photo = $photo;
        $this->link = $link;
        $this->show = $show;
        $this->inverted = $inverted;
    }

    public function render()
    {
        return view('components.timeline-card');
    }
}