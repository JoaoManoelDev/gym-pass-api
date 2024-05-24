import { FastifyInstance } from "fastify"

import { register } from "./register"
import { verifyJWT } from "@/http/middlewares/verify-jwt"
import { authenticate } from "./authenticate"
import { profile } from "./profile"

export const usersRoutes = async (app: FastifyInstance) => {
  app.post("/users", register)
  app.post("/sessions", authenticate)
  
  /** Authenticated */
  app.get("/me", { onRequest: [verifyJWT] }, profile)
}
