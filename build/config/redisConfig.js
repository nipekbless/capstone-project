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
const redis_1 = __importDefault(require("redis"));
const util_1 = require("util");
class Cache {
    constructor() {
        this.redis = null;
    }
    connect() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                this.redis = redis_1.default.createClient({
                // Redis connection options
                });
                this.redis.on('connect', () => {
                    console.log('Redis connected');
                });
                this.redis.on('error', () => {
                    console.log('Redis connection error');
                });
            }
            catch (error) {
                console.log(error);
            }
        });
    }
    get(key) {
        return __awaiter(this, void 0, void 0, function* () {
            const getAsync = (0, util_1.promisify)(this.redis.get).bind(this.redis);
            return getAsync(key);
        });
    }
    set(key, value) {
        return __awaiter(this, void 0, void 0, function* () {
            this.redis.set(key, value);
        });
    }
    delete(key) {
        return __awaiter(this, void 0, void 0, function* () {
            this.redis.del(key);
        });
    }
}
const instance = new Cache();
exports.default = instance;
