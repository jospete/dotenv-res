import * as yargs from 'yargs';
import { noop } from 'lodash';

import {
	generateAppEnvTs,
	initializeDotEnvConfigFile,
	syncDotEnvWithConfig
} from './util';

export const buildDotEnvResCLI = () => yargs
	.showHelpOnFail(true)
	.wrap(null)
	.option('config', {
		type: 'string',
		description: 'path to dotenv config json file',
		default: './dotenv.config.json'
	})
	.command(
		'init',
		'generate a new donenv config JSON file to start implementing variable declarations',
		noop,
		() => initializeDotEnvConfigFile()
	)
	.command(
		'sync',
		'add any new declarations from the config json file into the current .env file',
		subYargs => subYargs
			.option('target', {
				type: 'string',
				description: 'the target .env file to merge with, or the path to create a new .env file at',
				default: './.env'
			}),
		({ config, target }) => syncDotEnvWithConfig(config, target)
	)
	.command(
		'ts',
		'generate or regenerate a typescript wrapper class for the current dotenv configuration',
		subYargs => subYargs
			.option('output', {
				type: 'string',
				description: 'output path for the resulting ts file',
				default: './src/app.env.ts'
			}),
		({ config, output }) => generateAppEnvTs(config, output)
	);