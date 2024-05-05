@extends('layouts.Works')
@section('styles')
<style>
  .card {
    width: calc(33.333% - 20px); /* 33.333% untuk 3 kolom, 20px untuk mengakomodasi margin/padding */
    margin: 10px; /* Margin untuk sedikit ruang di sekitar kartu */
    padding: 0%;
}
@media (max-width: 768px) {
    .card {
        width: calc(50% - 20px); /* 2 kolom untuk tablet */
    }
}

@media (max-width: 480px) {
    .card {
        width: calc(100% - 20px); /* 1 kolom untuk mobile */
        overflow: hidden;
    }
}
.card-img-overlay{

    display: none;
    opacity: 0;
    transition: all 0.3s ease;
}

.card:hover .card-img-overlay{
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    display: block;
    transition: all 0.3s ease;
    opacity: 1;
}
.card-text {
    overflow-y: auto; 
    max-height: 40%; 
    scrollbar-width: none;  /* untuk Firefox */
    -ms-overflow-style: none;  /* untuk Internet Explorer dan Edge */
    -webkit-scrollbar {
        display: none;
    }
}

</style>
@endsection

@section('contents')
<div class="row w-100" data-masonry='{"percentPosition": true }'>
    @forelse ($works as $work)
        <x-gallery-card :title="$work->title" :desc="$work->desc" :link="$work->link" :photo="$work->photo" />
    @empty
        <p>No works found.</p>
    @endforelse
</div>
@endsection

@push('scripts')
<script>
  document.addEventListener('DOMContentLoaded', function () {
      var masonryGrid = document.querySelector('.row');
      var msnry = new Masonry(masonryGrid, {
          itemSelector: '.card',
          percentPosition: true,
          columnWidth: '.card'
      });
  });
</script>
@endpush

