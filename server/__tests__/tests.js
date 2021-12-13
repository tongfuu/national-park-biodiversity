const { expect } = require("@jest/globals");
const supertest = require("supertest");
const { number } = require("yargs");
const results = require("./results.json")
const app = require('../server');


test("GET /parks in state", async () => {
    await supertest(app).get("/map/parks_in_state?state=CA")
      .expect(200)
      .then((response) => {
        expect(response.body.results[0]["num"]).toStrictEqual(8)
      });
    
      await supertest(app).get("/map/parks_in_state?state=SHAUIHUIA")
      .expect(200)
      .then((response) => {
        expect(response.body.results.length).toStrictEqual(1)
      });
});

test("GET /common animals in state", async () => {
    await supertest(app).get("/map/common_animals_state?state=CA")
      .expect(200)
      .then((response) => {
        expect(response.body.results[0]["names"]).toStrictEqual("Channel Islands Gray Fox")
      });

      await supertest(app).get("/map/common_animals_state?state=SDHUAIH")
      .expect(200)
      .then((response) => {
        expect(response.body.results.length).toStrictEqual(0)
      });
});

test("GET /num trails in state", async () => {
    await supertest(app).get("/map/num_trails?state=CA")
      .expect(200)
      .then((response) => {
        expect(response.body.results[0]["numTrails"]).toStrictEqual(646)
      });
    
      await supertest(app).get("/map/num_trails?state=DHSUAIHDUI")
      .expect(200)
      .then((response) => {
        expect(response.body.results.length).toStrictEqual(1)
      });
});

test("GET /search species", async () => {
    await supertest(app).get("/search/search_species?category=mammal&park=Acadia National Park")
      .expect(200)
      .then((response) => {
        expect(response.body.results[0]["scientific_name"]).toStrictEqual("Alces alces")
        expect(response.body.results.length).toEqual(55)
      });
    
      await supertest(app).get("/search/search_species?category=DHSUAHUDL&park=DHSIHDU")
      .expect(200)
      .then((response) => {
        expect(response.body.results.length).toEqual(0)
      });
});


test("GET /search species", async () => {
    await supertest(app).get("/search/search_species?park=Yellowstone National Park")
      .expect(200)
      .then((response) => {
        expect(response.body.results[0]["scientific_name"]).toStrictEqual("Antilocapra americana")
        expect(response.body.results.length).toEqual(3963)
      });
    
      await supertest(app).get("/search/search_species?park=DHUASIOBDHUSIO")
      .expect(200)
      .then((response) => {
        expect(response.body.results.length).toEqual(0)
      });
});


test("GET /species state", async () => {
    await supertest(app).get("/search/species_state?state=CA")
      .expect(200)
      .then((response) => {
        expect(response.body.results[0]["scientific_name"]).toStrictEqual("Urocyon littoralis")
      });

      await supertest(app).get("/search/species_state?state=DHUSIABHU")
      .expect(200)
      .then((response) => {
        expect(response.body.results.length).toStrictEqual(0)
      });
});


test("GET /density park", async () => {
    await supertest(app).get("/search/density_park?park=Yellowstone National Park")
      .expect(200)
      .then((response) => {
        expect(response.body.results[0]["density"]).toStrictEqual(0.0007)
      });
    
      await supertest(app).get("/search/density_park?park=DHBAUSBHSUI")
      .expect(200)
      .then((response) => {
        expect(response.body.results.length).toStrictEqual(0)
      });
});


test("GET /scientific state", async () => {
    await supertest(app).get("/search/scientific_state?name=Redhead")
      .expect(200)
      .then((response) => {
        expect(response.body.results[0]["num"]).toStrictEqual(6)
      });

      await supertest(app).get("/search/scientific_state?name=DSHUABHUDI")
      .expect(200)
      .then((response) => {
        expect(response.body.results.length).toStrictEqual(0)
      });
});


test("GET /green state", async () => {
    await supertest(app).get("/search/green_state?state=CA")
      .expect(200)
      .then((response) => {
        expect(response.body.results[0]["percent"]).toStrictEqual(7.3043)
      });

      await supertest(app).get("/search/green_state?state=ASHUDIH")
      .expect(200)
      .then((response) => {
        expect(response.body.results.length).toStrictEqual(1)
      });
});


test("GET /park feature", async () => {
    await supertest(app).get("/trail/park_feature?park=Yellowstone National Park&feature=lake")
      .expect(200)
      .then((response) => {
        expect(response.body.results[0]["trail_name"]).toStrictEqual("Artist's Point, Lily Pad Lake, and Clear Lake Loop")
        expect(response.body.results.length).toStrictEqual(92)
      });

      await supertest(app).get("/trail/park_feature?park=DHAUIDHEIU&feature=DHJSHD")
      .expect(200)
      .then((response) => {
        expect(response.body.results.length).toStrictEqual(0)
      });
});



test("GET /park activity", async () => {
    await supertest(app).get("/trail/park_activity?park=Yellowstone National Park&activity=hiking")
      .expect(200)
      .then((response) => {
        expect(response.body.results[0]["trail_name"]).toStrictEqual("Agate Creek")
        expect(response.body.results.length).toStrictEqual(215)
      });

      await supertest(app).get("/trail/park_activity?park=SHUAISX&activity=DHUSIHUI")
      .expect(200)
      .then((response) => {
        expect(response.body.results.length).toStrictEqual(0)
      });
});


test("GET /state birding", async () => {
    await supertest(app).get("/trail/state_birding?state=CA")
      .expect(200)
      .then((response) => {
        expect(response.body.results[0]["park_name"]).toStrictEqual("Channel Islands National Park")
        expect(response.body.results.length).toStrictEqual(99)
      });
    
      await supertest(app).get("/trail/state_birding?state=DBSHUABHD")
      .expect(200)
      .then((response) => {
        expect(response.body.results.length).toStrictEqual(0)
      });
});


test("GET /state fishing", async () => {
    await supertest(app).get("/trail/state_fishing?state=NC")
      .expect(200)
      .then((response) => {
        expect(response.body.results[0]["park_name"]).toStrictEqual("Great Smoky Mountains National Park")
        expect(response.body.results.length).toStrictEqual(15)
      });

      await supertest(app).get("/trail/state_fishing?state=RANDOM")
      .expect(200)
      .then((response) => {
        expect(response.body.results.length).toStrictEqual(0)
      });

});


