@extends('layouts.app')

@section('content')
    <div class="container mx-auto p-6">
        <h2 class="text-2xl font-bold mb-4">Bank Balances</h2>
        <div id="react-app"></div>
    </div>

    @viteReactRefresh
    @vite(['resources/js/main.jsx'])
@endsection
