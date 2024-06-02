<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="google" value="notranslate" />
    <link rel="stylesheet" href="{{ asset('css/bootstrap.css') }}">
    <link href='https://unpkg.com/boxicons@2.1.4/css/boxicons.min.css' rel='stylesheet'>
    <link rel="stylesheet" href="{{ asset('css/animations.css') }}">
    <link rel="stylesheet" href="{{ asset('css/loading.css') }}">
    <link rel="stylesheet" href="{{ asset('css/timeline.css') }}">
    <meta name="csrf-token" content="{{ csrf_token() }}">
    @yield('styles')
    <title>{{ $page_title ?? 'Default Title' }}</title>
</head>

<body class="bg-primary">
    <a href="{{ route('dashboard.index') }}" class="position-absolute mt-3 mx-3" style="top: 0; left:0;">
        <i class='bx bx-left-arrow-alt text-light fs-1 bx-tada-hover'></i>
    </a>

    @yield('contents')

    <script src="{{ asset('js/bootstrap.js') }}"></script>
    <script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/jquery-validation@1.19.5/dist/jquery.validate.min.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/jquery-validation@1.19.5/dist/additional-methods.min.js"></script>
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
                        required: false,
                        maxlength: 65535
                    },
                    link: {
                        required: false,
                        url: true
                    },
                    photo: {
                        required: true,
                        accept: "image/jpeg,image/png,image/jpg,image/gif,image/svg+xml,image/webp,image/bmp,image/x-icon",
                        filesize: 2048000 // 2MB
                    },
                    show: {
                        required: false
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
                    link: {
                        url: "Please enter a valid URL"
                    },
                    photo: {
                        accept: "Please upload a valid image file",
                        filesize: "File size must be less than 2MB"
                    }
                },
                submitHandler: function(form) {
                    $(form).submit();
                }
            });
        });
    </script>

    @stack('scripts')
</body>
</html>