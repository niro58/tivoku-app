import type { VideoExportSettings } from '$lib/models';
import { Tween } from 'svelte/motion';
export class EditableVideo {
	settings?: VideoExportSettings;
	file: File | undefined = $state();
	filename: string = $state('');

	currState: 'none' | 'exporting' | 'error' | 'done' = $state('none');
	currProgress = new Tween(0);

	constructor(file: File) {
		console.log(file);
		this.file = file;
		this.filename = file.name;
	}
}
