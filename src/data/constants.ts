export const CONSTANTS = Object.freeze({
	MAX_IMAGE_SIZE: 20 * 1024 * 1024,
	MAX_IMAGE_EDIT_AMOUNT: 50
} as const);

export type ConstantsType = (typeof CONSTANTS)[keyof typeof CONSTANTS];
