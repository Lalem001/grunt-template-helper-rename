# grunt-template-rename

> Grunt template helper: Rename  
> Similar to gulp-rename, this helper provides a simple file renaming method.

* TOC
{:toc}

## Installation

```sh
$ npm install --save-dev grunt-template-rename
```

```js
// Gruntfile.js
module.exports = function(grunt) {
	// require it and pass in the grunt instance
	require('grunt-template-rename')(grunt);

	grunt.initConfig();
};
```

## API Reference

### grunt.template.rename(path, options)

**Params**

- path `string` - Path to rename/change  
- options `object` - Options to rename with  
  - basename `string` - Filename without extension  
  - dirname `string` - Relative path from the base directory  
  - extname `string` - File extension. Include leading '.'  
  - prefix `string` - String to prepend to the basename  
  - suffix `string` - String to append to the basename  

## Usage

In this example, the file name receives the suffix `.min`
```js
grunt.template.rename('main.js', {suffix:'.min'}) // main.min.js
```

In this example, the file extension is changed
```js
grunt.template.rename('main.min.js', {extname:'.js.gzip'}) // main.min.js.gzip
```

Path can also reference config/task properties
```js
// config
{
	source: 'main.js',
	uglify: {
		app: {
			src: <%= source %>
			dest: <%= grunt.template.rename(uglify.app.src, {suffix:'.min'}) %>
		}
	}
}
```


## License
MIT © [Luis Aleman](http://github.com/Lalem001)
