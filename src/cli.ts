import * as yargs from 'yargs';
import { noop } from 'lodash';
import { initializeDotEnvConfigFile } from './util';

export const buildDotEnvResCLI = () => yargs
	.showHelpOnFail(true)
	.wrap(null)
	.command(
		'init',
		'generate a new donenv config JSON file to start implementing variable declarations',
		noop,
		initializeDotEnvConfigFile
	);