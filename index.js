/**
 * @license
 * grunt-template-rename
 * Copyright 2014 Luis Aleman <https://github.com/Lalem001/>
 * Partly based on gulp-rename <https://github.com/hparra/gulp-rename>
 * Copyright 2013 Hector Guillermo Parra Alvarez
 * Available under MIT license <https://github.com/Lalem001/license>
 */
(function (module) {
	module.exports = function (grunt) {
		var Path = require('path');

		/**
		 * Method to rename/change path strings
		 *
		 * @name rename
		 * @param {string} path Path to rename/change
		 * @param {object} options Options to rename with
		 * @param {string} options.basename Filename without extension
		 * @param {string} options.dirname Relative path from the base directory
		 * @param {string} options.extname File extension. Include leading '.'
		 * @param {string} options.prefix String to prepend to the basename
		 * @param {string} options.suffix String to append to the basename
		 * @returns {string} Renamed path
		 */
		function rename (path, options) {
			var parsedPath = parsePath(path),
				dirname = 'dirname' in options ? options.dirname : parsedPath.dirname,
				prefix = options.prefix || '',
				suffix = options.suffix || '',
				basename = 'basename' in options ? options.basename : parsedPath.basename,
				extname = 'extname' in options ? options.extname : parsedPath.extname;
			return Path.join(dirname, prefix + basename + suffix + extname);
		}

		/**
		 * @private
		 * @name parsePath
		 * @param {String} path Path to parse into its constituent components
		 * @returns {{dirname: String, basename: String, extname: String}}
		 */
		function parsePath (path) {
			path = grunt.template.process(path);
			var extname = Path.extname(path);
			return {
				dirname: Path.dirname(path),
				basename: Path.basename(path, extname),
				extname: extname
			};
		}

		grunt.template.rename = rename;
		return rename;
	};
})(module);
