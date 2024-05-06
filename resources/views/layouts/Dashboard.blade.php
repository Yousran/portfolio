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
    <link rel="stylesheet" href="{{ asset('css/mainpage.css') }}">
    <title>{{ $page_title ?? 'Default Title' }}</title>
</head>
<body class="bg-primary">
    @yield('contents')

    <script src="{{ asset('js/bootstrap.js') }}"></script>
</body>
</html>
