@extends('layouts.Timeline')
@section('contents')
    <div class="p-3" style="min-height: 100vh;">
        <div class="d-flex justify-content-center">
            <h1 class="text-light">Educations</h1>
        </div>

        @auth
            <div class="modal fade" id="addEducationModal" tabindex="-1" aria-labelledby="addEducationModalLabel" aria-hidden="true">
                <div class="modal-dialog">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title" id="addEducationModalLabel">Add New Education</h5>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body">
                            <form id="addEducationForm" action="{{ route('educations.store') }}" method="POST" enctype="multipart/form-data">
                                @csrf
                                <div class="form-group">
                                    <label for="title">Title</label>
                                    <input type="text" class="form-control" id="title" name="title" required>
                                </div>
                                <div class="form-group">
                                    <label for="time">Timeline</label>
                                    <input type="text" class="form-control" id="time" name="time" required>
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
                            <button type="submit" form="addEducationForm" class="btn btn-primary">Save Changes</button>
                        </div>
                    </div>
                </div>
            </div>
        @endauth

        <ul class="timeline">
            @auth
                <li class="timeline-inverted">
                    <div class="timeline-badge bg-light"></div>
                    <div class="timeline-panel">
                        <div class="card bg-primary border-light text-light shadow-sm" data-bs-toggle="modal" data-bs-target="#addEducationModal"
                            style="transition: opacity 0.3s ease; opacity: 1;"
                            onmouseover="this.style.opacity=0.7;"
                            onmouseout="this.style.opacity=1;">
                            <div class="row">
                                <div class="col-md-12 d-flex justify-content-center align-items-center" style="height: 15rem;">
                                    <i class='bx bx-plus' style='font-size: 6rem;'></i>
                                </div>
                            </div>
                        </div>
                    </div>
                </li>
            @endauth

            @foreach($educations as $education)
                <x-timeline-card 
                    id="{{ $education->id }}" 
                    title="{{ $education->title }}" 
                    timeline="{{ $education->time }}" 
                    desc="{{ $education->desc }}" 
                    photo="{{ $education->photo }}" 
                    link="{{ $education->link }}" 
                    show="{{ $education->show }}"
                    :inverted="$loop->iteration % 2 == 0" />
            @endforeach
        </ul>
    </div>

@endsection

@auth
    @section('styles')
    <style>
        .toggle-icon {
            cursor: pointer;
            position: absolute;
            top: calc(0rem - 1rem);
            left: calc(0rem - 1rem);
            z-index: 2;
        }
    </style>
    @endsection
    @push('scripts')
    <script>
        function toggleVisibility(element, educationId) {
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
            xhr.open("POST", "/educations/toggle/" + educationId, true);
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
    <script>
        document.addEventListener('DOMContentLoaded', function () {
            $.validator.addMethod('filesize', function (value, element, param) {
                if (element.files.length === 0) {
                    return true;
                }
                var size = element.files[0].size;
                return this.optional(element) || (size <= param);
            }, 'File size must be less than {0} bytes.');

            $('#addEducationForm').validate({
                errorClass: 'is-invalid',
                validClass: 'is-valid',
                errorElement: 'div',
                errorPlacement: function (error, element) {
                    error.addClass('invalid-feedback');
                    error.insertAfter(element);
                },
                highlight: function (element, errorClass, validClass) {
                    $(element).addClass(errorClass).removeClass(validClass);
                },
                unhighlight: function (element, errorClass, validClass) {
                    $(element).removeClass(errorClass).addClass(validClass);
                },
                rules: {
                    title: {
                        required: true,
                        maxlength: 255
                    },
                    time: {
                        required: true
                    },
                    desc: {
                        required: true,
                        maxlength: 65535
                    },
                    link: {
                        url: true
                    },
                    photo: {
                        accept: "image/jpeg,image/png,image/jpg,image/gif,image/svg+xml,image/webp,image/bmp,image/x-icon",
                        filesize: 2048000 // 2MB
                    }
                },
                messages: {
                    title: {
                        required: "Please enter a title",
                        maxlength: "Title cannot exceed 255 characters"
                    },
                    time: {
                        required: "Please enter a timeline"
                    },
                    desc: {
                        required: "Please enter a description"
                    },
                    link: {
                        url: "Please enter a valid URL"
                    },
                    photo: {
                        accept: "Please upload a valid image file",
                        filesize: "File size must be less than 2MB"
                    }
                },
                submitHandler: function(form) {
                    form.submit();
                }
            });
        });
    </script>
    @endpush
    @endauth