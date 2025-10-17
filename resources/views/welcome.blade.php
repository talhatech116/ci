<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>My React App</title>

    @if(app()->environment('local') || config('app.debug'))
        <!-- Local Development - Simple direct Vite connection -->
        <script type="module">
            // Direct import without Vite complications
            import('http://localhost:5173/resources/js/app.jsx');
        </script>
    @else
        <!-- Production - Use built files -->
        <?php
        $assetsPath = public_path('build/assets');
        $jsFile = null;
        
        if (is_dir($assetsPath)) {
            $files = scandir($assetsPath);
            foreach ($files as $file) {
                if (strpos($file, 'app-') === 0 && strpos($file, '.js') !== false) {
                    $jsFile = $file;
                    break;
                }
            }
        }
        
        if ($jsFile) {
            echo '<script type="module" src="/build/assets/' . $jsFile . '"></script>';
        } else {
            echo '<div style="text-align: center; margin-top: 100px; color: red;">
                    <h2>Production: No Build Files</h2>
                    <p>Deployment may have failed. Check GitHub Actions.</p>
                  </div>';
        }
        ?>
    @endif
</head>
<body>
    <div id="app"></div>
</body>
</html>