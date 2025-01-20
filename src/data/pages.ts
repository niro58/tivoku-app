export const PAGES = Object.freeze({
	HOME: {
		title: 'Home',
		link: '/'
	},
	IMAGE_RESIZER: {
		title: 'Image Resizer',
		link: '/image-resizer'
	}
} as const);

export type PageType = (typeof PAGES)[keyof typeof PAGES];
