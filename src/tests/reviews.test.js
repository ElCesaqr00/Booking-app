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

 


  test('traer de /reviews todos las reviews de los hoteles', async () => {
    const res = await request(app).get("/reviews");
    expect(res.status).toBe(200)
    
  })

test('Endpoint /Post debe crear un usuario para el sistema ', async () => {
  const body = {
    "rating": "5",
    "comment": "prueba buena 1",
    "hotelId": 5
  };
  const res = await request(app).post('/reviews').send(body).set("Authorization", `Bearer ${token}`);
    id = res.body.id;
  
    expect(res.status).toBe(201);
    expect(res.body.id).toBeDefined();
    expect(res.body.comment).toBe(body.comment)
})

 test('Get One /reviews/:id debe retornarme un estatus 200', async () => {
   const res = await request(app).get(`/reviews/${id}`);
   expect(res.status).toBe(200);
   expect(res.body.id).toBeDefined();
   console.log(id)
 })

 test('PUT /reviews/:id debe actualizar datos de un usuario ', async () => {
  const body = {
    "rating": "3",
    "comment": "prueba buena 2",
};  
  const res = await request(app).put(`/reviews/${id}`).send(body).set("Authorization", `Bearer ${token}`);
  expect(res.status).toBe(200);
  expect(res.body.id).toBeDefined();
  expect(res.body.description).toBe(body.description);

})
  test('DELETE reviews/:id debe eliminar una review por su id', async () => {
  const res = await request(app).delete(`/reviews/${id}`).set("Authorization", `Bearer ${token}`);
   expect(res.status).toBe(204);
 });



