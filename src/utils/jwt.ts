import * as jwt from "jsonwebtoken";

type User = {
  id: string;
  email: string;
  name: string;
  role: "STUDENT" | "TEACHER";
  createdAt: Date;
};

export function getSignedToken(user: User, refresh = false) {
  return jwt.sign(
    getTokenPayload(user),
    refresh ? process.env.JWT_REFRESH_SECRET : process.env.JWT_ACCESS_SECRET,
    {
      expiresIn: refresh
        ? process.env.JWT_REFRESH_EXPIRES_IN
        : process.env.JWT_ACCESS_EXPIRES_IN,
    }
  );
}

export function validateToken(token: string, refresh = false) {
  return jwt.verify(
    token,
    refresh ? process.env.JWT_REFRESH_SECRET : process.env.JWT_ACCESS_SECRET
  ) as jwt.JwtPayload & ReturnType<typeof getTokenPayload>;
}

function getTokenPayload(user: User) {
  return {
    id: user.id,
    name: user.name,
    email: user.email,
  };
}
