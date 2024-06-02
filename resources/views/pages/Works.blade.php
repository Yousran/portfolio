@extends('layouts.Works')
@section('styles')
    <link rel="stylesheet" href="{{ asset('css/masonry.css') }}">
    <meta name="csrf-token" content="{{ csrf_token() }}">
@endsection

@section('contents')
@auth
    <div class="modal fade" id="addWorkModal" tabindex="-1" aria-labelledby="addWorkModalLabel" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="addWorkModalLabel">Add New Work</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>                
                <div class="modal-body">
                    <form id="addWorkForm" action="{{ route('works.store') }}" method="POST" enctype="multipart/form-data">
                        @csrf
                        <div class="form-group">
                            <label for="title">Title</label>
                            <input type="text" class="form-control" id="title" name="title" required>
                        </div>
                        <div class="form-group">
                            <label for="category_id">Category</label>
                            <select class="form-control" id="category_id" name="category_id">
                                @foreach($categories as $category)
                                    <option value="{{ $category->id }}">{{ $category->category_name }}</option>
                                @endforeach
                            </select>
                        </div>
                        <div class="form-group">
                            <label for="desc">Description</label>
                            <textarea class="form-control" id="desc" name="desc"></textarea>
                        </div>
                        <div class="form-group">
                            <label for="link">Link</label>
                            <input type="text" class="form-control" id="link" name="link">
                        </div>
                        <div class="form-group">
                            <label for="photo">Photo</label>
                            <input type="file" class="form-control" id="photo" name="photo">
                        </div>
                        <div class="form-group">
                            <label for="show">Show</label>
                            <input class="form-check-input" type="checkbox" id="show" name="show" value="1" checked>
                        </div>
                    </form>                                   
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                    <button type="submit" form="addWorkForm" class="btn btn-primary">Save Changes</button>
                </div>
            </div>
        </div>
    </div>
@endauth

<div class="row w-100" data-masonry='{"percentPosition": true }'>
    @auth
        <div class="card border-2 text-bg-dark" data-bs-toggle="modal" data-bs-target="#addWorkModal">
            <div class="card-img d-flex justify-content-center" style="height: 300px">
                <i class='bx bx-plus align-content-center' style='font-size: 150px;'></i>
            </div>
            <div class="card-img-overlay d-inline-block shadow-sm">
            </div>
        </div>   
    @endauth 
    @forelse ($works as $work)
        <x-gallery-card :id="$work->id" :title="$work->title" :desc="$work->desc" :link="$work->link" :photo="$work->photo" :show="$work->show" :categoryIcon="$work->category->category_icon" />
    @empty
        <p>No works found.</p>
    @endforelse

</div>
@endsection

