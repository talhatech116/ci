<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>My React App</title>
</head>
<body>
    <div id="app"></div>

    <script>
        // Directly load the built JS file - no manifest needed
        const script = document.createElement('script');
        script.type = 'module';
        
        // Try common Vite build patterns
        const possiblePaths = [
            '/build/assets/app.js',
            '/build/assets/index.js', 
            '/build/assets/main.js'
        ];
        
        let currentTry = 0;
        
        function tryLoadScript() {
            if (currentTry >= possiblePaths.length) {
                console.error('No built JS file found');
                document.body.innerHTML = '<p style="color: red; text-align: center; margin-top: 100px;">Error: No built React files found. Check build process.</p>';
                return;
            }
            
            const path = possiblePaths[currentTry];
            script.src = path;
            
            script.onload = function() {
                console.log('✅ React loaded successfully from:', path);
            };
            
            script.onerror = function() {
                console.log('❌ Failed to load from:', path);
                currentTry++;
                tryLoadScript();
            };
            
            document.head.appendChild(script);
        }
        
        tryLoadScript();
    </script>
</body>
</html>