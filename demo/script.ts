import {ScreenShotCreator} from '../src/ScreenShotCreator';

document.addEventListener('DOMContentLoaded', () => {
    const videoInput = document.createElement('input');
    videoInput.type = 'file';
    videoInput.accept = 'video/*';
    document.body.appendChild(videoInput);

    const renderThumbnails = (thumbnails: string[]): void => {
        thumbnails.forEach(thumbnail => {
            const img = document.createElement('img');
            img.src = thumbnail;
            img.style.width = '50px';
            document.body.appendChild(img);
        });
    };

    const handleVideoInputChange = async (): Promise<void> => {
        const file = videoInput.files[0];
        const fileUrl = window.URL.createObjectURL(file);
        const screenShotCreator = new ScreenShotCreator(fileUrl);
        const thumbnails = await screenShotCreator.getScreenShots({numberOfThumbnails: 10});
        renderThumbnails(thumbnails);
    };

    videoInput.addEventListener('change', handleVideoInputChange);
});
