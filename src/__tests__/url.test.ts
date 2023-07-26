import supertest from "supertest";
import app from "../index";
import { customAlphabet } from "nanoid";
import sampleValidURL from "../utils/morckValidUrl";
import isValidURL from "../utils/validateUrl";

describe("URL", () => {
  describe("shorten url by unauthenticated user route", () => {
    describe("given the original url is not valid", () => {
      it("should return error message : invalid URL", async () => {
        const invalidURL = "not-a-valid-url";
        const response = await supertest(app)
          .post("/Api/shorten")
          .send({ originalURL: invalidURL });

        expect(response.body).toHaveProperty("message");
        expect(response.body.message).toBe("Invalid URL");
      });
    });
    describe("given the original url is valid", () => {
      it("should respond with a shortened URL", async () => {
        const domain = "google.com";
        const validURL = sampleValidURL(domain);
        console.log(validURL);
        const response = await supertest(app)
          .post("/Api/shorten")
          .send({ originalURL: validURL })
          .expect(200);

        expect(isValidURL(validURL)).toBe(true);
        expect(response.body).toHaveProperty("completeUrl");
        expect(typeof response.body.completeUrl).toBe("string");
        expect(response.body.completeUrl).toMatch(
          /trim-q1wc\.onrender\.com\/\w{3}/
        ); // Check if the response contains the shortened URL
      });
    });
  });
});
