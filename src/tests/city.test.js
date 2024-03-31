const request = require('supertest');
const app = require('../app');

let id = 0;
let token;

  beforeAll(async() => {
    const body = {
          email: "matiasPrueba@gmail.com",
          password: "123456"
    }
    const res = await request(app).post("/users/login").send(body)
    token =  res.body.token;
    console.log(token)
  });

 

 test('traer de /cities todos las ciudades', async () => {
    const res = await request(app).get("/cities");
    expect(res.status).toBe(200)
    
  })

   
test('Endpoint /Post debe crear una ciudad para el sistema ', async () => {
  const body = {
    "name": "Jamundi",
    "country": "colombia",
    "countryId": "CO"
  };
  const res = await request(app).post('/cities').send(body).set("Authorization", `Bearer ${token}`);
    id = res.body.id;
  
    expect(res.status).toBe(201);
    expect(res.body.id).toBeDefined();
})

 test('Get One /cities/:id debe retornarme un estatus 200', async () => {
   const res = await request(app).get(`/cities/${id}`);
   expect(res.status).toBe(200);
   expect(res.body.id).toBeDefined();
   console.log(id)
 })



 test('PUT /users/:id debe actualizar datos de una ciudad ', async () => {
  const body = {
    "name": "Cali",
    "country": "colombia",
    "countryId": "CO"
};  
  const res = await request(app).put(`/cities/${id}`).send(body).set("Authorization", `Bearer ${token}`);
  expect(res.status).toBe(200);
  expect(res.body.id).toBeDefined();

})

  test('DELETE users/:id debe eliminar una ciudad por su id', async () => {
  const res = await request(app).delete(`/cities/${id}`).set("Authorization", `Bearer ${token}`);
   expect(res.status).toBe(204);
 });


