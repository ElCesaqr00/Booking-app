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

 

  test('traer de /hotels todos los datos de los hoteles', async () => {
    const res = await request(app).get("/hotels");
    expect(res.status).toBe(200)
    
  })
  
test('Endpoint /Post debe crear un usuario para el sistema ', async () => {
  const body = {
    "name": "hotel prueba",
    "description": "cuidado 100% test",
    "price": "1",
    "address": "socorro",
    "lat": 3.4616668,
    "lon": -76.532028,
    "cityId": 3
  };
  const res = await request(app).post('/hotels').send(body).set("Authorization", `Bearer ${token}`);
    id = res.body.id;
  
    expect(res.status).toBe(201);
    expect(res.body.id).toBeDefined();
    expect(res.body.name).toBe(body.name)
})

 test('Get One /hotels/:id debe retornarme un estatus 200', async () => {
   const res = await request(app).get(`/hotels/${id}`);
   expect(res.status).toBe(200);
   expect(res.body.id).toBeDefined();
   console.log(id)
 })

 test('PUT /hotels/:id debe actualizar datos de un usuario ', async () => {
  const body = {
    "description": "cuidado 100% testActualizado",
};  
  const res = await request(app).put(`/hotels/${id}`).send(body).set("Authorization", `Bearer ${token}`);
  expect(res.status).toBe(200);
  expect(res.body.id).toBeDefined();
  expect(res.body.description).toBe(body.description);

})

  test('DELETE hotels/:id debe eliminar un hoteles por su id', async () => {
  const res = await request(app).delete(`/hotels/${id}`).set("Authorization", `Bearer ${token}`);
   expect(res.status).toBe(204);
 });

