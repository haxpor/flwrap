// fcw: fastlane config writer

var fs = require('fs');
var promise = require('bluebird');

module.exports = function() {
	var _ = this;

	let fastfile_fpath = './Fastfile';
	let deliverfile_fpath = './Deliverfile';
	let appfile_fpath = './appfile';
	let changelog_fpath = './changelog';

	// -- checking existence of file section
	
	_.existFastfileSync = function() {
		return fs.existsSync(fastfile_fpath);
	}

	_.existDeliverfileSync = function() {
		return fs.existsSync(deliverfile_fpath);
	}

	_.existAppfileSync = function() {
		return fs.existsSync(appfile_fpath);
	}

	_.existChangelogSync = function() {
		return fs.existsSync(changelog_fpath);
	}

	// -- write section

	_.writeDefaultFastfile = function() {
		return new promise((resolve, reject) => {
			let writeTextContent = require('./fcw_default_fastfile');
			fs.writeFile('./Fastfile', writeTextContent, function(err) {
				if (err) {
					return reject(err);
				}
				else {
					return resolve(writeTextContent);
				}
			});
		});
	}

	_.writeDefaultDeliverfile = function() {
		return new promise((resolve, reject) => {
			let writeTextContent = require('./fcw_default_deliverfile');
			fs.writeFile('./Deliverfile', writeTextContent, function(err) {
				if (err) {
					return reject(err);
				}
				else {
					return resolve(writeTextContent);
				}
			});
		});
	}

	_.writeDefaultAppfile = function() {
		return new promise((resolve, reject) => {
			let writeTextContent = require('./fcw_default_appfile');
			fs.writeFile('./Appfile', writeTextContent, function(err) {
				if (err) {
					return reject(err);
				}
				else {
					return resolve(writeTextContent);
				}
			});
		});
	}

	_.writeDefaultChangelog = function() {
		return new promise((resolve, reject) => {
			let writeTextContent = require('./fcw_default_changelog');
			fs.writeFile('./changelog', writeTextContent, function(err) {
				if (err) {
					return reject(err);
				}
				else {
					return resolve(writeTextContent);
				}
			});
		});
	}

	return _;

}();