import type { Vector2 } from '$lib/models';
import { FFmpeg } from '@ffmpeg/ffmpeg';
import { fetchFile, toBlobURL } from '@ffmpeg/util';
import { onMount } from 'svelte';

export class VideoEditor {
	ffmpeg: FFmpeg | undefined = $state();
	currState: 'none' | 'loading' | 'loaded' | 'error' | 'transcoding' | 'done' = $state('none');
	currProgress: number = $state(0);
	videoEl: HTMLVideoElement | undefined = $state();

	isPaused: boolean = $state(true);
	currTime: number = $state(0);
	duration: number = $state(0);
	trim: number[] = $state([0, 0]);

	settings: {
		crop: Vector2;
		offset: Vector2;
		zoom: number;
		volume: number;
		opacity: number;
	} = $state({
		crop: { x: 0, y: 0 },
		offset: { x: 0, y: 0 },
		zoom: 1,
		volume: 1,
		opacity: 1
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
		this.currState = 'loading';

		const baseURL = 'https://unpkg.com/@ffmpeg/core@0.12.6/dist/esm';

		this.ffmpeg = new FFmpeg();

		this.ffmpeg.on('progress', ({ progress }) => {
			this.currProgress = Math.round(progress * 100);
		});
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
	public async load(file: File) {
		if (!this.ffmpeg) return;
		this.logs = [];
		this.currState = 'transcoding';

		await this.ffmpeg.writeFile(file.name, await fetchFile(file));

		await this.ffmpeg.exec(['-i', file.name, 'output.mp4']);
		const data = await this.ffmpeg.readFile('output.mp4');

		if (!this.videoEl) return;
		this.videoEl.src = URL.createObjectURL(new Blob([data], { type: 'video/mp4' }));
		this.currState = 'done';
	}
	public async export() {}
}
