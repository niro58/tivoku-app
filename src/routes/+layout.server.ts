import { env } from '$env/dynamic/public';
import { redirect } from '@sveltejs/kit';

export const load = async ({ url }) => {
	if (env.PUBLIC_MODE === 'prod') {
		const { host } = url;
		if (!host.startsWith('www.')) {
			return redirect(301, `https://www.${url.host}${url.pathname}${url.search}`);
		}
	}
};
