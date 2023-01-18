export const withCSR = (next) => async (ctx) => {
    // check is it a client side navigation
    const isCSR = ctx.req.url?.startsWith('/_next');

    console.log(isCSR,ctx.req.url,'ctx.req.url');
    console.log('run');
    if (isCSR) {
        return {
            props: {},
        };
    }

    return next?.(ctx);
};
