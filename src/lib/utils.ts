import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import type { Vector2 } from './models';

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}
export function randomString(length: number = 9) {
	let result = '';
	while (result.length < length) {
		result += Math.random().toString(36).substr(2, length);
	}
	return result.slice(0, length);
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

export function aspectRatioToKey(aspectRatio: Vector2) {
	return `${aspectRatio.x}:${aspectRatio.y}`;
}
export function keyToAspectRatio(key: string): Vector2 {
	const [x, y] = key.split(':').map(Number);
	return { x, y };
}
export function numberToTime(time: number) {
	const hours = Math.floor(time / 3600);
	const minutes = Math.floor(time / 60);
	const seconds = Math.floor(time % 60);
	return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
}
export function round(value: number, decimals: number = 0) {
	const factor = 10 ** decimals;
	return Math.round(value * factor) / factor;
}
