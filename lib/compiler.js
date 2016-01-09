/*
Compile JS like C

© 2015 - Guillaume Gonnet
Source at https://github.com/ParksProjets/Compile-JS-like-C
*/


// Options
var Options = {
	enumHex: true,
	commentEscape: true,
	trimIncludes: true,
	spaceLineLimit: 0



// Requires



// Escape a regexp


// Test if a string start with ...


// Return the last character if the string


// Replace all


// Remove and add in the same time





// Test if a character is alpha numeric + _
var StringArray = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789_";
String.prototype.isInSA = function(i) {
function isInSA(c) {




// Globals variables
var spaceLines = 0;
var currentLine = 0;
var basePath = "";





// Error manager
function error(msg) {
	if (currentFile)
	throw(msg);



// Constants container

// Macro container




// Create a macro
function CreateMacro(name, params, content) {
	var breaks = [];

	for (var i = 0; i < params.length; i++) {
		var i1 = -1, p = params[i], i2 = p.length;
		for(;;) {
			if (content.isInSA(i1-1) || content.isInSA(i1+i2))
			breaks.push([ i1, i, i2 ]);

	breaks.sort(function(a, b) {

	var offset = 0;
	for (i = 0; i < breaks.length; i++) {
		offset = breaks[i][0] + breaks[i][2];
	strs[i] = content.slice(offset);

	Macro[name] = {
}




// Add constants and macros to a string
function addConstantes(l) {
	var i1 = -1, i2;
	for (var i in Constantes) {
		i2 = i.length;
		for (;;) {
			if (!l.isInSA(i1-1) && !l.isInSA(i1+i2)) {


	var f, str = '';
	for (var i in Macro) {
		f = Macro[i];
		for (;;) {
			if (l.isInSA(i1-1))
			var m = 0, s = i1+i2, e = s;
			for(; l[e] !== undefined; e++) {
				if (l[e] == "(")
				else if (l[e] == "," && !m) {
				else if (l[e] == ")") {
			params.push(l.slice(s, e));

			if (params.length > f.n)
			if (params.length < f.n)

			str = f.c[0];

			l = l.splice(i1, e-i1+1, str);

	return l;





// Parse a file
function ParseFile(fileContent, isContent) {
	// Read file if fileContent is a file name
		try {

		currentPath = path.dirname(fileContent);
		if (currentPath == ".")
	} else {


	// Current file and line

	currentLine = 0;

	var array = txt.toString().split('\n'),

	var result = '';
	var l, str = '', cur = 0;

	function nextLine() {


// Container



// Parse a  /*# comment
	var line;
	for(;;) {
		if (line === undefined || line.trimLeft().startsWith("#*/"))





// #define:  create a constant / macro
CommandFunc["define"] = function() {
	var name = str.match(/^[A-Za-z0-9_]+/)[0];

	var func = false;
	if (str.search(/^\([A-Za-z0-9_,]+\)/) != -1) {
		var i1 = str.indexOf(")"), i2 = 1, i3 = 0;
		while( (i3 = str.indexOf(",", i2+1)) != -1 ) {
		params.push(str.substr(i2, i1 - i2));
		str = str.substr(i1+1).trimLeft();

	var content = '';
	while (str.last() == "\\") {
	content = addConstantes(content);

	if (func)
};







// #undef: delete a constant / macro
CommandFunc["undef"] = function() {






// #include: include and parse a file
CommandFunc["include"] = function() {
	var l = currentLine,
	var name = str.match(/^"([A-Za-z0-9\-_\. \/\\]+)"/);
	result += ParseFile(currentPath + name[1]) + '\r\n';
	currentLine = l;








// #ifndeff / #ifdef: conditon
CommandFunc["ifndef"] = function() {
	if (Constantes[name] != undefined || Functions[name] != undefined)

CommandFunc["ifdef"] = function() {
	if (Constantes[name] == undefined && Functions[name] == undefined)

CommandFunc["endif"] = CommandFunc["else"] = function() {


// Parse a condition
	var line, n = 1;
	for(;;) {
		if (line === undefined)
		line = line.trim();
		if (line.startsWith("#ifdef") || line.startsWith("#ifndef"))
		else if (line.startsWith("#else") && n == 1)
		else if (line.startsWith("#endif")) {







// #enum: c like enumeration
CommandFunc["enum"] = function() {
	var line, str = '';
	for(;;) {
		str += line;
	str.split(',').forEach(function(c, i) {




	// Parse line by line
	while ( (l = nextLine()) !== undefined ) {

		str = l.trimLeft();
		// The line is empty
			spaceLines++;


		// The line start with a comment to delete
		if (Options.commentEscape && str.startsWith("/*#")) {

		var type = str.match(/^#([A-Za-z0-9_]+)/);

		if (!type) {

		str = str.substr(type.length + 1).trimLeft();

		// The line is a command
		else if (!Options.commentEscape) {
	}

	// Trim or not the file









// Entry point
function StartParsing(fileContent, isContent) {
	if (isContent)

	basePath = (path.dirname(fileContent) || ".") + "/";
	var fileName = path.basename(fileContent);
	return ParseFile(fileName);





// Exports
module.exports = {