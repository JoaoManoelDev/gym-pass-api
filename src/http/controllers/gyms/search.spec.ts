import { afterAll, beforeAll, describe, expect, it } from "vitest"
import request from "supertest"

import { app } from "@/app"
import { createAndAuthenticateUser } from "@/utils/test/create-and-authenticate-user"

describe("Search Gyms (e2e)", () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async() => {
    await app.close()
  })
 
  it("should be able to search gyms", async () => {

    const { token } = await createAndAuthenticateUser(app)
    
    await request(app.server)
    .post("/gyms")
    .set("Authorization", `Bearer ${token}`)
    .send({
      title: "NodeJS Gym",
      description: "Some Description",
      phone: "912345678",
      latitude: 22.860852,
      longitude: -43.2406528,
    })

    await request(app.server)
      .post("/gyms")
      .set("Authorization", `Bearer ${token}`)
      .send({
        title: "ReactJS Gym",
        description: "Some Description",
        phone: "912345678",
        latitude: 22.860852,
        longitude: -43.2406528,
      })

    const response = await request(app.server)
      .get("/gyms/search")
      .query({
        q: "NodeJS"
      })
      .set("Authorization", `Bearer ${token}`)
      .send()

    expect(response.statusCode).toEqual(200)
    expect(response.body.gyms).toHaveLength(1)
    expect(response.body.gyms).toEqual([
      expect.objectContaining({
        title: "NodeJS Gym",
      })
    ])

  })
})