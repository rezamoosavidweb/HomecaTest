import Loading from '@/components/@base/loading';
import Router from 'next/router';
import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import Autosizer from 'react-virtualized-auto-sizer';
import { FixedSizeGrid as Grid } from 'react-window';
import styles from './style';

const getIdByGridPosition = (col: number, row: number, cols: number) =>
    row * cols + col;

export default function InfiniteScrollComponent({
    data,
    hasNextPage,
    fetchNextPage,
    limit,
    isSuccess,
    isFetchingNextPage,
    RenderItem,
}) {
    const fetchData = () => {
        fetchNextPage();
    };
    const [cols, setCols] = useState(4);
    const listRef = useRef(null);
    const backRef = useRef(false);
    function Row({ index, style }) {
        const rowRef = useRef<any>({});
        const isLast = index === data?.length - 1;

        /**
         * Implement Intersection Observer to check if the last Card in the array is visible on the screen, then set a new limit
         */
        useEffect(() => {
            if (!rowRef?.current) return;

            const observer = new IntersectionObserver(([entry]) => {
                if (
                    isLast &&
                    entry.isIntersecting &&
                    hasNextPage &&
                    !isFetchingNextPage &&
                    isSuccess
                ) {
                    fetchData();
                    observer.unobserve(entry.target);
                }
            });

            observer.observe(rowRef.current);
        }, [isLast]);

        return (
            <div ref={rowRef} style={style}>
                <div
                    style={styles.receivedMessage}
                    data-set={`${data[index]?.id}`}
                >
                    {RenderItem(data, index, listRef?.current)}
                </div>
                {isFetchingNextPage && index === data?.length - 1 && (
                    <div className='fixed right-[32vw] my-2 flex w-[33vw] justify-center'>
                        <Loading />
                    </div>
                )}
            </div>
        );
    }
    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth < 361) {
                setCols(1);
            } else if (window.innerWidth < 780) {
                setCols(2);
            } else if (window.innerWidth < 1200) {
                setCols(3);
            } else if (window.innerWidth < 12600) {
                setCols(4);
            } else {
                setCols(5);
            }
        };
        window.addEventListener('resize', handleResize);
        handleResize();

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    useEffect(() => {
        let clearSession;
        window.onpopstate = () => {
            clearSession = setTimeout(() => {
                sessionStorage.removeItem('searchScroll');
            }, 200);
        };
        return () => clearTimeout(clearSession);
    }, []);
    return (
        <Autosizer>
            {({ height, width }) => {
                return (
                    <Grid
                        columnCount={cols}
                        columnWidth={Math.floor(width / cols - 12)}
                        height={height}
                        rowCount={Math.ceil(data?.length / cols)}
                        overscanRowCount={5}
                        rowHeight={480}
                        className='List'
                        width={width}
                        ref={async (ref) => {
                            if (
                                Number(sessionStorage.getItem('searchScroll')) >
                                0
                            ) {
                                await document
                                    .querySelector('.List')
                                    ?.scrollTo({
                                        top: Number(
                                            sessionStorage.getItem(
                                                'searchScroll'
                                            )
                                        ),
                                    });
                                backRef.current = true;
                            }
                        }}
                        style={{
                            margin: -4,
                            direction: 'rtl',
                            width: '100vw',
                        }}
                    >
                        {({ columnIndex, rowIndex, style }) => {
                            const id = getIdByGridPosition(
                                columnIndex,
                                rowIndex,
                                cols
                            );

                            if (!data || data.length === 0 || id >= data.length)
                                return null;
                            return <Row index={id} style={style} />;
                        }}
                    </Grid>
                );
            }}
        </Autosizer>
    );
}
