/* eslint-disable */

var path = require('path');

desc('Check source for errors with eslint');
task('lint', {
	async: true
}, function(){
	var files = new jake.FileList(), eslintCfg;
	files.exclude('Jakefile');
	files.include('./src/*.js');
	eslintCfg= ['eslint'];
	eslintCfg.push.apply(eslintCfg,files.toArray());
	eslintCfg = eslintCfg.join(' ');
	jake.exec(eslintCfg,{printStdout:true},function (){
		console.log('\tCheck passed.\n');
		complete();
	})
});

desc('Combine source files');
task('build', ['lint'], {
	async: true
}, function(){
	jake.exec('npm run-script rollup', function() {
		console.log('Rolled up.');
		complete();
	});
});

desc('Compress bundled files');
task('uglify', ['build'], function(){
  jake.exec('npm run-script uglify', function() { console.log('Uglyfied.'); });
});

desc('Run PhantomJS tests');
task('test', ['lint'], function() {

	var karma = require('karma'),
	testConfig = {configFile : path.join(__dirname, './spec/karma.conf.js')};

	testConfig.browsers = ['PhantomJS'];

	function isArgv(optName) {
		 return process.argv.indexOf(optName) !== -1;
	}

	if (isArgv('--chrome')) {
		testConfig.browsers.push('Chrome');
	}
	if (isArgv('--safari')) {
		testConfig.browsers.push('Safari');
	}
	if (isArgv('--ff')) {
		testConfig.browsers.push('Firefox');
	}
	if (isArgv('--ie')) {
		testConfig.browsers.push('IE');
	}

	if (isArgv('--cov')) {
		testConfig.preprocessors = {
			'src/**/*.js': 'coverage'
		};
		testConfig.coverageReporter = {
			type : 'html',
			dir : 'coverage/'
		};
		testConfig.reporters = ['coverage'];
	}

	console.log('Running tests...');

	var server = new karma.Server(testConfig, function(exitCode) {
		if (!exitCode) {
			console.log('\tTests ran successfully.\n');
			complete();
		} else {
			process.exit(exitCode);
		}
	});
	server.start();
});

task('default', ['build', 'uglify']);
