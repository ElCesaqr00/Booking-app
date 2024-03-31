const sequelize = require('../utils/connection');
const request = require('supertest');
const app = require('../app');

const main = async() => {
    try{
        // Acciones a ejecutar antes de los tests
        sequelize.sync();
        const user = {
            firstName: "matiasPrueba",
            lastName: "MontesPrueba",
            email: "matiasPrueba@gmail.com",
            password: "123456",
            gender: "MALE"
        }
        await request(app).post("/users").send(user);
        
        process.exit();
    } catch(error){
        console.log(error);
    }
}

main();