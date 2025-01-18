import { defineConfig } from 'vitest/config';
import { sveltekit } from '@sveltejs/kit/vite';

export default defineConfig({
	plugins: [sveltekit()],
	build: {
		outDir: 'dist'
	}
	test: {
		include: ['src/**/*.{test,spec}.{js,ts}']
	}
});
