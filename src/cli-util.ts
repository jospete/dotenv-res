import { sep, resolve, join } from 'path';
import { compile as compileHandlebarsTemplate } from 'handlebars';
import { copySync, existsSync, readFileSync, writeFileSync } from 'fs-extra';
import { forEach, defaults, map } from 'lodash';

import { parseConfigContext, parseDotEnvJson, toDotEnvPair } from './util';

export const getAssetPath = (relativeAssetPath: string): string => {
	return resolve(join('node_modules/dotenv-res/assets', relativeAssetPath));
};

export const initializeDotEnvConfigFile = () => {

	const outputPath = './dotenv.config.json';

	if (existsSync(outputPath)) {
		console.warn('output file already exists: ' + outputPath);
		return;
	}

	const assetPath = getAssetPath('dotenv-config-starter.json');
	copySync(assetPath, outputPath);
};

export const syncDotEnvWithConfig = (configFilePath: string, dotEnvFilePath: string) => {

	const context = parseConfigContext(configFilePath);
	const dotEnvJson = parseDotEnvJson(dotEnvFilePath);
	const addons: any = {};

	forEach(context.entries, entry => {
		addons[entry.name] = entry.defaultValue;
	});

	const output = map(defaults(dotEnvJson, addons), toDotEnvPair).join(sep);
	writeFileSync(dotEnvFilePath, output, 'utf8');
};

export const generateAppEnvTs = (configFilePath: string, outputFilePath: string) => {
	const context = parseConfigContext(configFilePath);
	const handlebarsTemplateText = readFileSync(getAssetPath('app.env.ts.hbs'), 'utf8');
	const render = compileHandlebarsTemplate(handlebarsTemplateText, { noEscape: true });
	writeFileSync(outputFilePath, render(context), 'utf8');
};