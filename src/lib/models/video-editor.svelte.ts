import { FFmpeg } from '@ffmpeg/ffmpeg';
import { fetchFile, toBlobURL } from '@ffmpeg/util';
import { onMount } from 'svelte';
export class VideoEditor {
	ffmpeg: FFmpeg | undefined = $state();
	currState: 'none' | 'loading' | 'loaded' | 'error' | 'transcoding' | 'done' = $state('none');
	videoEl: HTMLVideoElement | undefined = $state();
	constructor() {
		onMount(() => {
			this.loadFfmpeg();
		});
	}
	private async loadFfmpeg() {
		this.currState = 'loading';

		const baseURL = 'https://unpkg.com/@ffmpeg/core@0.12.6/dist/esm';

		this.ffmpeg = new FFmpeg();

		this.ffmpeg.on('log', ({ message }) => {
			console.log(message);
		});

		await this.ffmpeg.load({
			coreURL: await toBlobURL(`${baseURL}/ffmpeg-core.js`, 'text/javascript'),
			wasmURL: await toBlobURL(`${baseURL}/ffmpeg-core.wasm`, 'application/wasm')
		});

		this.currState = 'loaded';
	}
	public async test() {
		if (!this.ffmpeg) return;
		if (!this.videoEl) return;

		this.currState = 'transcoding';

		await this.ffmpeg.writeFile(
			'input.webm',
			await fetchFile(
				'https://raw.githubusercontent.com/ffmpegwasm/testdata/master/Big_Buck_Bunny_180_10s.webm'
			)
		);
		await this.ffmpeg.exec(['-i', 'input.webm', 'output.mp4']);
		const data = await this.ffmpeg.readFile('output.mp4');
		console.log(data);
		this.videoEl.src = URL.createObjectURL(new Blob([data], { type: 'video/mp4' }));
		this.currState = 'done';
	}
}
