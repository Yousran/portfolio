<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <meta name="description" content="Professional portfolio of YUSRAN MAZIDAN, showcasing works, educations, and job experiences. Contact directly via email or social media.">
    <meta name="google" value="notranslate" />
    <meta property="og:title" content="{{ $page_title ?? 'Yusran\'s Portfolio' }}" />
    <meta property="og:description" content="Explore the professional journey of Yusran Mazidan including works, educational background, and job experiences." />
    <meta property="og:image" content="{{ asset('img/preview-image.png') }}" />
    <meta property="og:url" content="{{ request()->fullUrl() }}" />
    <meta property="og:type" content="website" />

    <link rel="icon" type="image/png" href="{{ asset('img/icon-image.png') }}">
    <link rel="apple-touch-icon" sizes="180x180" href="{{ asset('img/icon-image-solid.png') }}">
    <meta name="msapplication-TileColor" content="#2f4073">
    <meta name="msapplication-TileImage" content="{{ asset('img/icon-image.png') }}">
    <link rel="icon" sizes="192x192" href="{{ asset('img/icon-image-solid.png') }}">
    <link rel="icon" sizes="512x512" href="{{ asset('img/icon-image-solid.png') }}">
    
    <link rel="stylesheet" href="{{ asset('css/bootstrap.css') }}">
    <link href='https://unpkg.com/boxicons@2.1.4/css/boxicons.min.css' rel='stylesheet'>
    <link rel="stylesheet" href="{{ asset('css/animations.css') }}">
    <link rel="stylesheet" href="{{ asset('css/background-star.css') }}">
    @yield('styles')
    <title>{{ $page_title ?? 'Yusran\'s Portfolio' }}</title>
</head>
<body class="bg-primary">
    <div class="background">
        <div class="stars">
            @for ($i = 0; $i < 15; $i++)
                <div class="star"></div>
            @endfor
        </div>
    </div>
    <a href="{{ route('dashboard.index') }}" class="position-absolute mt-3 mx-3" style="top: 0; left:0;">
        <i class='bx bx-left-arrow-alt text-light fs-1 bx-tada-hover'></i>
    </a>
    <div class="d-flex justify-content-center p-5">
        @yield('contents')
    </div>

    <div aria-live="polite" aria-atomic="true" class="position-relative">
        <div class="toast-container position-fixed top-0 end-0 p-3" style="z-index: 1100;">
            @if ($errors->any())
                @foreach ($errors->all() as $error)
                    <div class="toast" role="alert" aria-live="assertive" aria-atomic="true" data-bs-delay="5000">
                        <div class="toast-header">
                            <strong class="me-auto">Error</strong>
                            <button type="button" class="btn-close" data-bs-dismiss="toast" aria-label="Close"></button>
                        </div>
                        <div class="toast-body">
                            {{ $error }}
                        </div>
                    </div>
                @endforeach
            @endif
        </div>
    </div>

    <script src="{{ asset('js/bootstrap.js') }}"></script>
    <script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/jquery-validation@1.19.5/dist/jquery.validate.min.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/jquery-validation@1.19.5/dist/additional-methods.min.js"></script>
    <script src="https://unpkg.com/masonry-layout@4/dist/masonry.pkgd.js"></script>
    <script src="https://unpkg.com/imagesloaded@4/imagesloaded.pkgd.min.js"></script>

    <script>
        document.addEventListener('DOMContentLoaded', function () {
            // Masonry script
            var masonryGrid = document.querySelector('.row');
            imagesLoaded(masonryGrid, function () {
                var msnry = new Masonry(masonryGrid, {
                    itemSelector: '.card',
                    percentPosition: true,
                    columnWidth: '.card'
                });
            });
        });
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

        $('#addWorkForm').validate({
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
                category_id: {
                    required: true
                },
                desc: {
                    maxlength: 65535
                },
                link: {
                    url: true
                },
                photo: {
                    required: true,
                    accept: "image/jpeg,image/png,image/jpg,image/gif,image/svg+xml,image/webp,image/bmp,image/x-icon",
                    filesize: 2048000
                }
            },
            messages: {
                title: {
                    required: "Please enter a title",
                    maxlength: "Title cannot exceed 255 characters"
                },
                category_id: {
                    required: "Please select a category"
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

    @stack('scripts')
</body>
</html>