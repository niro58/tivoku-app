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
	exportType: ResultFileFormat;
};

export const ImageExportFormats = Object.freeze({
	PNG: 'png',
	JPEG: 'jpeg',
	WEBP: 'webp'
} as const);
export type ImageExportFormats = (typeof ImageExportFormats)[keyof typeof ImageExportFormats];

export const ResultFileFormat = Object.freeze({
	ZIP: 'zip',
	SINGLE: 'single'
} as const);
export type ResultFileFormat = (typeof ResultFileFormat)[keyof typeof ResultFileFormat];

export const ResultVideoFormat = Object.freeze({
	THREEGP: '3gp',
	AVI: 'avi',
	FLV: 'flv',
	MKV: 'mkv',
	MOV: 'mov',
	MP4: 'mp4',
	OGV: 'ogv',
	WEBM: 'webm',
	WMV: 'wmv'
} as const);
export type ResultVideoFormat = (typeof ResultVideoFormat)[keyof typeof ResultVideoFormat];

export const ResultAudioFormat = Object.freeze({
	AAC: 'aac',
	AIFF: 'aiff',
	ALAC: 'alac',
	AMR: 'amr',
	FLAC: 'flac',
	M4A: 'm4a',
	MP3: 'mp3',
	OGG: 'ogg',
	WAV: 'wav',
	WMA: 'wma'
} as const);
export type ResultAudioFormat = (typeof ResultAudioFormat)[keyof typeof ResultAudioFormat];
export type VideoExportSettings = {
	resolution?: number;
	fps?: number;
	width?: number;
	height?: number;

	crop?: Vector2;
	offset?: Vector2;
	zoom?: number;
	volume?: number;
	opacity?: number;
	exportFormat: ResultVideoFormat | ResultAudioFormat;
};
