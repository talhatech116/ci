<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>My React App</title>

    @if(app()->environment('local'))
        @vite(['resources/js/app.jsx'])
    @else
        @php
            $manifestPath = public_path('build/.vite/manifest.json');  <!-- FIXED PATH -->
        @endphp

        @if(file_exists($manifestPath))
            @php
                $manifest = json_decode(file_get_contents($manifestPath), true);
            @endphp

            @if(isset($manifest['resources/js/app.jsx']['file']))
                <script type="module" src="{{ asset('build/' . $manifest['resources/js/app.jsx']['file']) }}"></script>
            @else
                <p style="color: red;">Error: app.jsx not found in manifest.json</p>
            @endif
        @else
            <p style="color: red;">Error: manifest.json is missing in public/build/.vite/</p>
            <!-- Debug: Check if .vite folder exists -->
            @php
                $vitePath = public_path('build/.vite');
            @endphp
            <p>Vite folder exists: {{ file_exists($vitePath) ? 'Yes' : 'No' }}</p>
        @endif
    @endif
</head>
<body>
    <div id="app"></div>
</body>
</html>