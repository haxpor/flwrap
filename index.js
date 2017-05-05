#!/usr/bin/env node

var fs = require('fs');
var subarg = require('subarg');
var util = require('./util');
var spawn = require('child_process').spawn;
var argv = subarg(process.argv.slice(2));

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
		}, (e) => {
			util.dlog('fastlane is not installed yet');
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