import react from '@vitejs/plugin-react-swc';
import { defineConfig, loadEnv } from 'vite';

export default defineConfig(({ mode }) => {
	const env = loadEnv(mode, '.', '');

	return {
		plugins: [react()],
		publicDir: false,
		define: {
			'process.env.API_URL': JSON.stringify(env.API_URL),
			'process.env.NODE_ENV': JSON.stringify(mode),
		},
		build: {
			outDir: 'build',
			rolldownOptions: {
				output: {
					entryFileNames: 'static/scripts/main.[hash].js',
					chunkFileNames: 'static/scripts/[name].[hash].js',
					assetFileNames: ({ names }) => {
						const name = names[0] ?? '';

						if (name.endsWith('.css')) {
							return 'static/styles/main.[hash].css';
						}
						if (/\.(woff2?|eot|ttf|otf)$/.test(name)) {
							return 'static/fonts/[hash][extname]';
						}
						if (/\.(png|jpe?g|gif|webp|svg)$/.test(name)) {
							return 'static/images/[hash][extname]';
						}
						return 'static/[name].[hash][extname]';
					},
				},
			},
		},
	};
});
