import { defineConfig } from "vite";

export default defineConfig({
	plugins: [],
	assetsInclude: ["public/*.css"],
	build: {
		cssCodeSplit: false,
	},
	server: {
		host: "0.0.0.0",
		port: 8080,
	},
});
