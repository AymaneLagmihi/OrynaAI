'use client';

export type SearchParams = Record<string, string | string[] | undefined>;

import { ArrowArcLeft, ArrowArcLeftIcon, ArrowsCounterClockwise, ArrowsCounterClockwiseIcon, HouseSimple, HouseSimpleIcon, WarningDiamond, WarningDiamondIcon } from '@phosphor-icons/react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { titleCase } from 'title-case';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

type ErrorPageProps = {
    code: string | number;
    message: string;
    description: string;
    status: number | string;
    resetErrorBoundary?: () => void;
};

export function ErrorComponent({ description, message, resetErrorBoundary, status }: ErrorPageProps) {
    const router = useRouter();

    const [hasPreviousPage, setHasPreviousPage] = useState(true);

    useEffect(() => {
        if (window.history.length > 2) {
            setHasPreviousPage(true);
        } else {
            setHasPreviousPage(false);
        }
    }, []);

    return (
            <main className="container flex w-full flex-1 flex-col items-center justify-center">
                <div className="flex w-full flex-col items-center justify-center text-center md:max-w-xl">
                    <div className="mb-5 flex flex-col items-center justify-center gap-3">
                        <div className="mb-3 flex size-16 items-center justify-center rounded-full bg-surface-100 dark:bg-surface-900">
                            <WarningDiamondIcon
                                className="size-8 text-surface-600 dark:text-surface-400"
                                weight="duotone"
                            />
                        </div>
                        <p className="text-base font-semibold text-destructive">{status}</p>
                        <h1
                            className={cn(
                                'w-full text-3xl font-black tracking-tighter text-surface-900 dark:text-surface-100 sm:text-5xl',
                                'overflow-wrap-anywhere text-pretty break-words',
                            )}
                        >
                            {titleCase(message)}
                        </h1>
                        <p
                            className={cn(
                                'w-full break-words text-base leading-7 text-surface-600 dark:text-surface-500',
                                'overflow-wrap-anywhere text-pretty break-all',
                            )}
                        >
                            {description}
                        </p>
                    </div>
                    <div className="mt-10 flex w-full flex-wrap items-center justify-between gap-3">
                        {!resetErrorBoundary && hasPreviousPage && (
                            <Button
                                className="flex flex-1 items-center justify-center"
                                color="default"
                                onClick={() => router.back()}
                            >
                                <ArrowArcLeftIcon color="currentColor" weight="duotone" />
                                <span className="text-base font-semibold">Previous page</span>
                            </Button>
                        )}
                        {resetErrorBoundary && (
                            <Button
                                className="flex flex-1 items-center justify-center"
                                color="default"
                                onClick={resetErrorBoundary}
                            >
                                <ArrowsCounterClockwiseIcon className="size-5" color="currentColor" weight="duotone" />
                                <span className="text-base font-semibold">Try again</span>
                            </Button>
                        )}
                        {!resetErrorBoundary &&
                            <Button
                                asChild
                                className="flex flex-1 items-center justify-center"
                                color="default"
                                type="button"
                            >
                                <Link href="/">
                                    <HouseSimpleIcon color="currentColor" weight="duotone" />
                                    <span className="whitespace-nowrap text-base font-semibold">Go Home</span>
                                </Link>
                            </Button>
                        }
                    </div>
                    <p className="mt-6 w-full text-sm leading-7 text-muted">
                        Please use the navigation buttons above to find your way.
                    </p>
                </div>
            </main>
    );
}

export function Error404() {
    return (
        <ErrorComponent
            code="404"
            description="The page you're looking for doesn't exist or may have been moved."
            message="Page Not Found"
            status={404}
        />
    );
}