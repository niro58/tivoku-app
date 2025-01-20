import { ImageExportFormats, ResultExportFormats, type ImageSettings } from '$lib/models';
import JSZip from 'jszip';
import { getContext, setContext } from 'svelte';
import { toast } from 'svelte-sonner';
import type { EditableImage } from './editable-image.svelte';
import { CONSTANTS } from '$data/constants';

const IMAGE_SELECTOR_KEY = Symbol('image-selector');

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
		$effect(() => {
			if (this.images.length > CONSTANTS.MAX_IMAGE_EDIT_AMOUNT) {
				this.images = this.images.slice(0, CONSTANTS.MAX_IMAGE_EDIT_AMOUNT);
				toast.error(`You can only have ${CONSTANTS.MAX_IMAGE_EDIT_AMOUNT} images at a time.`);
			}
		});
	}
	public async export() {
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
