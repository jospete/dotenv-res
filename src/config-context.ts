import { toString, toNumber, toLower, some, forEach, camelCase } from 'lodash';

export enum DotEnvConfigVariableType {
	string = 'string',
	boolean = 'boolean',
	number = 'number'
}

export interface DotEnvConfigVariableEntry {
	name: string;
	type: DotEnvConfigVariableType;
	defaultValue: string | boolean | number;
	coerceFunctionName: string;
	nameCamelCase: string;
}

export interface DotEnvConfigContext {
	entries: DotEnvConfigVariableEntry[];
}

export { toString, toNumber };

export const toBoolean = (value: any): boolean => {
	const normalized = toLower(toString(value));
	return some(['true', '1'], v => v === normalized);
};

export const coerceDotEnvConfigVariableType = (type: DotEnvConfigVariableType, value: any): any => {
	switch (type) {
		case DotEnvConfigVariableType.boolean:
			return toBoolean(value);
		case DotEnvConfigVariableType.number:
			return toNumber(value);
		case DotEnvConfigVariableType.string:
		default:
			return toString(value);
	}
};

export const getDotEnvTypeCoerceFunctionName = (type: DotEnvConfigVariableType): string => {
	switch (type) {
		case DotEnvConfigVariableType.boolean:
			return 'toBoolean';
		case DotEnvConfigVariableType.number:
			return 'toNumber';
		case DotEnvConfigVariableType.string:
		default:
			return 'toString';
	}
};

export const parseConfigContextFromJson = (rawJsonConfig: any): DotEnvConfigContext => {

	const result: DotEnvConfigContext = { entries: [] };
	const { entries } = (rawJsonConfig || {});

	forEach(entries, ({ type, defaultValue }, name) => {
		result.entries.push({
			name,
			type,
			nameCamelCase: camelCase(name),
			coerceFunctionName: getDotEnvTypeCoerceFunctionName(type),
			defaultValue: coerceDotEnvConfigVariableType(type, defaultValue)
		});
	});

	return result;
};