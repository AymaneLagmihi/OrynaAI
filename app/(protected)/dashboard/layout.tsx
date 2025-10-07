import { NextStepProvider, NextStep } from 'nextstepjs';
import { Tour } from 'nextstepjs/dist/types';

export default function Layout({ children }) {
    const steps : Tour[] = [
        {
            tour: "mainTour",
            steps: [
                {
                    icon: null,
                    title: "Welcome to Clothy AI!",
                    content: "This tour will guide you through the main features of the dashboard.",
                    selector: ".navigation-bar",
                    side: "bottom",
                    showControls: true,
                    showSkip: true,
                },
                {
                    icon: null,
                    title: "Saved Gallery",
                    content: "Here you can view and manage your saved virtual try-on images.",
                    selector: ".saved-gallery",
                    side: "right",
                    showControls: true,
                    showSkip: true,
                },
                {
                    icon: null,
                    title: "Generation Section",
                    content: "Use this section to upload images and generate virtual try-ons.",
                    selector: ".generation-section",
                    side: "left",
                    showControls: true,
                    showSkip: true,
                },
                {
                    icon: null,
                    title: "Coin System",
                    content: "You can earn and spend coins for generating virtual try-ons.",
                    selector: ".coin-display",
                    side: "bottom",
                    showControls: true,
                    showSkip: true,
                },
                {
                    icon: null,
                    title: "End of Tour",
                    content: "This concludes the tour. Enjoy using Clothy AI!",
                    selector: ".navigation-bar",
                    side: "bottom",
                    showControls: true,
                    showSkip: false,
                },
            ],
        },
    ];
    return (
        <NextStepProvider>
            <NextStep steps={steps}>
                {children}
            </NextStep>
        </NextStepProvider>
    );
}