#!/usr/bin/env node

var fs = require('fs');
var subarg = require('subarg');
var util = require('./util');
var spawn = require('child_process').spawn;
var argv = subarg(process.argv.slice(2));

var fastlane_lane = 'beta';

if ((argv.h || argv.help)) {
	showUsage();
}
else if ((argv.p || argv['project-dir']) &&
				 ((typeof argv.p == "string" && argv.p != null) || 
				 	(typeof argv['project-dir'] == "string" && argv['project-dir'] != null))) {
	// check if fastlane is installed
	util.isProgramAvailable('fastlane')
		.then((available) => {
			util.dlog('fastlane is installed');

			// get fastlane's lane from user (if passed in)
			if ((argv.f || argv['fastlane-lane']) &&
					((typeof argv.f == "string" && argv.f != null) ||
					 (typeof argv['fastlane-lane'] == "string" && argv['fastlane-lane'] != null))) {
				fastlane_lane = argv.f ? argv.f : argv['fastlane-lane'];
			}

			util.dlog('-> fastlane_lane: \'' + fastlane_lane + '\'');

			// find 'fastlane' directory from project folder
			// execute at the current directory
			// - give the benefit for project-dir to be passed in relative to the current directory
			util.dlog(process.cwd() + " | " + (argv.p ? argv.p : argv['project-dir']));
			let retObjChk = util.executeSync('find', [argv.p ? argv.p : argv['project-dir'], '-type', 'd', '-name', 'fastlane'], { cwd: process.cwd() });
			let wdFastlane = null;

			if (retObjChk.status != 0) {
				console.log("Error from 'find' commnd to find working parent directory of 'fastlane' in project directory");
				process.exit(-1);
			}
			else {
				wdFastlane = retObjChk.stdout.substring(0, retObjChk.stdout.length-9);
				util.dlog("directory to cd to is " + wdFastlane);
			}

			// execute fastlane
			util.execute('fastlane', [fastlane_lane], { cwd: wdFastlane })
				.then((data) => {
					console.log(data);
				}, (e) => {
					console.log(e);
				});

		}, (e) => {
			util.dlog('fastlane is not installed yet');
			process.exit(-1);
		})
}
else {
	// no required information passed
	// show usage
	showUsage();
}

function showUsage() {
	return fs.createReadStream(__dirname + "/usage.txt")
					.pipe(process.stdout)
					.on('close', function() { process.exit(1); } );
}