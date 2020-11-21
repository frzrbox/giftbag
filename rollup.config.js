import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import babel from '@rollup/plugin-babel';
import { terser } from 'rollup-plugin-terser';

const extensions = ['.js', '.jsx', '.ts', '.tsx'];

export default [
	{
		input: 'src/index.js',
		output: [
			{
				file: 'lib/index.js',
				format: 'umd',
				name: 'Giftbag',
			},
		],
		plugins: [
			babel({
				exclude: 'node_modules/**',
				extensions,
			}),
			resolve(),
			commonjs(),
			terser(),
		],
	},
	{
		input: 'site/js/scripts.js',
		output: [
			{
				file: 'site/_includes/js/scripts.js',
				formate: 'umd',
			},
		],
		plugins: [
			babel({
				exclude: 'node_modules/**',
				extensions,
			}),
			resolve(),
			commonjs(),
			terser(),
		],
	},
];
