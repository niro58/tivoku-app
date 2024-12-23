export type Vector2 = {
	x: number;
	y: number;
};
export type ImageSettings = {
	aspectRatio: Vector2;
	backgroundColor: string;
	opacity: number;
	format: ImageExportFormats;
};
export enum ImageExportFormats {
	PNG = 'png',
	JPEG = 'jpeg',
	WEBP = 'webp'
}
export function aspectRatioToKey(aspectRatio: Vector2) {
	return `${aspectRatio.x}:${aspectRatio.y}`;
}
