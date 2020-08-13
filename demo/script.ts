import {VideoSnap} from '../src';

const renderInput = (): void => {
    const frames = document.getElementById('frames') as HTMLInputElement;
    const videoInput = document.getElementById('fileInput') as HTMLInputElement;
    const thumbnailsNode = document.getElementById('thumbnails') as HTMLDivElement;

    const renderThumbnails = (thumbnails: string[]): void => {
        thumbnails.forEach(thumbnail => {
            const img = document.createElement('img');
            img.src = thumbnail;
            img.style.width = '150px';
            thumbnailsNode.appendChild(img);
        });
    };

    const handleVideoInputChange = async (): Promise<void> => {
        try {
            const file = videoInput.files[0];
            const fileUrl = window.URL.createObjectURL(file);
            const videoSnap = new VideoSnap(fileUrl);
            const thumbnails = await videoSnap.getFrames(Number(frames.value));
            renderThumbnails(thumbnails);
        } catch (e) {
            console.error(e);
        }
    };

    videoInput.addEventListener('change', handleVideoInputChange);
};

document.addEventListener('DOMContentLoaded', renderInput);
