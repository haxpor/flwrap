var spawn = require('child_process').spawn;
var promise=require("bluebird");

module.exports = function() {
	var _ = this;
	var _isDebugMode = true;

	/**
	 * Set to enable debug mode.
	 * @param {Boolean} mode true to set to debug mode, otherse set to false.
	 */
	_.setDebugMode = function(mode) {
		_._isDebugMode = mode;
	}
	/**
	 * Return debug mode.
	 * @return {Boolean} true if debug mode is set, otherwise return false.
	 */
	_.getDebugMode = function() {
		return _._isDebugMode;
	}

	/**
	 * Check if program available by input name.
	 * Available means it's is installed on cliet machine which is running this script.
	 * 
	 * @param  {String}  name name of program to check
	 * @return {Object}      Promise object with `resolve(available)`; `available` is boolean, true if the program is available, otherwise false. Or `reject(e)`` if it's error, `e` is string error.
	 * @method  isProgramAvailable
	 * @memberOf util
	 */
	_.isProgramAvailable = function(name) {

		return new promise((resolve, reject) => {
			_.execute('which', [name])
				.then((data) => {
					return resolve(data != null && data.search(name) != -1 ? true : false);
				}, (e) => {
					// even if the program failed to execute (`which`) we return false
					return reject(false);
				});
		});
	}

	/**
	 * Execute a program with options to receive its callback.
	 * @param  {String} programName   program name to execute
	 * @param  {[type]} arrayOfParams array of parameters
	 * @return {Object}               Promise object
	 */
	_.execute = function(programName, arrayOfParams) {
		const cmd = spawn(programName, arrayOfParams);

		return new promise((resolve, reject) => {
			cmd.stdout.on('data', (data) => {
				let str = arrayBufferToString(data).replace(/^\s+|\s+$/g,"");
				_.dlog(`${programName}: ${str}`)
				return resolve(str);
			});

			cmd.stderr.on('data', (data) => {
				let str = arrayBufferToString(data).replace(/^\s+|\s+$/g,"");
				_.dlog(`${programName}: ${str}`)
				return reject(str);
			});
		});
	}

	function arrayBufferToString(buffer){
		if (buffer == null) {
			return null;
		}

    var arr = new Uint8Array(buffer);
    var str = String.fromCharCode.apply(String, arr);
    if(/[\u0080-\uffff]/.test(str)){
        throw new Error("this string seems to contain (still encoded) multibytes");
    }
    return str;
	}

	/**
	 * Print debugging log on screen.
	 * It will print to screen only if 
	 * @param  {String} message message to print out in debug mode
	 * @return {[type]}         [description]
	 */
	_.dlog = function(message) {
		if (_isDebugMode) {
			console.log('[DEBUG] ' + message)
		}
	}

	return _;
}();