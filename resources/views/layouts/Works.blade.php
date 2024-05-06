<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">

    <link rel="stylesheet" href="{{ asset('css/bootstrap.css') }}">
    <link href='https://unpkg.com/boxicons@2.1.4/css/boxicons.min.css' rel='stylesheet'>
    <link rel="stylesheet" href="{{ asset('css/animations.css') }}">
    @yield('styles')

    <title>{{ $page_title ?? 'Default Title' }}</title>

</head>
<body class="bg-primary">
    <a href="{{ route('dashboard.index') }}" class="position-absolute mt-3 mx-3" style="top: 0; left:0;">
        <i class='bx bx-left-arrow-alt text-light fs-1 bx-tada-hover'></i>
    </a>
    <div class="d-flex justify-content-center p-5">
        @yield('contents')
    </div>
    <script src="{{ asset('js/bootstrap.js') }}"></script>
    <script src="https://unpkg.com/masonry-layout@4/dist/masonry.pkgd.js"></script>
    @stack('scripts')
</body>
</html>