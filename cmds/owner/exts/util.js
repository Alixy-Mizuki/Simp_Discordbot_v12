// This returns Object.prototype in order to return a valid object
// without creating a new one each time this is called just to discard it the moment after.
const isConstructorProxyHandler = { construct() { return Object.prototype; } };

function escapeRegex(str) {
	return str.replace(/[|\\{}()[\]^$+*?.]/g, '\\$&');
}

module.exports = {
	escapeRegex
};