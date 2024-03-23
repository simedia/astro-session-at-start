import { defineMiddleware, sequence } from 'astro/middleware';


/**
 * create/read session ID
 */
export const session = defineMiddleware(async (context, next) => {
    const cookie_name = 'sessionASTRO';

    // want a new session ID (for proof of concept)
    if (context.url.pathname.startsWith('/reset')) {
        context.cookies.delete(cookie_name);
        return context.redirect('/');
    }

    // set a session value if none
    const sessionID = context.cookies.get(cookie_name)?.value! || null;
    if (sessionID === null)
        context.cookies.set(cookie_name, crypto.randomUUID());

    return next();
});

export const onRequest = sequence(session);
