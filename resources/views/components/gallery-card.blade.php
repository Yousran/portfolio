<div class="card border-0 text-bg-dark">
    <img src="{{ asset('/img/' . $photo) }}" class="card-img" alt="{{ $title }}">
    <div class="card-img-overlay d-inline-block shadow-sm">
      <div class="d-flex justify-content-between">
        <h5 class="card-title">{{ $title }}</h5>
        <i class='bx {{ $categoryIcon }} text-light fs-1 bx-tada-hover'></i>
      </div>
      <p class="card-text">{{ $desc }}</p>
        @if (!empty($link))
        <a href="{{ $link }}" class="btn btn-outline-light">More</a>
        @endif
    </div>
</div>
