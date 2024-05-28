import { FastifyReply, FastifyRequest } from "fastify"

export const refresh = async (
  request: FastifyRequest,
  replay: FastifyReply
) => {
  await request.jwtVerify({ onlyCookie: true })

  const token = await replay.jwtSign({}, {
    sign: {
      sub: request.user.sub
    }
  })

  const refreshToken = await replay.jwtSign({}, {
    sign: {
      sub: request.user.sub,
      expiresIn: "7d"
    }
  })

  return replay
    .setCookie("refreshToken", refreshToken, {
      path: "/",
      secure: true,
      sameSite: true,
      httpOnly: true
    })
    .status(200)
    .send({ token })

}
