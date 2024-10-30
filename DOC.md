# Browser Extension with React + Webpack

# Introduction

- What is Browser extension?
- Use Cases
    - Productivity, Security and accessibility
- Type of Browser extension? (e.g. Popup, In-Page, DevTool, Options)
    - Popup (e.g Cookie copy past, Dark mode etc..)
    - In-Page (e.g. Finsweet, Video/Music Downloader etc…)
    - DevTools (e.g. React DevTools, Redux DevTools etc…)

# **Architecture**

![extension-light.png](Browser%20Extension%20with%20React%20+%20Webpack%201287b48fdb778082a03bc8e82dcd76a8/extension-light.png)

# Manifest File

- The `manifest.json` defines how the extension interacts with the browser and the web.
- It includes metadata like name, version, and permissions.

### Structure

It's important to note that the manifest file structure can vary depending on the specific requirements of your extension. Here are some additional key components that you might include:

- Permissions: Specify what APIs and resources your extension can access.
- Background scripts: Define scripts that run in the background of the browser.
- Content scripts: Specify scripts that interact with web pages.

```json
{
  "manifest_version": 3,
  "name": "Minimal Manifest",
  "version": "1.0.0",
  "description": "A basic example extension with only required keys",
  "icons": {
    "48": "images/icon-48.png",
    "128": "images/icon-128.png"
  },
}
```

## Development Setup: React.js and Webpack

### 1. Set Up the Project

- Create a new folder for the extension project and initialise it with `npm`:

```bash
mkdir react-extension
cd react-extension
npm init -y
```

- Install necessary dependencies:

```bash
npm install react react-dom
npm install --save-dev webpack webpack-cli webpack-dev-server babel-loader @babel/core @babel/preset-env @babel/preset-react clean-webpack-plugin copy-webpack-plugin
```

### 2. Add Manifest File

In the `public/` folder, create a `manifest.json` file.

```jsx
{
    "manifest_version": 3,
    "name": "React Browser Extension",
    "description": "React Browser Extension description",
    "version": "1.0",
    "action": {
      "default_popup": "popup.html",
      "default_icon": "icon32.png"
    },
    "background": {
      "service_worker": "background.js"
    },
    "permissions": ["storage", "activeTab"],
    "icons": {
      "16": "icon16.png",
      "32": "icon32.png",
      "48": "icon48.png",
      "128": "icon128.png"
    },
    "content_security_policy": {
      "extension_pages": "script-src 'self'; object-src 'self';"
    }
  }
```

### 3.  Webpack Configuration

```jsx
// webpack.config.js
const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
    mode: 'development',
    devtool: "inline-source-map",
    entry: {
        popup: './src/popup.js',
        background: './src/background.js',
    },
    output: {
        filename: '[name].js',
        path: path.resolve(__dirname, 'build-extension'),
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                },
            },
        ],
    },
    plugins: [
        new CopyWebpackPlugin({
            patterns: [
                {
                    from: 'public',
                    globOptions: {
                        dot: true,
                        gitignore: true,
                    },
                },
            ],
        }),
        new CleanWebpackPlugin()
    ],
};
```

### 4. Babel Configuration

```jsx
// .babelrc
{
    "presets": [
        [
            "@babel/preset-env",
            {
                "targets": {
                    "esmodules": true
                }
            }
        ],
        "@babel/preset-react"
    ]
}
```

### 5. Setup Popup page

- Popup HTML

```html
<!-- public/popup.html -->
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Extension Popup</title>
</head>
<body>
  <div id="root"></div>
  <script src="popup.js"></script>
</body>
</html>
```

- Popup Component

```jsx
// src/Popup.js
import React from 'react';
import ReactDOM from 'react-dom/client';

const Popup = () => {
  const handleClick = () => {
    alert('Hello from React Extension Popup!');
  };

  return (
    <div style={{ width: "400px", height: "500px" }}>
      <h1>My Browser Extension Popup</h1>
      <button onClick={handleClick}>Click Me</button>
    </div>
  );
};

ReactDOM.createRoot(document.getElementById('root')).render(<Popup />);
```

### 6. Create Background service worker (MV3)

```jsx
// src/background.js
chrome.runtime.onInstalled.addListener(() => {
  console.log('Extension installed');
});
```

### 7. Build the Extension

```json
// package.json
{
  "name": "react-extension",
  "version": "1.0.0",
  "scripts": {
    "build": "webpack --mode production --config webpack.config.js",
    "start": "webpack --watch --stats-error-details --config webpack.config.js"
  }
}
```

## Additional Tips for Development

### 1. Content script

### Problem: Styling Issue in Extension UI

- **Inconsistent UI**: The extension's user interface appears inconsistent across different websites.
- **Cause**: The style/UI framework is referencing numeric variables in `rem` units.
- **Issue**: Variations in root font sizes across websites cause inconsistent styling due to the use of `rem` units.

### Solution:

- **Shadow DOM**: Implement the Shadow DOM to isolate and render the extension’s UI, preventing interference from external website styles.
- **Style Caching Mechanism**: Use a style caching mechanism to ensure consistent and efficient styling across all instances (e.g. @emotion/cache)

### Problem: Unable to Access Private Object from Window

- **Issue**: The custom object on the `window` is not accessible directly from the extension.

### Solution:

- **Custom Event Listener**: Implement a custom event listener to communicate with the `window` object and retrieve the private custom object, enabling smooth interaction between the extension and the webpage.

```jsx
window.addEventListener(customeEventReq, function() {
		const data = window.customObject.data
		
		const resCustomEvent = new CustomEvent(customeEventReq, {
			detail: { data }
		})
		
		window.dispatchEvent(resCustomEvent)
})
```

### 2. Cross Browser Comparability

- Firefox supports `browser.*` namespace, while Chrome uses `chrome.*`.
- Some APIs, like `chrome.webRequest`, behave differently between MV2 and MV3 across browsers.
- Use tools like `polyfill` to handle API differences.
- Create conditional logic to handle browser-specific code.

**Key Differences Between Browsers**:

- **Google Chrome**: Known for its MV3 migration and strong developer ecosystem.
- **Mozilla Firefox**: Favours MV2 extensions but is moving towards MV3.
- **Microsoft Edge**: Similar to Chrome with some Edge-specific APIs.
- **Apple Safari**: Requires unique development tools (Xcode), has more stringent restrictions.

## Frameworks and Libraries

- WXT - Next-gen Web Extension Framework ([https://wxt.dev/](https://wxt.dev/))
- Plasmo - ([https://www.plasmo.com/](https://www.plasmo.com/))