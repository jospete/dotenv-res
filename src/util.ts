import { copySync, existsSync, readJsonSync } from 'fs-extra';
import { DotEnvConfigContext, parseConfigContextFromJson } from './config-context';

export const initializeDotEnvConfigFile = () => {

	const outputPath = './dotenv.config.json';

	if (existsSync(outputPath)) {
		console.warn('output file already exists: ' + outputPath);
		return;
	}

	const assetPath = './node_modules/dotenv-res/assets/dotenv-config-starter.json';
	copySync(assetPath, outputPath);
};

export const parseConfigContext = (configFilePath: string): DotEnvConfigContext => {
	return parseConfigContextFromJson(readJsonSync(configFilePath));
};

export const syncDotEnvWithConfig = (configFilePath: string, dotEnvFilePath: string) => {

};

export const generateAppEnvTs = (configFilePath: string, outputFilePath: string) => {

};