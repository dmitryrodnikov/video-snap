const VIDEO_READY_STATE = 4;
const DEFAULT_CONFIG: Config = {
    imageQuality: 1,
    maxVideoLoadTime: 5000,
};

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
     * Asynchronously take screenshots from video provided in constructor.
     * Specific number of screenshots equally distributed to whole video length.
     *
     * @param {number} numberOfFrames - number of images video should be sliced to
     * @param {Config} config - configuration for screenshots;
     *
     * @return Promise with array of Blob URLs to captured images.
     */
    public async getFrames(numberOfFrames: number, config: Config = DEFAULT_CONFIG): Promise<string[]> {
        try {
            // todo apply partial config (the rest is default)
            if (this.video.readyState !== VIDEO_READY_STATE) {
                await this.waitVideoLoading(config.maxVideoLoadTime);
            }

            const {video, canvas} = this;
            // Match canvas and video size
            canvas.height = video.videoHeight;
            canvas.width = video.videoWidth;

            return await this.processVideo(numberOfFrames, config);
        } catch (e) {
            return e;
        }
    }

    /**
     * Capture image from specific time of the video provided in constructor;
     *
     * @param time - time of the video where image should be taken
     * @param config - image capture params
     *
     * @return Promise with Blob URL to captured image.
     */
    public async getFrameFrom(time: number, config: Config): Promise<string> {
        try {
            // todo apply partial config (the rest is default)
            if (this.video.readyState !== VIDEO_READY_STATE) {
                await this.waitVideoLoading(config.maxVideoLoadTime);
            }

            const {video, canvas} = this;
            // Match canvas and video size
            canvas.height = video.videoHeight;
            canvas.width = video.videoWidth;

            return await this.captureImage(time, config.imageQuality);
        } catch (e) {
            return e;
        }
    }

    private waitVideoLoading(maxWaitTime: number): Promise<void> {
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

    private async processVideo(numberOfThumbnails: number, config: Config): Promise<string[]> {
        try {
            const {video} = this;
            const thumbnails = [];
            const step = video.duration / numberOfThumbnails;

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

// Probably should be ImageConfig (maxWidth, maxHeight...), but maxVideoLoadTime is not related
interface Config {
    imageQuality?: number,
    maxVideoLoadTime?: number;
}
