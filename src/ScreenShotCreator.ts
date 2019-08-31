const VIDEO_READY_STATE = 4;
const DEFAULT_CONFIG: Config = {
    imageQuality: 1,
    maxVideoLoadTime: 5000,
};

export class ScreenShotCreator {
    private readonly video: HTMLVideoElement;
    private readonly canvas: HTMLCanvasElement;
    private readonly context: CanvasRenderingContext2D;

    /** Wait for video to rewind to targetTime and resolve Promise */
    private static rewindVideo(video: HTMLVideoElement, targetTime: number): Promise<void> {
        return new Promise((resolve) => {
            const handler = () => {
                video.removeEventListener('seeked', handler);
                resolve();
            };
            video.addEventListener('seeked', handler);
            video.currentTime = targetTime;
        });
    }

    /**
     * @param videoSourceUrl - URL to a video
     */
    constructor(videoSourceUrl: string) {
        this.video = document.createElement('video');
        this.canvas = document.createElement('canvas');
        const context = this.canvas.getContext('2d');

        if (!context) {
            throw new Error('Could not create canvas context');
        }

        this.context = context;
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
        if (this.video.readyState !== VIDEO_READY_STATE) {
            await this.waitVideoLoading(config.maxVideoLoadTime);
        }

        // Match canvas and video size
        this.canvas.height = this.video.videoHeight;
        this.canvas.width = this.video.videoWidth;

        return this.getEvenlyDistributedImages(numberOfFrames, config);
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
        if (this.video.readyState !== VIDEO_READY_STATE) {
            await this.waitVideoLoading(config.maxVideoLoadTime);
        }

        // Match canvas and video size
        this.canvas.height = this.video.videoHeight;
        this.canvas.width = this.video.videoWidth;

        return await this.captureImage(time, config.imageQuality);
    }

    /**
     * Wait until video loaded, then resolves Promise
     * Rejects Promise on error
     * Rejects Promise if wait time exceeded maxWaitTime (if specified)
     * */
    private waitVideoLoading(maxWaitTime?: number): Promise<void> {
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

            if (maxWaitTime) {
                setTimeout(onErrorHandler, maxWaitTime);
            }
        });
    }

    /**
     * Make specific amount of screenshots evenly distributed from start to end of the video.
     *
     * @param numberOfImages - amount of screenshots to make
     * @param config - configuration object
     *
     * @return Promise with array of Blob url's to images
     */
    private async getEvenlyDistributedImages(numberOfImages: number, config: Config): Promise<string[]> {
        const images = [];
        const step = this.video.duration / numberOfImages;

        for (let i = 0; i < numberOfImages; i++) {
            const image = await this.captureImage(step * i, config.imageQuality);
            images.push(image);
        }

        return images;
    }

    /**
     * Set video to a specific time and wait while video rewind.
     * Then draw image on canvas and convert it to Blob URL
     */
    private async captureImage(time: number, quality: number = 1): Promise<string> {
        await ScreenShotCreator.rewindVideo(this.video, time);
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.context.drawImage(this.video, 0, 0, this.canvas.width, this.canvas.height);
        return this.convertCanvasImageToBlobUrl(this.canvas, quality);
    }

    /**
     * Convert image from canvas into Blob url in JPG (PNG in Edge)
     */
    private convertCanvasImageToBlobUrl(canvas: HTMLCanvasElement, quality: number): Promise<string> {
        return new Promise((resolve) => {
            if (canvas.toBlob) {
                canvas.toBlob(
                    (blob: Blob | null) => resolve(window.URL.createObjectURL(blob)),
                    'image/jpeg',
                    quality,
                );
            } else if ((canvas as any).msToBlob) {
                const blob = (canvas as any).msToBlob();
                resolve(window.URL.createObjectURL(blob));
            } else {
                throw new Error('canvas.toBlob and canvas.msToBlob are not supported');
            }
        });
    }
}

// Probably should be ImageConfig (maxWidth, maxHeight...), but maxVideoLoadTime is not related
interface Config {
    imageQuality?: number,
    maxVideoLoadTime?: number;
}
