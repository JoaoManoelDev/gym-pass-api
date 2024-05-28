import { afterAll, beforeAll, describe, expect, it } from "vitest"
import request from "supertest"

import { app } from "@/app"
import { createAndAuthenticateUser } from "@/utils/test/create-and-authenticate-user"

describe("Nearby Gyms (e2e)", () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it("should be able to list nearby gyms", async () => {
    const { token } = await createAndAuthenticateUser(app, { isAdmin: true })

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
        latitude: -22.3779725,
        longitude: -43.8677777,
      })

    const response = await request(app.server)
      .get("/gyms/nearby")
      .query({
        latitude: 22.860852,
        longitude: -43.2406528,
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