const app = require("./src/app");
const {describe, expect, it} = require("@jest/globals");
const request = require("supertest");
const Restaurant = require("./models");
const db = require("./db/connection");
const seedRestaurant = require("./seedData");
const syncSeed = require("./seed.js");

let restaurantCount;

beforeAll(async ()=> {
    // await db.sync({force: true});
    // await Restaurant.bulkCreate(seedRestaurant)
    await syncSeed()
    const restaurants = await Restaurant.findAll({})
    restaurantCount = restaurants.length
});

describe("Testing GET /restaurants", () => {
    let response;
    it("status code 200", async () => {
        response = await request(app).get("/restaurants");
        expect(response.statusCode).toBe(200)
    })
    it("returns an array", () => {
        expect(Array.isArray(response.body)).toBe(true)
    })

    it("returns the correct number of restaurants", () => {
        expect(response.body.length).toBe(restaurantCount)
    })
    it("returns the correct data", () => {
        expect(response.body).toContainEqual(
            expect.objectContaining({
                id: 1,
                name: "AppleBees",
                location: "Texas",
                cuisine: "FastFood"
            })
        )
    })

    it("GET /restaurants/:id", async () => {
        response = await request(app).get("/restaurants/1");
        expect(response.body).toEqual(
            expect.objectContaining({
                id:1,
                name: "AppleBees",
                location: "Texas",
                cuisine: "FastFood",
            })
        )
    })

    it("POST /restaurants", async () => {
        response = await request(app)
        .post("/restaurants")
        .send({name: "Best Pies"});

        expect(response.body.length).toEqual(restaurantCount + 1)
    })

    it("PUT /restaurants/:id", async () => {
        response = await request(app)
        .put("/restaurants/1")
        .send({name: "PizzaPizza"})
        // console.log(response.body)
        const editedRestaurant = await Restaurant.findByPk(1)
        expect(editedRestaurant.name).toBe("PizzaPizza");
    })

    it("DELETE", async () => {
        await request(app).delete("/restaurants/1")
        const restaurants = await Restaurant.findAll();
        expect(restaurants.length).toBe(6)
        expect(restaurants[0].id).not.toEqual(1);
    })
})

