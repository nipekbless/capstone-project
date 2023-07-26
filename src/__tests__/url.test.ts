import supertest from "supertest"
import app from "../index"


describe('URL', ()=>{
    describe('shorten url by unauthenticated user route', ()=>{
        describe('given the original url is not valid', ()=>{
        it('should return error message : invalid URL', async()=>{
          const invalidURL = "not-a-valid-url"
          const response = await supertest(app)
          .post('/Api/shorten')
          .send({ originalURL: invalidURL })
          
          expect(response.body).toHaveProperty("message");
          expect(response.body.message).toBe("Invalid URL");
        })
        })
        describe('given the original url is valid', ()=>{

        })
    })
})