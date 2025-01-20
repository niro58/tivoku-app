export type Vector2 = {
	x: number;
	y: number;
};
export type ImageSettingsCrop = 'inside' | 'outside';
export type ImageSettings = {
	aspectRatio: Vector2;
	backgroundColor: string;
	opacity: number;
	format: ImageExportFormats;
	cropType: ImageSettingsCrop;
	exportType: ResultExportFormats;
};

export const ImageExportFormats = Object.freeze({
	PNG: 'png',
	JPEG: 'jpeg',
	WEBP: 'webp'
} as const);
export type ImageExportFormats = (typeof ImageExportFormats)[keyof typeof ImageExportFormats];

export const ResultExportFormats = Object.freeze({
	ZIP: 'zip',
	SINGLE: 'single'
} as const);
export type ResultExportFormats = (typeof ResultExportFormats)[keyof typeof ResultExportFormats];
