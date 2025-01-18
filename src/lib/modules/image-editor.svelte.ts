import type { EditableImage } from '$lib/models/image.svelte';
import { getContext, setContext } from 'svelte';

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
};
export enum ImageExportFormats {
	PNG = 'png',
	JPEG = 'jpeg',
	WEBP = 'webp'
}

export function aspectRatioToKey(aspectRatio: Vector2) {
	return `${aspectRatio.x}:${aspectRatio.y}`;
}
export function keyToAspectRatio(key: string): Vector2 {
	const [x, y] = key.split(':').map(Number);
	console.log(key);
	return { x, y };
}

class ImageEditor {
	public images: EditableImage[] = $state([]);
	public settings: ImageSettings = $state({
		aspectRatio: { x: 1, y: 1 },
		backgroundColor: '#ffffff',
		opacity: 1,
		format: ImageExportFormats.PNG,
		cropType: 'outside'
	});

	public exportImages() {
		this.images.map((image) => {
			image.export(this.settings);
		});
	}
}

export function setImageEditor() {
	return setContext(IMAGE_SELECTOR_KEY, new ImageEditor());
}
export function getImageEditor() {
	return getContext<ReturnType<typeof setImageEditor>>(IMAGE_SELECTOR_KEY);
}
