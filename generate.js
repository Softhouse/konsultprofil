var marked   = require('marked');
var _        = require('lodash');
var fs       = require('fs');
var mustache = require('mustache');

fs.readdir('.', getCVs);

function getCVs(err, files) {
	if(err) throw err;

	var CVs = _.filter(files, function(filename) { return filename.match(/.*.md/); });
	_.forEach(CVs, generateCV);
}

function generateCV(filename) {
	var names = filename.replace(/\.md/,"").split('_');
	var realName = "";
	_.forEach(names, function(name) {
		realName = realName+" "+name.charAt(0).toUpperCase() + name.slice(1);
	});

	var cvData = marked(fs.readFileSync(filename, { encoding: 'UTF-8'} ));
	var template = fs.readFileSync('konsultprofil.mst', { encoding: 'UTF-8'} );
	var outputFilename = "html/" + filename.replace(/\.md/,'.html');

	var cv = mustache.render(template, {
		'real_name': realName,
		'name': filename.replace(/\.md/,""),
		'cv': cvData
	});

	fs.writeFileSync(outputFilename, cv, { encoding: 'UTF-8'});
}
