<div class="card border-0 text-bg-dark" style="opacity: {{ $show ? '1' : '0.5' }}; transition: opacity 0.3s;">
  <img src="{{ asset('/img/' . $photo) }}" class="card-img" alt="{{ $title }}">
  <div class="card-img-overlay d-inline-block shadow-sm">
    @auth
      <div class="toggle-icon" onclick="toggleVisibility(this, {{ $id }})">
        <i class='bx {{ $show ? "bx-show-alt" : "bx-hide" }} fs-1 toggleIcon'></i>
      </div>
    @endauth
    <div class="d-flex justify-content-between align-items-start">
      <h5 class="card-title">{{ $title }}</h5>
      <i class='bx {{ $categoryIcon }} text-light fs-1 bx-tada-hover'></i>
    </div>
    <p class="card-text">{{ $desc }}</p>
    @if (!empty($link))
    <a href="{{ $link }}" class="btn btn-outline-light">More</a>
    @endif
  </div>
</div>

@auth
@section('styles')
<style>
  .toggle-icon {
    cursor: pointer;
    position:absolute;
    top: calc(0rem - 1rem); /* Mengurangi padding top 10px dari parent */
    left: calc(0rem - 1rem);
    z-index: 2;
  }
  </style>
@endsection
@push('scripts')
<script>
  function toggleVisibility(element, workId) {
    var icon = element.querySelector('.toggleIcon');
    var currentValue = icon.classList.contains('bx-hide');
    var card = element.closest('.card');
    icon.classList.toggle('bx-hide', !currentValue);
    icon.classList.toggle('bx-show-alt', currentValue);
    card.style.opacity = currentValue ? '1' : '0.5';
    
    var csrfToken = document.querySelector('meta[name="csrf-token"]');
    if (!csrfToken) {
      console.error('CSRF token not found!');
      return;
    }
    
    var xhr = new XMLHttpRequest();
    xhr.open("POST", "/works/toggle/" + workId, true);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.setRequestHeader('X-CSRF-TOKEN', csrfToken.getAttribute('content'));
    xhr.send(JSON.stringify({
      show: !currentValue ? 0 : 1
    }));
    
    xhr.onload = function() {
      if (xhr.status !== 200) {
        alert(`Error ${xhr.status}: ${xhr.statusText}`);
      } else {
        console.log('Server response:', xhr.responseText);
      }
    };
  }
  </script>   
@endpush
@endauth