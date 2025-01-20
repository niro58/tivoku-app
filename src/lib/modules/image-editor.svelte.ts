import type { EditableImage } from '$lib/models/image.svelte';
import JSZip from 'jszip';
import { getContext, setContext } from 'svelte';
import { toast } from 'svelte-sonner';

const IMAGE_SELECTOR_KEY = Symbol('image-selector');

export type Vector2 = {
	x: number;
	y: number;
};
export type CropType = 'inside' | 'outside';
export type ImageSettings = {
	aspectRatio: Vector2;
	backgroundColor: string;
	opacity: number;
	format: ImageExportFormats;
	cropType: CropType;
	exportType: ResultExportFormats;
};
export enum ImageExportFormats {
	PNG = 'png',
	JPEG = 'jpeg',
	WEBP = 'webp'
}
export enum ResultExportFormats {
	ZIP = 'zip',
	SINGLE = 'single'
}

export function aspectRatioToKey(aspectRatio: Vector2) {
	return `${aspectRatio.x}:${aspectRatio.y}`;
}
export function keyToAspectRatio(key: string): Vector2 {
	const [x, y] = key.split(':').map(Number);
	return { x, y };
}

class ImageEditor {
	public images: EditableImage[] = $state([]);
	public settings: ImageSettings = $state({
		aspectRatio: { x: 1, y: 1 },
		backgroundColor: '#000000',
		opacity: 0,
		format: ImageExportFormats.PNG,
		cropType: 'outside',
		exportType: ResultExportFormats.SINGLE
	});
	constructor() {
		const MAX_IMAGES = 50;
		$effect(() => {
			if (this.images.length > MAX_IMAGES) {
				this.images = this.images.slice(0, MAX_IMAGES);
				toast.error(`You can only have ${MAX_IMAGES} images at a time.`);
			}
		});
	}
	public async exportImages() {
		const dataUrls: {
			name: string;
			dataUrl: string;
		}[] = [];

		for (let i = 0; i < this.images.length; i++) {
			const image = this.images[i];
			const dataUrl = await image.export(this.settings);
			if (dataUrl) {
				dataUrls.push(dataUrl);
			}
		}

		if (this.settings.exportType === ResultExportFormats.ZIP) {
			const zip = new JSZip();
			for (let i = 0; i < dataUrls.length; i++) {
				zip.file(dataUrls[i].name, dataUrls[i].dataUrl.split('base64,')[1], { base64: true });
			}
			const blob = await zip.generateAsync({ type: 'blob' });
			const a = document.createElement('a');
			a.href = URL.createObjectURL(blob);
			a.download = 'images.zip';
			a.click();
		}
		if (this.settings.exportType === ResultExportFormats.SINGLE) {
			for (let i = 0; i < dataUrls.length; i++) {
				const a = document.createElement('a');
				a.href = dataUrls[i].dataUrl;
				a.download = dataUrls[i].name;
				a.click();
			}
		}
		if (dataUrls.length !== this.images.length) {
			toast.error(
				`Some images could not be exported. Exported ${dataUrls.length} out of ${this.images.length}.`
			);
		} else {
			toast.success(`All images exported successfully.`);
		}
	}
}

export function setImageEditor() {
	return setContext(IMAGE_SELECTOR_KEY, new ImageEditor());
}
export function getImageEditor() {
	return getContext<ReturnType<typeof setImageEditor>>(IMAGE_SELECTOR_KEY);
}
