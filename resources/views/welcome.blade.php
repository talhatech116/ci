<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>My React App</title>
</head>
<body>
    <div id="app"></div>

    <!-- Simple JS file loader -->
    <script>
        // Try to load from manifest first
        fetch('/build/.vite/manifest.json')
            .then(response => {
                if (!response.ok) throw new Error('Manifest not found');
                return response.json();
            })
            .then(manifest => {
                if (manifest['resources/js/app.jsx'] && manifest['resources/js/app.jsx'].file) {
                    const script = document.createElement('script');
                    script.type = 'module';
                    script.src = '/build/' + manifest['resources/js/app.jsx'].file;
                    document.head.appendChild(script);
                } else {
                    throw new Error('App entry not found in manifest');
                }
            })
            .catch(error => {
                console.log('Manifest load failed, trying direct file detection');
                // Fallback: Load any app-*.js file
                const script = document.createElement('script');
                script.type = 'module';
                script.src = '/build/assets/app.js'; // Try common name
                document.head.appendChild(script);
            });
    </script>
</body>
</html>