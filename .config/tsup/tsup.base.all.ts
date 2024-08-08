// vim: noexpandtab

import * as fs from 'fs';
import * as path from 'path';

import type { Options } from 'tsup';

const env = process.env.NODE_ENV;
const package_json = JSON.parse(
	fs.readFileSync(path.resolve(path.join(__dirname, '..', '..', 'package.json')), 'utf8')
);

const SharedConfig = {
	name: package_json.name,
	minify: env === 'production',
	dts: false,
	clean: env === 'production',
	sourcemap: true,
} as Options;

export { SharedConfig };
