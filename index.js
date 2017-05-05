#!/usr/bin/env node

var fs = require('fs');
var subarg = require('subarg');
var util = require('./util');
var spawn = require('child_process').spawn;
var argv = subarg(process.argv.slice(2));

var xcode_path = null;
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

			// get xcode-select path from user's passed parameter (if any)
			if ((argv.x || argv['xcode-path']) &&
					((typeof argv.x == "string" && argv.x != null) ||
					 (typeof argv['xcode-path'] == "string" && argv['xcode-path'] != null))) {
				xcode_path = argv.x ? argv.x : argv['xcode-path'];
			}
			// otherwise, get value from executing `xcode-select`
			else {
				let retObjChk = util.executeSync('xcode-select', ['-p']);

				if (retObjChk.status != 0) {
					console.log("Error from 'xcode-select -p' with '" + retObjChk.stderr + "'");
					process.exit(-1);
				}
				else {
					xcode_path = retObjChk.stdout;
				}
			}

			// get fastlane's lane from user (if passed in)
			if ((argv.f || argv['fastlane-lane']) &&
					((typeof argv.f == "string" && argv.f != null) ||
					 (typeof argv['fastlane-lane'] == "string" && argv['fastlane-lane'] != null))) {
				fastlane_lane = argv.f ? argv.f : argv['fastlane-lane'];
			}

			util.dlog('-> xcode_path: \'' + xcode_path + '\'');
			util.dlog('-> fastlane_lane: \'' + fastlane_lane + '\'');

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