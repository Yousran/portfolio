<div class="card border-0 text-bg-dark">
    <img src="{{ asset('/img/' . $photo) }}" class="card-img" alt="{{ $title }}">
    <div class="card-img-overlay d-inline-block shadow-sm">
      <h5 class="card-title">{{ $title }}</h5>
      <p class="card-text">{{ $desc }}</p>
        @if (!empty($link))
        <a href="{{ $link }}" class="btn btn-outline-light">More</a>
        @endif
    </div>
</div>
