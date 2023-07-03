"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const passport_1 = __importDefault(require("passport"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const user_model_1 = __importDefault(require("../model/user.model"));
const authRouter = express_1.default.Router();
// Signup route
authRouter.post("/Api/signup", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { first_name, last_name, email, password } = req.body;
        // Check if the user already exists
        const existingUser = yield user_model_1.default.findOne({ email });
        if (existingUser) {
            return res.status(409).json({ error: "User already exists" });
        }
        // Create a new user
        const newUser = new user_model_1.default({ first_name, last_name, email, password });
        yield newUser.save();
        res.status(201).json({ message: "User created successfully" });
    }
    catch (error) {
        next(error);
    }
}));
// Signin route
authRouter.post("/Api/signin", (req, res, next) => {
    passport_1.default.authenticate("login", { session: false }, (err, user, info) => {
        if (err) {
            return next(err);
        }
        if (!user) {
            return res.status(401).json({ message: "Invalid email or password" });
        }
        console.log(user);
        req.login(user, { session: false }, (error) => {
            if (error) {
                return next(error);
            }
            // Generate a JWT token
            const body = { _id: user._id, email: user.email };
            const token = jsonwebtoken_1.default.sign({ user: body }, process.env.JWT_SECRET || "default-secret");
            res.json({ token });
        });
    })(req, res, next);
});
// Reset password route
authRouter.post("/Api/resetpassword", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, newPassword } = req.body;
        // Find the user by email
        const user = yield user_model_1.default.findOne({ email });
        if (!user) {
            return res.status(404).json({ error: "User not found!!" });
        }
        // Update the user's password
        user.password = newPassword;
        yield user.save();
        res.json({ message: "Password reset successful" });
    }
    catch (error) {
        next(error);
    }
}));
// Error handler
authRouter.use((err, req, res, next) => {
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
});
exports.default = authRouter;
