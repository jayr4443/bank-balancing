<?php

use Illuminate\Foundation\Application;
use Illuminate\Foundation\Configuration\Exceptions;
use Illuminate\Foundation\Configuration\Middleware;

return Application::configure(basePath: dirname(__DIR__))
    ->withRouting(
        web: __DIR__.'/../routes/web.php',
        api: __DIR__.'/../routes/api.php',
        commands: __DIR__.'/../routes/console.php',
        health: '/up',
    )
    ->withMiddleware(function (Middleware $middleware) {
        $middleware->web(append: [
            \App\Http\Middleware\HandleInertiaRequests::class,
            \Illuminate\Http\Middleware\AddLinkHeadersForPreloadedAssets::class,
        ]);

        // ✅ Register API middleware (Sanctum & CORS)
        $middleware->api(prepend: [
            \Illuminate\Http\Middleware\HandleCors::class, // Handles CORS
            \Laravel\Sanctum\Http\Middleware\EnsureFrontendRequestsAreStateful::class, // Needed for authentication
        ]);
    })
    ->withExceptions(function (Exceptions $exceptions) {
        //
    })->create();

