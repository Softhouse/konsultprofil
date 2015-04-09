var marked   = require('marked');
var _        = require('lodash');
var fs       = require('fs');
var mustache = require('mustache');
var cheerio  = require('cheerio');
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

	var $  = cheerio.load(cv);

	var tags = ["h1","h2","h3","h4"];

	_.forEach(tags, function(tag) {
		var elements = $(tag);
		elements.before("<div class='div-" + tag + "' />");
		var parentDivs = $('.div-' + tag);
		parentDivs.each(function(i,parentDiv) {
			var tag = $(parentDiv);
			var contents = tag.nextUntil('div');
			contents.remove();
			tag.append(contents);
//			tag.add(contents);
		});
	});

	fs.writeFileSync(outputFilename, $.html(), { encoding: 'UTF-8'});
}
