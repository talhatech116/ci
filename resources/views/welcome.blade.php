<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>My React App</title>
</head>
<body>
    <div id="app"></div>

    <?php
    // PHP code to dynamically find the latest built JS file
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
        echo '
        <div style="text-align: center; margin-top: 100px; color: red;">
            <h2>React Build Error</h2>
            <p>No built JavaScript files found in: ' . $assetsPath . '</p>
            <p>Files found: ' . (is_dir($assetsPath) ? implode(", ", $files) : "Directory not found") . '</p>
        </div>';
    }
    ?>
</body>
</html>