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
        // Dynamically find and load the latest built React file
        fetch('/build/assets/')
            .then(response => response.text())
            .then(html => {
                // Parse the directory listing
                const parser = new DOMParser();
                const doc = parser.parseFromString(html, 'text/html');
                const links = Array.from(doc.querySelectorAll('a[href]'));
                
                // Find the main JS file (starts with 'app-' and ends with '.js')
                const jsFiles = links
                    .map(link => link.getAttribute('href'))
                    .filter(href => href.startsWith('app-') && href.endsWith('.js'))
                    .sort()
                    .reverse(); // Get latest file
                
                if (jsFiles.length > 0) {
                    const latestJsFile = jsFiles[0];
                    console.log('📦 Loading React file:', latestJsFile);
                    
                    const script = document.createElement('script');
                    script.type = 'module';
                    script.src = '/build/assets/' + latestJsFile;
                    document.head.appendChild(script);
                } else {
                    throw new Error('No built React files found');
                }
            })
            .catch(error => {
                console.error('❌ Error loading React:', error);
                document.body.innerHTML = `
                    <div style="text-align: center; margin-top: 100px; color: red;">
                        <h2>React Build Error</h2>
                        <p>No built JavaScript files found.</p>
                        <p>Check that the React build completed successfully.</p>
                    </div>
                `;
            });
    </script>
</body>
</html>