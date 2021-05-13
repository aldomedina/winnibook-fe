import React from 'react';
import StepItem from './StepItem';

const Stepper = ({ step, updateStep, setData }) => {
  const getTypeStep = (step, currentStep) => {
    if (step === currentStep) return 'active';
    if (step < currentStep) return 'done';
    return '';
  };

  return (
    <div className="flex min-h-24 lg:items-center justify-center">
      {setData.map(item => (
        <StepItem
          key={item.step}
          width={100 / setData.length}
          type={getTypeStep(item.step, step)}
          step={item}
          onClick={step => updateStep(step)}
        />
      ))}
    </div>
  );
};

export default Stepper;
