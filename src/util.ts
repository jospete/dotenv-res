import { parse as parseDotEnvText } from 'dotenv';
import { readJsonSync, readFileSync } from 'fs-extra';
import { toString, isString } from 'lodash';

import { DotEnvConfigContext, parseConfigContextFromJson } from './config-context';

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
