import * as React from 'react';

/**
 * SVGR Support
 * Caveat: No React Props Type.
 *
 * You can override the next-env if the type is important to you
 * @see https://stackoverflow.com/questions/68103844/how-to-override-next-js-svg-module-declaration
 */

// !STARTERCONF -> Select !STARTERCONF and CMD + SHIFT + F
// Before you begin editing, follow all comments with `STARTERCONF`,
// to customize the default configuration.

export default function HomePage() {
    return (
        <>
            {/* <Seo templateTitle='Home' /> */}

            <main>
                <section>
                    <div className='flex h-50 flex-col items-center justify-center text-center'>
                        سید رضا موسوی
                    </div>
                </section>
            </main>
        </>
    );
}
