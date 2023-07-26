"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function validateURL(url) {
    const urlPattern = /^(?:\w+:)?\/\/([^\s.]+\.\S{2}|localhost[\:?\d]*)\S*$/;
    return urlPattern.test(url);
}
exports.default = validateURL;
