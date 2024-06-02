<li class="{{ $inverted ? 'timeline-inverted' : '' }}">
    <div class="timeline-badge bg-light"></div>
    @if ($link && !auth()->check())
        <a href="{{ $link }}" class="timeline-panel">
    @else
        <div class="timeline-panel">
    @endif
            <div class="card bg-transparent border-light text-light shadow-sm" style="opacity: {{ $show ? '1' : '0.5' }}; transition: opacity 0.3s;">
                <div class="row">
                    @if ($photo)
                        <div class="col-md-4 d-flex align-items-center">
                            <img src="{{ asset('/img/' . $photo) }}" class="rounded h-100 w-100 bg-light" alt="{{ $title }}">
                        </div>
                        <div class="col-md-8">
                    @else
                        <div class="col-md-12">
                    @endif
                            <h5 class="card-title m-3 mb-1">{{ $title }}</h5>
                            <h6 class="card-title mt-0 mx-3">{{ $timeline }}</h6>
                            <p class="card-text m-3">{{ $desc }}</p>
                        </div>
                </div>
                @auth
                    <div class="toggle-icon" onclick="toggleVisibility(this, {{ $id }})" style="z-index: 1000;">
                        <i class='bx {{ $show ? "bx-show-alt" : "bx-hide" }} fs-1 toggleIcon'></i>
                    </div>
                @endauth
            </div>
    @if ($link && !auth()->check())
        </a>
    @else
        </div>
    @endif
</li>