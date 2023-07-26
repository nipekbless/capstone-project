"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// Utility function to generate mock valid URLs for testing
function generateMockValidURL(domain) {
    // const paths = ["/page1", "/page2", "/subfolder/page3"];
    // const randomPath = paths[Math.floor(Math.random() * paths.length)];
    return `https://${domain}`;
}
exports.default = generateMockValidURL;
