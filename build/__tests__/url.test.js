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
const supertest_1 = __importDefault(require("supertest"));
const index_1 = __importDefault(require("../index"));
describe('URL', () => {
    describe('shorten url by unauthenticated user route', () => {
        describe('given the original url is not valid', () => {
            it('should return error message : invalid URL', () => __awaiter(void 0, void 0, void 0, function* () {
                const invalidURL = "not-a-valid-url";
                const response = yield (0, supertest_1.default)(index_1.default)
                    .post('/Api/shorten')
                    .send({ originalURL: invalidURL });
                expect(response.body).toHaveProperty("message");
                expect(response.body.message).toBe("Invalid URL");
            }));
        });
        describe('given the original url is valid', () => {
        });
    });
});
