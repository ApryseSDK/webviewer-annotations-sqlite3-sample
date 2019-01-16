var viewerElement = document.getElementById('viewer');
var viewer = new PDFTron.WebViewer({
  path: 'lib',
  l: atob(window.licenseKey), // Using atob(https://developer.mozilla.org/en-US/docs/Web/API/WindowOrWorkerGlobalScope/atob) to read encoded license key (see add-license.js for encryption)
  initialDoc: 'https://pdftron.s3.amazonaws.com/downloads/pl/webviewer-demo.pdf',
}, viewerElement);
var viewerInstance = null;
var annotManager = null;
var DOCUMENT_ID = 'webviewer-demo-1';

viewerElement.addEventListener('ready', function() {
  viewerInstance = viewer.getInstance();
  annotManager = viewerInstance.docViewer.getAnnotationManager();

  // Save when annotation change event is triggered (adding, modifying or deleting of annotations)
  annotManager.on('annotationChanged', function(e, annots) {
    // If the event is triggered by importing then it can be ignored
    // This will happen when importing the initial annotations from the server or individual changes from other users
    if (e.imported) return;

    const xfdfStrings = annotManager.getAnnotCommand();
    annots.forEach(function(annot) {
      savexfdfString(DOCUMENT_ID, annot.Id, xfdfStrings);
    });
  });
});

// Load annotations when document is loaded
viewerElement.addEventListener('documentLoaded', function() {
  loadxfdfStrings(DOCUMENT_ID).then(function(rows) {
    JSON.parse(rows).forEach(col => {
      const annotations = annotManager.importAnnotCommand(col.xfdfString);
      annotManager.drawAnnotationsFromList(annotations);
    });
  });
});

// Make a POST request with document ID, annotation ID and XFDF string
var savexfdfString = function(documentId, annotationId, xfdfString) {
  return new Promise(function(resolve) {
    fetch(`/server/annotationHandler.js?documentId=${documentId}`, {
      method: 'POST',
      body: JSON.stringify({
        annotationId, 
        xfdfString
      })
    }).then(function(res) {
      if (res.status === 200) {
        resolve();
      }
    });
  });
};

// Make a GET request to get XFDF string
var loadxfdfStrings = function(documentId) {
  return new Promise(function(resolve) {
    fetch(`/server/annotationHandler.js?documentId=${documentId}`, {
      method: 'GET'
    }).then(function(res) {
      if (res.status === 200) {
        res.text().then(function(xfdfStrings) {
          resolve(xfdfStrings);
        });
      }
    });
  });
};