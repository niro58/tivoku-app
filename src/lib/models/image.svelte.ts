import { browser } from '$app/environment';
import { createImageId, hexToRgb } from '$lib/utils';
import type { ImageSettings, Vector2 } from './imageSettings';
export class EditableImage {
	id = $state(createImageId());
	src = $state('');
	filename = $state('');
	format = $state('');
	width = $state(0);
	height = $state(0);

	constructor(file: File) {
		this.filename = file.name;
		this.loadFileData(file);
	}

	private async loadFileData(file: File) {
		const fileData = await this.getFileData(file);
		this.src = fileData.src;
		this.format = file.type;
		this.width = fileData.width;
		this.height = fileData.height;
	}

	private getFileData(file: File): Promise<{ width: number; height: number; src: string }> {
		return new Promise((resolve, reject) => {
			const reader = new FileReader();
			reader.onload = (e) => {
				const img = new Image();
				img.onload = () => {
					resolve({
						width: img.width,
						height: img.height,
						src: e.target?.result as string
					});
				};
				img.src = e.target?.result as string;
			};
			reader.readAsDataURL(file);
		});
	}
	getCanvasSize(aspectRatio: Vector2): Vector2 {
		let cSize: Vector2 = {
			x: this.width,
			y: this.height
		};
		if (aspectRatio.x > aspectRatio.y) {
			cSize.x = Math.round((cSize.y / aspectRatio.y) * aspectRatio.x);
		} else if (aspectRatio.x < aspectRatio.y) {
			cSize.y = Math.round((cSize.x / aspectRatio.x) * aspectRatio.y);
		}
		return cSize;
	}
	async export(settings: ImageSettings) {
		if (!browser) return;

		const canvas = document.createElement('canvas');
		const ctx = canvas.getContext('2d');
		if (!ctx) return;

		const { aspectRatio, backgroundColor, opacity, format } = settings;

		let cSize = this.getCanvasSize(aspectRatio);
		canvas.width = cSize.x;
		canvas.height = cSize.y;

		const rgb = hexToRgb(backgroundColor);
		if (!rgb) return;

		ctx.fillStyle = `rgba(${rgb.r},${rgb.g},${rgb.b},${opacity})`;
		console.log(ctx.fillStyle);
		ctx.fillRect(0, 0, cSize.x, cSize.y);

		const img = new Image();
		img.onload = () => {
			const offset: Vector2 = {
				x: canvas.width !== this.width ? (canvas.width - this.width) / 2 : 0,
				y: canvas.height !== this.height ? (canvas.height - this.height) / 2 : 0
			};
			console.log(offset);
			console.log('canvas', canvas);
			console.log('this', this.width, this.height);

			ctx.drawImage(img, offset.x, offset.y, this.width, this.height);
			const dataUrl = canvas.toDataURL(`image/${format}`);
			const a = document.createElement('a');
			a.href = dataUrl;
			a.download = `${this.filename}.${format}`;
			a.click();
		};
		img.src = this.src;
	}
}
