const defaultConfig = {numberOfThumbnails: 1, imageQuality: 1};
const VIDEO_READY_STATE = 4;
const DEFAULT_VIDEO_LOAD_WAIT_TIME = 2000;

export class ScreenShotCreator {
    private readonly video: HTMLVideoElement;
    private readonly canvas: HTMLCanvasElement;
    private readonly context: CanvasRenderingContext2D;

    /**
     * @param videoSourceUrl - URL to a video
     */
    constructor(videoSourceUrl: string) {
        this.video = document.createElement('video');
        this.canvas = document.createElement('canvas');
        this.context = this.canvas.getContext('2d');

        if (!this.context) {
            throw new Error('Could not create canvas context');
        }

        this.video.crossOrigin = 'anonymous';
        this.video.src = videoSourceUrl;
    }

    /**
     * Asynchronously take screenshots from video source provided in constructor.
     * Specific number of screenshots equally distributed to whole video length.
     *
     * @param {Config} config - configuration for screenshots;
     *
     * @return {Promise<string[]>} - array of Blob URLs to screenshots
     */
    public async getScreenShots(config: Config = defaultConfig): Promise<string[]> {
        try {
            if (this.video.readyState !== VIDEO_READY_STATE) {
                await this.waitVideoLoading();
            }
            return await this.processVideo(config);
        } catch (e) {
            return e;
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
                reject('Error loading video');
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

    private async processVideo(config: Config): Promise<string[]> {
        try {
            const {video, canvas} = this;
            const {numberOfThumbnails} = config;
            const thumbnails = [];
            const step = video.duration / numberOfThumbnails;

            // Match canvas and video size
            canvas.height = video.videoHeight;
            canvas.width = video.videoWidth;

            for (let i = 0; i < numberOfThumbnails; i++) {
                const thumbnail = await this.captureImage(step * i, config.imageQuality);
                thumbnails.push(thumbnail);
            }

            return thumbnails;
        } catch (e) {
            return e;
        }
    }

    /**
     * Set video to a specific time and wait while video rewind.
     * Then draw image on canvas and convert it to Blob URL
     * @return {Promise<string>} - Blob URL
     */
    private async captureImage(time: number, quality: number): Promise<string> {
        try {
            const {video, canvas, context} = this;
            await this.rewindVideo(video, time);
            context.drawImage(video, 0, 0, canvas.width, canvas.height);
            return await this.convertCanvasImageToBlobUrl(canvas, quality);
        } catch (e) {
            return e;
        }
    }

    private rewindVideo(video: HTMLVideoElement, targetTime: number): Promise<void> {
        return new Promise(resolve => {
            video.currentTime = targetTime;
            const handler = () => {
                video.removeEventListener('seeked', handler);
                resolve();
            };
            video.addEventListener('seeked', handler);
        });
    }

    private convertCanvasImageToBlobUrl(canvas: HTMLCanvasElement, quality: number): Promise<string> {
        return new Promise(resolve => {
            canvas.toBlob(
                (blob) => resolve(window.URL.createObjectURL(blob)),
                'image/jpeg',
                quality
            );
        });
    }
}

interface Config {
    numberOfThumbnails?: number,
    imageQuality?: number,
}
