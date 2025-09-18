'use client';
import { use } from 'react';
import { ErrorComponent } from '@/components/pages/errors';

export type SearchParams = Record<string, string | string[] | undefined>;

// * Disclosure: This is the error page for the 500 error
// It is used to display the error message and a button to reset the page.

// For now we test the UI, faking the error message.

export default function ErrorPage(props: { searchParams: Promise<SearchParams> }) {
    const searchParams = use(props.searchParams);
    const errorCode: string | null = searchParams.error_code?.toString() ?? '500';
    const errorStatus: number = searchParams.status ? parseInt(searchParams.status.toString()) : 500;
    const errorMessage: string | null = searchParams.error_message?.toString() ?? 'Oops! Something went wrong.';
    const errorDescription: string | null =
        searchParams.error_description?.toString() ??
        'We are sorry, but we are unable to process your request at this time. Please try again later.';

    return (
        <ErrorComponent
            code={errorCode}
            description={errorDescription}
            message={errorMessage}
            status={errorStatus}
        />
    );
}