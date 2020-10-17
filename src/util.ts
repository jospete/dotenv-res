import { sep, join, resolve } from 'path';
import { parse as parseDotEnvText } from 'dotenv';
import { compile as compileHandlebarsTemplate } from 'handlebars';
import { copySync, existsSync, readJsonSync, readFileSync, writeFileSync } from 'fs-extra';
import { forEach, defaults, map, toString, isString } from 'lodash';

import { DotEnvConfigContext, parseConfigContextFromJson } from './config-context';

export const getAssetPath = (relativeAssetPath: string): string => {
	return resolve(join('node_modules/dotenv-res/assets', relativeAssetPath));
};

export const parseConfigContext = (configFilePath: string): DotEnvConfigContext => {
	return parseConfigContextFromJson(readJsonSync(configFilePath));
};

export const parseDotEnvJson = (dotEnvFilePath: string): any => {
	return parseDotEnvText(readFileSync(dotEnvFilePath, 'utf8'));
};

export const toDotEnvPair = (value: any, key: string): string => {
	const normalizedValue = isString(value) ? ('\"' + value + '\"') : toString(value);
	return key + '=' + normalizedValue;
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
	const handlebarsTemplateText = readFileSync(getAssetPath('app.ent.ts.hbs'), 'utf8');
	const render = compileHandlebarsTemplate(handlebarsTemplateText, { noEscape: true });
	writeFileSync(outputFilePath, render(context), 'utf8');
};