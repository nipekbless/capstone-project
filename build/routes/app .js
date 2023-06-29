"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const createShortUrl_1 = require("../controller/createShortUrl");
const redirect_controller_1 = require("../controller/redirect.controller");
const genQrCode_controller_1 = require("../controller/genQrCode.controller");
const customShortUrl_controller_1 = require("../controller/customShortUrl.controller");
const getUserUrls_controller_1 = require("../controller/getUserUrls.controller");
const createUserUrl_controller_1 = require("../controller/createUserUrl.controller");
const rateLimiting_1 = __importDefault(require("../middleware/rateLimiting"));
const passport_1 = __importDefault(require("passport"));
function routes(app) {
    app.get("/", rateLimiting_1.default, (req, res) => {
        return res.send("App is okay");
    });
    app.post("/Api/shorten", rateLimiting_1.default, createShortUrl_1.shortenUrl);
    app.post("/Api/shortenurl", passport_1.default.authenticate("jwt", { session: false }), createUserUrl_controller_1.createUserUrl);
    app.get("/:url", redirect_controller_1.redirectURL);
    app.post("/qrcode", passport_1.default.authenticate("jwt", { session: false }), genQrCode_controller_1.generateQrCode);
    app.put("/customurl/:shortId", passport_1.default.authenticate("jwt", { session: false }), customShortUrl_controller_1.customShortUrl);
    app.get("/Api/getuserurls", passport_1.default.authenticate("jwt", { session: false }), getUserUrls_controller_1.getUserURLs);
    // // Route for serving the HTML file
    // app.get('/home', (req, res) => {
    //   const indexPath = path.join(__dirname, '../../public/index.html');
    //   res.sendFile(indexPath);
    // });
    // Error handling
    app.use((err, req, res, next) => {
        console.error("Rate limiting error:", err);
        res
            .status(429)
            .json({ error: "Too many requests, please try again later." });
    });
}
exports.default = routes;
