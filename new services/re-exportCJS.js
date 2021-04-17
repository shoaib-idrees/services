//How can I re-export with CJS?
//I think you can do exactly the same way that tsc currently does as it compiles our code back to commonjs:

var __createBinding = function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
};

var __exportStar = function(m, exports) {
    for (var p in m) if (p !== "default" && !exports.hasOwnProperty(p)) __createBinding(exports, m, p);
};

__exportStar(require("./lib/setAttribute.js"), exports);