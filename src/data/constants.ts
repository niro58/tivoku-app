export const CONSTANTS = Object.freeze({
	MAX_IMAGE_SIZE: 25 * 1024 * 1024,
	MAX_IMAGE_EDIT_AMOUNT: 100,
	MAX_VIDEO_SIZE: 100 * 1024 * 1024
} as const);

export type ConstantsType = (typeof CONSTANTS)[keyof typeof CONSTANTS];
