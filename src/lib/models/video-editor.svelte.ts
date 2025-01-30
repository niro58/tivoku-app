import {
	ResultAudioFormat,
	ResultVideoFormat,
	type Vector2,
	type VideoExportSettings
} from '$lib/models';
import { FFmpeg, type FileData } from '@ffmpeg/ffmpeg';
import { fetchFile, toBlobURL } from '@ffmpeg/util';
import { onMount } from 'svelte';
import { EditableVideo } from './editable-video.svelte';

export class VideoEditor {
	ffmpeg: FFmpeg | undefined = $state();
	currState: 'none' | 'loaded' = $state('none');
	videoEl: HTMLVideoElement | undefined = $state();
	videos: EditableVideo[] = $state([]);

	isPaused: boolean = $state(true);
	currTime: number = $state(0);
	duration: number = $state(0);
	trim: number[] = $state([0, 0]);

	exportSettings: VideoExportSettings = $state({
		crop: { x: 0, y: 0 },
		offset: { x: 0, y: 0 },
		zoom: 1,
		volume: 1,
		opacity: 1,
		exportFormat: ResultVideoFormat.MP4
	});

	logs: string[] = $state([]);
	constructor() {
		onMount(() => {
			this.loadFfmpeg();
		});
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
	}
	private async loadFfmpeg() {
		const baseURL = 'https://unpkg.com/@ffmpeg/core@0.12.6/dist/esm';

		this.ffmpeg = new FFmpeg();

		this.ffmpeg.on('log', ({ message }) => {
			this.logs.push(message);
		});

		await this.ffmpeg.load({
			coreURL: await toBlobURL(`${baseURL}/ffmpeg-core.js`, 'text/javascript'),
			wasmURL: await toBlobURL(`${baseURL}/ffmpeg-core.wasm`, 'application/wasm')
		});

		this.currState = 'loaded';
	}
	stringToSeconds(duration: string) {
		const [hours, minutes, seconds] = duration.split(':').map((x) => parseFloat(x));
		const milliseconds = duration.split('.')[1] ? parseFloat(duration.split('.')[1]) : 0;
		return hours * 3600 + minutes * 60 + seconds + milliseconds / 1000;
	}
	//metadata can be gathered from logs
	public async load(file: File | FileList) {
		if (file instanceof FileList) {
			for (const f of file) {
				await this.load(f);
			}
			return;
		}
		this.videos.push(new EditableVideo(file));
	}
	async export() {
		this.videos.map(async (video) => {
			if (!this.ffmpeg) return;
			this.ffmpeg.on('progress', ({ progress }) => {
				video.currProgress.target = Math.round(progress * 100);
			});

			video.currState = 'exporting';
			await this.ffmpeg.writeFile(video.filename, await fetchFile(video.file));

			await this.ffmpeg.exec(['-i', video.filename, `output.${this.exportSettings.exportFormat}`]);
			const data = await this.ffmpeg.readFile(`output.${this.exportSettings.exportFormat}`);

			const a = document.createElement('a');
			a.href = URL.createObjectURL(new Blob([data]));
			a.download = `output.${this.exportSettings.exportFormat}`;
			a.click();
			video.currState = 'done';
		});
	}
}
