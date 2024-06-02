@extends('layouts.Dashboard')

@section('contents')
<div class="d-flex justify-content-center align-items-center" style="min-height: 100vh;">
    <div>
        <div class="w-100 mx-auto profilpic d-flex justify-content-center align-items-center" style="min-height: 30vh;">
            <object data="{{ asset('source/LOGO_YUSRAN.svg') }}" style="width: 30%; height: auto;" type="image/svg+xml"></object>
            <div class="popup w-100">
                @if (auth()->check())
                    <a href="{{ route('works.indexAdmin') }}"><div class="btn btn-outline-light mt-3">Works</div></a>
                @else
                    <a href="{{ route('works.index') }}"><div class="btn btn-outline-light mt-3">Works</div></a>
                @endif

                @if (auth()->check())
                    <a href="{{ route('educations.indexAdmin') }}"><div class="btn btn-outline-light mt-3">Educations</div></a>
                @else
                    <a href="{{ route('educations.index') }}"><div class="btn btn-outline-light mt-3">Educations</div></a>
                @endif
                <a href="{{ url('experience.html') }}"><div class="btn btn-outline-light mt-3">Job Experience</div></a>
            </div>
        </div>
        <div class="mt-3 d-flex justify-content-center">
            <a href="https://mail.google.com/mail/?view=cm&fs=1&to=yusranmazidan@gmail.com" target="_blank" class="mx-2">
                <i class='bx bx-envelope text-light fs-1 bx-tada-hover'></i>
            </a>
            <a href="https://wa.me/+6285156378360" target="_blank" class="mx-2">
                <i class='bx bxl-whatsapp text-light fs-1 bx-tada-hover'></i>
            </a>
            <a href="https://www.linkedin.com/in/yousranmz/" target="_blank" class="mx-2">
                <i class='bx bxl-linkedin text-light fs-1 bx-tada-hover'></i>
            </a>
            <a href="https://github.com/Yousran" target="_blank" class="mx-2">
                <i class='bx bxl-github text-light fs-1 bx-tada-hover'></i>
            </a>
            <a href="https://www.instagram.com/yousran_mz/" target="_blank" class="mx-2">
                <i class='bx bxl-instagram text-light fs-1 bx-tada-hover'></i>
            </a>
        </div>
    </div>
</div>
@endsection
