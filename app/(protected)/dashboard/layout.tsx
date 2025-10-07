import { NextStepProvider, NextStep } from 'nextstepjs';
import steps from './steps';

export default function Layout({ children }) {
    return (
        <NextStepProvider>
            <NextStep steps={steps}>
                {children}
            </NextStep>
        </NextStepProvider>
    );
}