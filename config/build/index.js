/**
 * @files 处理环境变量
 * @author yanghuning 2021.03.28
 */

'use strict'

let ora = require('ora');
let chalk = require('chalk');
let webpack = require('webpack');

module.exports = function (envLabel, callBack) {

	// 展示动画内容
	let spinner = ora(chalk.green(envLabel + '打包中…\r\n'));

	// 启动打包动画
	spinner.start();

	// 回调函数执行
	if (callBack) callBack(spinner, function (err, stats) {
		process.stdout.write(stats.toString({
			colors: true,
			modules: false,
			children: false, // 如果要编译TS，请开启此项配置
			chunks: false,
			chunkModules: false
		}) + '\n\n');

		// 打包失败
		if (stats.hasErrors()) {
			console.log(chalk.red('　打包失败!\n'));
			process.exit(1);
		}

		console.log(chalk.cyan('　' + envLabel + '编译完成!\n'));
	});
}