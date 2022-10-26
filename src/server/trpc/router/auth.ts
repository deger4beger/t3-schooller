import Cookies from "cookies";
import * as bcrypt from "bcryptjs";
import { z } from "zod";
import { publicProcedure, router } from "../trpc";
import { getSignedToken, validateToken } from "../../../utils/jwt";
import { TRPCError } from "@trpc/server";

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
		.mutation(async ({ input, ctx }) => {
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
	signin: publicProcedure
		.input(
			z.object({
				email: z.string().email(),
				password: z.string().min(8).max(20),
			})
		)
		.output(
			z.object({
				userData: userValidator,
				jwt: z.string(),
			})
		)
		.mutation(async ({ input, ctx }) => {
			const cookies = new Cookies(ctx.req, ctx.res);

			const user = await ctx.prisma.user.findUnique({
				where: { email: input.email },
			});
			if (!user) {
				throw new TRPCError({ code: "NOT_FOUND" });
			}

			const passwordMatch = await bcrypt.compare(input.password, user.password);
			if (!passwordMatch) {
				throw new TRPCError({ code: "BAD_REQUEST" });
			}
			const { password, ...userOutput } = user;

			const refreshToken = getSignedToken(userOutput, true);
			ctx.prisma.refreshToken.update({
				where: {
					userId: userOutput.id,
				},
				data: {
					token: refreshToken,
				},
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
	generateAccess: publicProcedure.query(async ({ ctx }) => {
		const refreshToken = ctx.req.cookies["refresh"];
		if (!refreshToken) {
			throw new TRPCError({ code: "UNAUTHORIZED" });
		}
		try {
			const { id } = validateToken(refreshToken, true);
			const user = await ctx.prisma.user.findUnique({ where: { id } });

			if (!user) {
				throw new TRPCError({ code: "NOT_FOUND" });
			}

			const { password, ...userOutput } = user;
			return {
				userData: userOutput,
				jwt: getSignedToken(userOutput),
			};
		} catch {
			throw new TRPCError({ code: "UNAUTHORIZED" });
		}
	}),
	signout: publicProcedure.mutation(async ({ ctx }) => {
		const cookies = new Cookies(ctx.req, ctx.res);
		const refreshToken = ctx.req.cookies["refresh"];

		if (!refreshToken) {
			throw new TRPCError({ code: "UNAUTHORIZED" });
		}

		try {
			const { id } = validateToken(refreshToken, true);
			await ctx.prisma.refreshToken.delete({ where: { userId: id } });
			cookies.set("refresh", "", {
				httpOnly: true,
				sameSite: true,
			});
			return true;
		} catch {
			throw new TRPCError({ code: "UNAUTHORIZED" });
		}
	}),
});
