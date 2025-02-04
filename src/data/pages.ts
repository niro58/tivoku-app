export const PAGES = Object.freeze({
	HOME: {
		title: 'Home',
		link: '/'
	},
	IMAGE_RESIZER: {
		title: 'Image Resizer',
		link: '/image-resizer'
	},
	VIDEO_CONVERTER: {
		title: 'Video Converter',
		link: '/video-converter'
	},
	WEBSITE_BLOCKER: {
		title: 'Website Blocker Extension',
		link: '/website-blocker'
	}
	// VIDEO_TRIMMER: {
	// 	title: 'Video Trimmer',
	// 	link: '/video-trimmer'
	// }
} as const);

export type PageType = (typeof PAGES)[keyof typeof PAGES];
