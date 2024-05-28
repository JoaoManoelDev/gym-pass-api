import fastify from "fastify"
import { fastifyJwt } from "@fastify/jwt"
import { fastifyCookie } from "@fastify/cookie"
import { ZodError } from "zod"

import { env } from "@/env"
import { usersRoutes } from "@/http/controllers/users/routes"
import { gymsRoutes } from "@/http/controllers/gyms/routes"
import { checkInsRoutes } from "@/http/controllers/check-ins/routes"

export const app = fastify()

app.register(fastifyJwt, {
  secret: env.JWT_SECRET,
  cookie: {
    cookieName: "refreshToken",
    signed: false
  },
  sign: {
    expiresIn: "10m"
  }
})

app.register(fastifyCookie)

app.register(usersRoutes)
app.register(gymsRoutes)
app.register(checkInsRoutes)

app.setErrorHandler((error, _request, replay) => {
  if (error instanceof ZodError) {
    return replay
      .status(400)
      .send({ message: "Validation error", issues: error.format() })
  }

  if (env.NODE_ENV !== "production") {
    console.log("[ERROR]", error)
  } else {
    // TODO: Here we should log to an external tool like DataDog/NewRelic/Sentry
  }

  return replay.status(500).send({ message: "Internal server error." })
})
