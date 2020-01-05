
function type(obj) {
	if( typeof obj != 'object' ) return typeof obj;
	if( typeof obj == 'object' ) {
		if( Array.isArray(obj) ) return 'array';
		else return 'object';
	}
}

function findStructure(obj, level = 1) {
	var str='';
	var newLineFlag = true; //decides whether or not to add \n at the end of str. Look for it from the end of this function.
	var indentString = ' '.repeat(level); //we need as many whitespaces as the level in heirarchy

	//If its a JSON object
	if( type(obj) == 'object' ) {
		str += '{\n';
		for( key in obj ) {
			if( typeof obj[key] == 'number' || typeof obj[key] == 'boolean' || typeof obj[key] == 'string' ) str += indentString+key+": '"+typeof obj[key]+"',\n";
			else {
				str += indentString+key+': '+findStructure(obj[key],level+1)+',\n';
			}
		}
	}

	//If its an array
	//Assumes it is homogeneous
	else if( type(obj) == 'array' ) {
		str += '['; //don't add \n in case it is an array of numbers or booleans or strings
		if( typeof obj[0] == 'number' || typeof obj[0] == 'boolean' || typeof obj[0] == 'boolean' ) {
			str += " '"+typeof obj[0]+"',\n";
			newLineFlag = false;
		}
		else {
			str+= '\n'; //If it is an array of objects, add \n
			str += indentString+findStructure( obj[0], level+1 );
		}
	}

	//Post-processing
	if( str.charAt(str.length-1) == '\n' ) str = str.substring(0, str.length-1);
	if( str.charAt(str.length-1) == ',' ) str = str.substring(0, str.length-1);
	if( newLineFlag ) {
		str += '\n';
		str += ' '.repeat(level-1);
	}
	if( type(obj) == 'object' ) str += '}';
	else str += ']';

	return str;
}

module.exports.findStructure = findStructure;
