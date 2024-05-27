import { afterAll, beforeAll, describe, expect, it } from "vitest"
import request from "supertest"

import { app } from "@/app"
import { createAndAuthenticateUser } from "@/utils/test/create-and-authenticate-user"

describe("Create Gym (e2e)", () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async() => {
    await app.close()
  })
 
  it("should be able to create a gym", async () => {

    const { token } = await createAndAuthenticateUser(app)
    
    const response = await request(app.server)
      .post("/gyms")
      .set("Authorization", `Bearer ${token}`)
      .send({
        title: "NodeJS Gym",
        description: "Some Description",
        phone: "912345678",
        latitude: 22.860852,
        longitude: -43.2406528,
      })

    expect(response.statusCode).toEqual(201)
  })
})