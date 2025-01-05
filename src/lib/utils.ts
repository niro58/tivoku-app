import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}
export function createImageId() {
	return Math.random().toString(36).substr(2, 9);
}
export function hexToRgb(hex: string): { r: number; g: number; b: number } | null {
	if (hex.startsWith('#')) {
		hex = hex.slice(1);
	}
	if (hex.length === 3) {
		hex = hex
			.split('')
			.map((char) => char + char)
			.join('');
	}
	if (hex.length !== 6) {
		return null;
	}
	const num = parseInt(hex, 16);
	return {
		r: (num >> 16) & 255,
		g: (num >> 8) & 255,
		b: num & 255
	};
}
