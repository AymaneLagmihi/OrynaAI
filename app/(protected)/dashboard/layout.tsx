import { NextStepProvider, NextStep } from 'nextstepjs';
import steps from './steps';
import {ThemeProvider} from 'next-themes'
;
export default function Layout({ children }) {
    return (
        <>
            {children}
        </>
    );
}