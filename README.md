# VideoSnap
Get multiple snapshots from video in a browser.

## Usage
Imagine you want to render thumbnails for a video that user just added to file input.

```javascript
// 1. Get File object from fileInput
const file = fileInput.files[0];

// 2. Convert File object to url
const fileUrl = window.URL.createObjectURL(file);

// 3. Create new instance of VideoSnap with that url
const videoSnap = new VideoSnap(fileUrl);

// 4. Get an array of image urls (Blob urls) from that video
videoSnap.getFrames(10).then(thumbnails => {
    // Use generated thumbnails here
});
```
