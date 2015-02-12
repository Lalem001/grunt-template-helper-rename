describe('grunt-template-rename', function () {
	var grunt, rename, options, path, expected, configData;

	beforeEach(function () {
		grunt  = require('grunt');
		rename = require('..')(grunt);

		options = {suffix: '.min'};
		path = 'path/to/some.js';
		expected = 'path/to/some.min.js';

		configData = grunt.config.data;
		configData.path = path;
		configData.nestedPath = '<%= path %>';
		configData.nestedTemplatePath = '<%= grunt.template.rename(nestedPath, ' + JSON.stringify(options) + ') %>';
		configData.renameCall = '<%= grunt.template.rename(path, ' + JSON.stringify(options) + ') %>';
		configData.nestedRenameCalls = '<%= grunt.template.rename(renameCall, {extname:".js.gzip"}) %>';
	});

	it('should add rename helper to grunt.template.rename', function () {
		var reference = grunt.template.rename;
		expect(reference).toBeDefined();
		expect(reference).toBe(rename);
	});

	it('should function correctly when used directly', function () {
		expect(rename('bar.js', { dirname: 'foo'})).toEqual('foo/bar.js');
		expect(rename('bar.js', {  prefix: 'foo'})).toEqual('foobar.js');
		expect(rename('foo.js', {  suffix: 'bar'})).toEqual('foobar.js');
		expect(rename('foo.js', {basename: 'bar'})).toEqual('bar.js');
		expect(rename('foo.js', { extname:'.bar'})).toEqual('foo.bar');
	});

	it('should function correctly when given a grunt template', function () {
		var template = '<%= path %>',
			result;

		expect(function () {
			result = rename(template, options);
		}).not.toThrow();

		expect(result).toEqual(expected);
	});

	it('should function correctly when executed from a grunt template', function () {
		var template = configData.renameCall,
			result;

		expect(function () {
			result = grunt.template.process(template);
		}).not.toThrow();

		expect(result).toEqual(expected);
	});

	it('should function correctly with nested templates', function () {
		var template = configData.nestedTemplatePath,
			result;

		expect(function () {
			result = grunt.template.process(template);
		}).not.toThrow();

		expect(result).toEqual(expected);
	});

	it('should function correctly with nested rename calls', function () {
		var template = configData.nestedRenameCalls,
			result;

		expect(function () {
			result = grunt.template.process(template);
		}).not.toThrow();

		expect(result).toEqual('path/to/some.min.js.gzip');
	});
});
