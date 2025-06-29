import { createCookieSessionStorage, redirect } from "@remix-run/node";
import { prisma } from "./database.server";
import { hash, compare } from "bcryptjs"

const SESSION_SECRET = process.env.SESSION_SECRET;

const sessionStorage = createCookieSessionStorage({
    cookie: {
        secure: process.env.NODE_ENV === 'production',
        secrets: [SESSION_SECRET],
        sameSite: 'lax',
        maxAge: 30 * 24 * 60 * 60, // 30 days in seconds,
        httpOnly: true
    }
})

async function createUserSession(userId, redirectPath) {
    const session = await sessionStorage.getSession();
    session.set('user_id', userId)
    return redirect(redirectPath, {
        headers: {
            'Set-Cookie': await sessionStorage.commitSession(session)
        }
    })
}

export async function destroyUserSession(request) {
    const session = await sessionStorage.getSession(request.headers.get('Cookie'));

    return redirect('/', {
        headers: {
            'Set-Cookie': await sessionStorage.destroySession(session)
        }
    })
}

export async function getUserFromSession(request) {
    const session = await sessionStorage.getSession(request.headers.get('Cookie'));

    const userId = session.get('user_id')

    if (!userId) {
        return null;
    }

    return userId;
}

export async function requireUserSession(request) {
    const userId = await getUserFromSession(request);

    if (!userId) {
        throw redirect('/auth?mode=signin');
    }

    return userId
}

export async function signup({ email, password }) {
    const existingUser = await prisma.user.findFirst({
        where: {
            email
        }
    })

    if (existingUser) {
        const error = new Error("A user with the provided email address exists already.")
        error.status = 422;
        throw error;
    }

    const paswordHash = await hash(password, 12)

    const user = await prisma.user.create({
        data: {
            email, password: paswordHash
        }
    })
    return createUserSession(user.id, "/expenses")
}

export async function login({ email, password }) {
    const existingUser = await prisma.user.findFirst({
        where: {
            email
        }
    })

    if (!existingUser) {
        const error = new Error("Could not log you in, please check provided credentials.")
        error.status = 401;
        throw error;
    }

    const isPasswordCorrect = await compare(password, existingUser?.password)

    if (!isPasswordCorrect) {
        const error = new Error("Could not log you in, please check provided credentials.")
        error.status = 401;
        throw error;
    }

    return createUserSession(existingUser.id, '/expenses')
}