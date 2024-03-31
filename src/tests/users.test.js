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

  test('traer de /users todos los ususarios', async () => {
    const res = await request(app).get("/users").set("Authorization", `Bearer ${token}`);
    expect(res.status).toBe(200)
    
  })
  
test('Endpoint /Post debe crear un usuario para el sistema ', async () => {
  const body = {
      firstName: "CesarPrueba",
      lastName: "MontesPrueba",
      email: "CesarPrueba@gmail.com",
      password: "123456",
      gender: "MALE"
  };
  const res = await request(app).post('/users').send(body).set("Authorization", `Bearer ${token}`);
    id = res.body.id;
  
    expect(res.status).toBe(201);
    expect(res.body.id).toBeDefined();
    expect(res.body.name).toBe(body.name)
})

 test('Get One /users/:id debe retornarme un estatus 200', async () => {
   const res = await request(app).get(`/users/${id}`);
   expect(res.status).toBe(200);
   expect(res.body.firstName).toBeDefined();
   console.log(id)
 })

 test('PUT /users/:id debe actualizar datos de un usuario ', async () => {
  const body = {
    firstName: "david",
};  
  const res = await request(app).put(`/users/${id}`).send(body).set("Authorization", `Bearer ${token}`);
  expect(res.status).toBe(200);
  expect(res.body.id).toBeDefined();
  expect(res.body.name).toBe(body.name);

})

  test('DELETE users/:id debe eliminar un usuario por su id', async () => {
  const res = await request(app).delete(`/users/${id}`).set("Authorization", `Bearer ${token}`);
   expect(res.status).toBe(204);
 });