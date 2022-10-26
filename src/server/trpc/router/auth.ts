import Cookies from "cookies";
import * as bcrypt from "bcryptjs";
import { z } from "zod";
import { publicProcedure, router } from "../trpc";
import { getSignedToken } from "../../../utils/jwt";

const userValidator = z.object({
	id: z.number(),
	email: z.string().email(),
	name: z.string(),
	role: z.enum(["STUDENT", "TEACHER"]),
	createdAt: z.date(),
});

export type User = z.infer<typeof userValidator>;

const authRouter = router({
	signup: publicProcedure
		.input(
			z.object({
				email: z.string().email(),
				password: z.string().min(8).max(20),
				name: z.string().min(10).max(50),
				role: z.enum(["STUDENT", "TEACHER"]),
			})
		)
		.output(
			z.object({
				userData: userValidator,
				jwt: z.string(),
			})
		)
		.query(async ({ input, ctx }) => {
			const cookies = new Cookies(ctx.req, ctx.res);
			const userPayload = {
				...input,
				password: await bcrypt.hash(input.password, 10),
			};
			const { password, ...userOutput } = await ctx.prisma.user.create({
				data: userPayload,
			});

			const refreshToken = getSignedToken(userOutput, true);
			await ctx.prisma.refreshToken.create({
				data: { token: refreshToken, userId: userOutput.id },
			});

			cookies.set("refresh", refreshToken, {
				httpOnly: true,
				sameSite: true,
			});
			return {
				userData: userOutput,
				jwt: getSignedToken(userOutput),
			};
		}),
});
