import { useContext } from 'react';
import StepItemWrapper from './StepItem.style';
import { Icon } from '../Icon';
import { ColorContext } from '../Theme';
import themeConfig from '../Theme/colors';

const StepItem = ({ type, step, width, onClick }) => {
  const { colorTheme } = useContext(ColorContext);
  return (
    <StepItemWrapper
      $t={colorTheme}
      width={width}
      type={type}
      role="button"
      onClick={() => onClick(step.step)}
      className="step"
    >
      <div className="number-step">
        {type === 'done' ? <Icon icon="check" /> : <span> {step.step}</span>}
      </div>
      <div className="label-step">{step.label}</div>
    </StepItemWrapper>
  );
};

export default StepItem;
