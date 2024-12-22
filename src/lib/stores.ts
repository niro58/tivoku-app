import { get, writable, type Writable } from 'svelte/store';
import type { EditableImage } from './models/image.svelte';

export const editableImagesStore: Writable<EditableImage[]> = writable([]);

export const selectedImageStore: Writable<EditableImage> = writable();
editableImagesStore.subscribe((images) => {
	if (images.length === 0) {
		return;
	}
	const selected = get(selectedImageStore);
	const match = images.find((image) => image.id === selected?.id);
	if (selected && match) {
		return;
	}

	selectedImageStore.set(images[0]);
});
