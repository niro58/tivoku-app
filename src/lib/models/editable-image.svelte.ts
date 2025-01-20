import { browser } from '$app/environment';
import type { ImageSettingsCrop, ImageSettings, Vector2 } from '$lib/models';
import { randomString, hexToRgb } from '$lib/utils';
export class EditableImage {
	id = $state(randomString());
	src = $state('');
	filename = $state('');
	format = $state('');
	width = $state(0);
	height = $state(0);
	constructor(file: File) {
		this.loadFileData(file);
	}
	public async loadFileData(file: File) {
		this.filename = file.name.split('.').slice(0, -1).join('.');
		try {
			const fileData = await this.getFileData(file);
			this.src = fileData.src;
			this.format = file.type;
			this.width = fileData.width;
			this.height = fileData.height;
		} catch (e) {}
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
				img.onerror = reject;
				img.src = e.target?.result as string;
			};
			reader.onerror = reject;
			reader.readAsDataURL(file);
		});
	}
	getCanvasSize(aspectRatio: Vector2, cropType: ImageSettingsCrop): Vector2 {
		let cSize: Vector2 = {
			x: this.width,
			y: this.height
		};
		if (cropType === 'inside') {
			if (aspectRatio.x > aspectRatio.y) {
				cSize.y = Math.round((cSize.x / aspectRatio.x) * aspectRatio.y);
			} else if (aspectRatio.x < aspectRatio.y) {
				cSize.x = Math.round((cSize.y / aspectRatio.y) * aspectRatio.x);
			}
		} else if (cropType === 'outside') {
			if (aspectRatio.x > aspectRatio.y) {
				cSize.x = Math.round((cSize.y / aspectRatio.y) * aspectRatio.x);
			} else if (aspectRatio.x < aspectRatio.y) {
				cSize.y = Math.round((cSize.x / aspectRatio.x) * aspectRatio.y);
			}
		}
		return cSize;
	}
	async export(settings: ImageSettings): Promise<{ name: string; dataUrl: string } | undefined> {
		if (!browser) return;

		const canvas = document.createElement('canvas');
		const ctx = canvas.getContext('2d');
		if (!ctx) return;

		const { aspectRatio, backgroundColor, opacity, format } = settings;

		let cSize = this.getCanvasSize(aspectRatio, settings.cropType);
		canvas.width = cSize.x;
		canvas.height = cSize.y;

		const rgb = hexToRgb(backgroundColor);
		if (!rgb) return;

		ctx.fillStyle = `rgba(${rgb.r},${rgb.g},${rgb.b},${opacity})`;
		ctx.fillRect(0, 0, cSize.x, cSize.y);

		const img = new Image();
		return new Promise((resolve, reject) => {
			img.onload = () => {
				const offset: Vector2 =
					settings.cropType === 'inside'
						? {
								x: canvas.width !== this.width ? (canvas.width - this.width) / 2 : 0,
								y: canvas.height !== this.height ? (canvas.height - this.height) / 2 : 0
							}
						: {
								x: canvas.width !== this.width ? (canvas.width - this.width) / 2 : 0,
								y: canvas.height !== this.height ? (canvas.height - this.height) / 2 : 0
							};

				ctx.drawImage(img, offset.x, offset.y, this.width, this.height);
				const dataUrl = canvas.toDataURL(`image/${format}`);
				resolve({
					name: `${this.filename}.${format}`,
					dataUrl
				});
			};
			img.onerror = reject;
			img.src = this.src;
		});
	}
}
