# WebViewer annotations sample - using SQLite3 and Node.js backend

[WebViewer](https://www.pdftron.com/webviewer) is a powerful JavaScript-based PDF Library that's part of the [PDFTron PDF SDK](https://www.pdftron.com). It allows you to view and annotate PDF files on your web app with a fully customizable UI.

![WebViewer](https://www.pdftron.com/downloads/pl/webviewer-ui.png)

This is a WebViewer sample to show how you can save and load annotations through an SQLite3 database with Node.js backend.

## Initial setup

Before you begin, make sure your development environment includes [Node.js](https://nodejs.org/en/).

## Install

```
git clone https://github.com/PDFTron/webviewer-annotations-sqlite3-sample.git
cd webviewer-annotations-sqlite3-sample
npm install
```

## Run

```
npm start
```

## How to use

- Create annotations with annotations tools in the header
- Annotations will be automatically saved to database as you create and modify annotations
- Load annotations by refreshing the app
- You can find annotation data saved into an XFDF database in server folder

## Contributing

See [contributing](./CONTRIBUTING.md).

## License

See [license](./LICENSE).