# React Browser Extension

This project is a browser extension built with React and Webpack. It includes a popup, background service worker, and content scripts.

## Table of Contents

- [Introduction](#introduction)
- [Architecture](#architecture)
- [Setup](#setup)
- [Development](#development)
- [Build](#build)
- [Key Files](#key-files)

## Introduction

This browser extension demonstrates how to use React to build a modern browser extension. It includes the following components:
- Popup
- Background service worker
- Content scripts

## Architecture

The extension is structured as follows:
- **Popup**: A React component rendered in the extension's popup.
- **Background**: A service worker that runs in the background.
- **Content Scripts**: Scripts that interact with web pages.

## Setup

1. Clone the repository:
    ```sh
    git clone <repository-url>
    cd react-extension
    ```

2. Install dependencies:
    ```sh
    npm install
    ```

## Development

To start the development server with hot reloading:
```sh
npm start
```

## Build
```sh
npm run build
```

### Key Files
- public/manifest.json: Defines the extension's metadata and permissions.
- src/popup.js: React component for the popup.
- src/background.js: Background service worker.
- webpack.config.js: Webpack configuration file.
- package.json: Project dependencies and scripts.