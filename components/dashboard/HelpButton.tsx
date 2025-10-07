'use client';

import { useNextStep } from 'nextstepjs';
import { Button } from '@/components/ui/button';
import { HelpCircle } from 'lucide-react';

export function HelpButton() {
  const { startNextStep } = useNextStep();
  
  return (
    <Button
      variant="outline"
      size="icon"
      onClick={() => startNextStep('mainTour')}
      aria-label="Help"
    >
      <HelpCircle className="h-4 w-4" />
    </Button>
  );
}