<!DOCTYPE html>
<html lang="en">
<head>
    <!-- Google tag (gtag.js) -->
    <script async src="https://www.googletagmanager.com/gtag/js?id=G-EEW6WQFBKB"></script>
    <script>
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());

    gtag('config', 'G-EEW6WQFBKB');
    </script>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
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
    <link rel="stylesheet" href="{{ asset('css/loading.css') }}">
    <link rel="stylesheet" href="{{ asset('css/timeline.css') }}">
    <link rel="stylesheet" href="{{ asset('css/background-star.css') }}">
    <meta name="csrf-token" content="{{ csrf_token() }}">
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

    @yield('contents')

    <script src="{{ asset('js/bootstrap.js') }}"></script>
    <script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/jquery-validation@1.19.5/dist/jquery.validate.min.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/jquery-validation@1.19.5/dist/additional-methods.min.js"></script>

    @stack('scripts')
</body>
</html>