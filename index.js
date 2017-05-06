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
else if (argv.p || argv['project-dir']) {

	// check if passed value exists
	if ((argv.p && typeof argv.p != 'string') || (argv['project-dir'] && typeof argv['project-dir'] != 'string') ) {
		console.log("No project directory specified.");
		console.log("Please specify project directory");
		process.exit(-1);
	}

	// check if fastlane is installed
	util.isProgramAvailable('fastlane')
		.then((available) => {
			util.dlog('fastlane is installed');

			// get fastlane's lane from user (if passed in)
			// if no value passed in, then use 'beta' as default
			if ((argv.f || argv['fastlane-lane']) &&
					((typeof argv.f == 'string' && argv.f != null) ||
					 (typeof argv['fastlane-lane'] == 'string' && argv['fastlane-lane'] != null))) {
				fastlane_lane = typeof argv.f == 'string' ? argv.f : (typeof argv['fastlane-lane'] == 'string' ? argv['fastlane-lane'] : 'beta');
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
		});
}
else if (argv.w || argv['write-default-fastlane-config']) {

	let fcw = require('./fcw/fcw');

	// get which kind of config file to write
	let kind = typeof argv.w == 'string' ? argv.w.toLowerCase() : (typeof argv['write-default-fastlane-config'] == 'string' ? argv['write-default-fastlane-config'].toLowerCase() : 'fastfile');

	if (kind == 'fastfile') {
		// check exist
		if (fcw.existFastfileSync()) {
			console.log("Fastfile exists. Stopped now.");
			process.exit(-1);
		}
		// write file
		else {
			fcw.writeDefaultFastfile()
				.then((result) => {
					console.log("Created default Fastfile");
				}, (e) => {
					console.log("Failed to create default Fastfile");
				});
		}
	}
	else if (kind == 'appfile') {
		// check exist
		if (fcw.existAppfileSync()) {
			console.log("Appfile exists. Stopped now.");
			process.exit(-1);
		}
		// write file
		else {
			fcw.writeDefaultAppfile()
				.then((result) => {
					console.log("Created default Appfile");
				}, (e) => {
					console.log("Failed to create default Appfile");
				});
		}
	}
	else if (kind == 'deliverfile') {
		// check exist
		if (fcw.existDeliverfileSync()) {
			console.log("Deliverfile exists. Stopped now.");
			process.exit(-1);
		}
		// write file
		else {
			fcw.writeDefaultDeliverfile()
				.then((result) => {
					console.log("Created default Deliverfile");
				}, (e) => {
					console.log("Failed to create default Deliverfile");
				});
		}
	}
	else if (kind == 'changelog') {
		// check exist
		if (fcw.existChangelogSync()) {
			console.log("Changelog file exists. Stopped now.");
			process.exit(-1);
		}
		// write file
		else {
			fcw.writeDefaultChangelog()
				.then((result) => {
					console.log("Created default Changelog");
				}, (e) => {
					console.log("Failed to create default Changelog");
				});
		}
	}
	// not recognize type of config file
	else {
		console.log("Not recognize type of default config file.");
	}
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