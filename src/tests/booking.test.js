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

  
  test('traer de /bookings todos las reservas', async () => {
    const res = await request(app).get("/bookings").set("Authorization", `Bearer ${token}`);
    expect(res.status).toBe(200)
    
  })

  
test('Endpoint /Post debe crear una reserva para el sistema ', async () => {
  const body = {
    "checkIn": "2024-05-03",
    "checkOut": "2024-05-04",
    "hotelId": 1
  };
  const res = await request(app).post('/bookings').send(body).set("Authorization", `Bearer ${token}`);
    id = res.body.id;
  
    expect(res.status).toBe(201);
    expect(res.body.id).toBeDefined();
})

 test('Get One /users/:id debe retornarme un estatus 200', async () => {
   const res = await request(app).get(`/bookings/${id}`);
   expect(res.status).toBe(200);
   expect(res.body.id).toBeDefined();
   console.log(id)
 })

 test('PUT /users/:id debe actualizar datos de una reserva ', async () => {
  const body = {
    "checkIn": "2024-05-04",
    "checkOut": "2024-05-04",
};  
  const res = await request(app).put(`/bookings/${id}`).send(body).set("Authorization", `Bearer ${token}`);
  expect(res.status).toBe(200);
  expect(res.body.id).toBeDefined();

})

  test('DELETE users/:id debe eliminar una reserva por su id', async () => {
  const res = await request(app).delete(`/bookings/${id}`).set("Authorization", `Bearer ${token}`);
   expect(res.status).toBe(204);
 });
