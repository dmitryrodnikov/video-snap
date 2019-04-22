const defaultConfig = {numberOfThumbnails: 1, imageQuality: 1};
const VIDEO_READY_STATE = 4;
const DEFAULT_VIDEO_LOAD_WAIT_TIME = 2000;

export class ScreenShotCreator {
    private readonly video: HTMLVideoElement;
    private readonly canvas: HTMLCanvasElement;
    private readonly context: CanvasRenderingContext2D;
    private config: Config;

    /** @param videoSource - any valid video tag source (url, blob or blobUrl) */
    constructor(videoSource: string) {
        this.video = document.createElement('video');
        this.canvas = document.createElement('canvas');
        this.context = this.canvas.getContext('2d');

        if (!this.context) {
            throw new Error('Could not create context');
        }

        this.video.src = videoSource;
    }

    public async getScreenShots(config: Config = defaultConfig): Promise<string[]> {
        this.config = config; // todo wrong
        try {
            if (this.video.readyState !== VIDEO_READY_STATE) {
                await this.waitVideoLoading();
            }
            return await this.processVideo();
        } catch (e) {
            console.error('Error loading thumbnails', e);
            return [];
        }
    }

    private waitVideoLoading(maxWaitTime: number = DEFAULT_VIDEO_LOAD_WAIT_TIME): Promise<void> {
        return new Promise((resolve, reject) => {
            const onLoadedHandler = () => {
                removeListeners();
                resolve();
            };

            const onErrorHandler = () => {
                removeListeners();
                reject();
            };

            const removeListeners = () => {
                this.video.removeEventListener('error', onErrorHandler);
                this.video.removeEventListener('loadedmetadata', onLoadedHandler);
            };

            this.video.addEventListener('loadedmetadata', onLoadedHandler);
            this.video.addEventListener('error', onErrorHandler);
            setTimeout(onErrorHandler, maxWaitTime);
        });
    }

    private async processVideo(): Promise<string[]> {
        const {video, canvas, config} = this;
        const {numberOfThumbnails} = config;
        const thumbnails = [];
        const step = video.duration / numberOfThumbnails;
        // Match canvas and video size
        canvas.height = video.videoHeight;
        canvas.width = video.videoWidth;
        for (let i = 0; i < numberOfThumbnails; i++) {
            const thumbnail = await this.getScreenshot(step * i);
            thumbnails.push(thumbnail);
        }
        return thumbnails;
    }

    private waitEvent(element, event): Promise<void> {
        return new Promise(resolve => {
            const handler = () => {
                element.removeEventListener(event, handler);
                resolve();
            };
            element.addEventListener(event, handler);
        });
    }

    private convertCanvasImageToBlobUrl(canvas: HTMLCanvasElement): Promise<string> {
        return new Promise(resolve => {
            canvas.toBlob(
                (blob) => resolve(window.URL.createObjectURL(blob)),
                'image/jpeg',
                this.config.imageQuality
            );
        });
    }

    private async getScreenshot(time: number): Promise<string> {
        try {
            const {video, canvas, context} = this;
            // Rewind to specific frame
            video.currentTime = time;
            // Wait for video to process rewind
            await this.waitEvent(video, 'seeked');
            // Draw image on canvas from video
            context.drawImage(video, 0, 0, canvas.width, canvas.height);
            return await this.convertCanvasImageToBlobUrl(canvas);
        } catch (e) {
            console.error(e);
        }
    }
}

interface Config {
    numberOfThumbnails?: number,
    imageQuality?: number,
}
