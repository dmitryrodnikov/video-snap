import {VideoSnap} from '../src';

const renderInput = (): void => {
    const videoInput = document.createElement('input');
    videoInput.type = 'file';
    videoInput.accept = 'video/*';

    const urlInput = document.createElement('input');
    urlInput.type = 'text';

    const renderThumbnails = (thumbnails: string[]): void => {
        thumbnails.forEach(thumbnail => {
            const img = document.createElement('img');
            img.src = thumbnail;
            img.style.width = '50px';
            document.body.appendChild(img);
        });
    };

    const handleVideoInputChange = async (): Promise<void> => {
        try {
            const file = videoInput.files[0];
            const fileUrl = window.URL.createObjectURL(file);
            const videoSnap = new VideoSnap(fileUrl);
            const thumbnails = await videoSnap.getFrames(10);
            renderThumbnails(thumbnails);
        } catch (e) {
            console.error(e);
        }
    };

    const handleUrlInputChange = async (url: string): Promise<void> => {
        try {
            const videoSnap = new VideoSnap(url);
            const thumbnails = await videoSnap.getFrames(10);
            renderThumbnails(thumbnails);
        } catch (e) {
            console.error(e);
        }
    };

    videoInput.addEventListener('change', handleVideoInputChange);
    urlInput.addEventListener('blur', (event: FocusEvent) => {
        const url = (event.target as HTMLInputElement).value;
        handleUrlInputChange(url);
    });

    document.body.appendChild(videoInput);
    document.body.appendChild(urlInput);
};

document.addEventListener('DOMContentLoaded', renderInput);
