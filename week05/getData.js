var globalProperties = ["Infinity","NaN","undefined","eval","isFinite","isNaN","parseFloat","parseInt","decodeURI","decodeURIComponent","encodeURI","encodeURIComponent","Array","Date","RegExp","Promise","Proxy","Map","WeakMap","Set","WeakSet","Function","Boolean","String","Number","Symbol","Object","Error","EvalError","RangeError","ReferenceError","SyntaxError","TypeError","URIError","ArrayBuffer","SharedArrayBuffer","DataView","Float32Array","Float64Array","Int8Array","Int16Array","Int32Array","Uint8Array","Uint16Array","Uint32Array","Uint8ClampedArray","Atomics","JSON","Math","Reflect", "BigInt",
"Generator",
"GeneratorFunction",
"AsyncFunction",
"Iterator",
"AsyncIterator",
"Intl",
"WebAssembly",
"arguments"
];

var set = new Set();

var queue = [];

for (let p of globalProperties) {
	queue.push({
		path: [p],
		object: this[p]
	});
}

let current;
var res = new Set();
while(queue.length) {
	current = queue.shift();
	res.add(current.path.join('.'));
	if(set.has(current.object))
		continue;
	set.add(current.object);

	if(current.object == undefined)
		continue;
	for(let p of Object.getOwnPropertyNames(current.object)) {

		var property = Object.getOwnPropertyDescriptor(current.object, p);

		if (property.hasOwnProperty("value") && 
			((property.value != null) && (typeof property.value == "object") || (typeof property.value == "function")) && 
			property.value instanceof Object) {
			queue.push({
				path: current.path.concat([p]),
				object: property.value
			});
		}

		if (property.hasOwnProperty("get") && (typeof property.get == "function")) {
			queue.push({
				path: current.path.concat([p]),
				object: property.getter
			});
		}

		if (property.hasOwnProperty("set") && (typeof property.set == "function")) {
			queue.push({
				path: current.path.concat([p]),
				object: property.setter
			});
		}
	}
}

var tree = {
	'id': 'global',
	'children': []
};

for (let p of res) {
	let currStr = p.split('.').reverse();
	let curr = tree['children'];
	while (currStr.length > 1) {
		var id = currStr.pop();
		for (let p in curr) {
			if (curr[p]['id'] == id) {
				curr = curr[p]['children']
				break;
			}
		}
	}
	curr.push({
		'id': currStr[0],
		'children': []
	});
}

var data = tree;

console.log(JSON.stringify(tree));

console.log(res);