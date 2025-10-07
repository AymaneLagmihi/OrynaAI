import { useNextStep } from 'nextstepjs';
import { InteractiveHoverButton } from "@/components/ui/interactive-hover-button"

const Steps = () => {
    const { startNextStep, closeNextStep, currentTour, currentStep, setCurrentStep, isNextStepVisible } = useNextStep();

    const handleStartTour = () => {
        startNextStep("mainTour");
    };

    return (
        <>
            <InteractiveHoverButton onClick={handleStartTour} text="Start Tour" className="w-50" />
        </>
    );
};

export function StepTuto() {
    return <Steps />;
}