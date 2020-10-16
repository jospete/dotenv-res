import { copySync, existsSync } from 'fs-extra';

export const initializeDotEnvConfigFile = () => {

	const outputPath = './dotenv.config.json';

	if (existsSync(outputPath)) {
		console.warn('output file already exists: ' + outputPath);
		return;
	}

	const assetPath = './node_modules/dotenv-res/assets/dotenv-config-starter.json';
	copySync(assetPath, outputPath);
};