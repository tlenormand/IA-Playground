# IA Playground

## Description

This is the fontend application for the IA Playground project.

## requirements

- [nodejs](https://nodejs.org/en/) = 18.14.0

## Installation

Use the package manager [npm](https://www.npmjs.com/) to install the dependencies.

```bash
npm install
```

## Usage

Use the following command to run the application on the browser:
```bash
npm run web
```

## Linting

Use the following command to run eslint on the src folder:
```bash
npx eslint src
```

## Open browser with CORS disabled for local development (Windows)

Windows + R
```bash
brave.exe --user-data-dir="C://Chrome dev session" --disable-web-security "http://localhost:19006/"
```
