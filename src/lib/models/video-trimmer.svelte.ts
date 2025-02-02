import type { LogEvent } from '@ffmpeg/ffmpeg';
import { VideoEditor } from './video-editor.svelte';

export class VideoTrimmer extends VideoEditor {
	isPaused: boolean = $state(true);
	currTime: number = $state(0);
	duration: number = $state(0);
	trim: number[] = $state([0, 0]);

	logs: LogEvent[] = $state([]);
	constructor() {
		super();
		$effect(() => {
			if (!this.videoEl) return;

			this.videoEl.addEventListener('loadedmetadata', (e) => {
				const el = e.target as HTMLVideoElement;
				this.duration = el.duration;
				this.trim = [0, this.duration || 0];
			});
		});
		$effect(() => {
			if (this.trim[0] === 0 && this.trim[1] === 0) return;
			if (this.videoEl && (this.currTime < this.trim[0] || this.currTime > this.trim[1])) {
				this.currTime = this.trim[0];
			}
		});
		$effect(() => {
			if (this.currState === 'loaded' && this.ffmpeg) {
				this.ffmpeg.on('log', (log) => {
					this.logs.push(log);
				});
			}
		});
	}
}
