import { createImageId } from "$lib/utils";

export class EditableImage {
	id = $state(createImageId());
	src = $state('');
	alt = $state('');
	width = $state(0);
	height = $state(0);

	constructor(file: File) {
		this.alt = file.name;
		this.loadFileData(file);
	}

	private async loadFileData(file: File) {
		const fileData = await this.getFileData(file);
		this.src = fileData.src;
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
}
