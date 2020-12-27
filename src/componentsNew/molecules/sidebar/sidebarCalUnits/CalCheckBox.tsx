import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../../../modules';
import styled from 'styled-components';

interface CalCheckBoxProps {
  eachCalendarId: number;
  eachCalendarColor: string;
  eachCalendarName: string;
  calArrayForFiltering: Array<number>;
  handleCheckBox: (checkedCal: number, isChecked: boolean) => void;
}

interface CheckboxProps {
  className: string;
  calColor: string;
  checked: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

// 아래 링크 글을 참고하여 작성했음
// https://medium.com/@colebemis/building-a-checkbox-component-with-react-and-styled-components-8d3aa1d826dd

export default function CalCheckBox({
  eachCalendarId,
  eachCalendarColor,
  eachCalendarName,
  calArrayForFiltering,
  handleCheckBox,
}: CalCheckBoxProps) {
  let isCheckedDefault;
  if (calArrayForFiltering.indexOf(eachCalendarId) !== -1) {
    isCheckedDefault = true;
  } else {
    isCheckedDefault = false;
  }

  const [isChecked, setIsChecked] = useState(isCheckedDefault);
  // 기본값을 true로 줘야하는게 아닐까?

  const Checkbox = ({ className, calColor, checked, ...props }: CheckboxProps) => (
    <CheckboxContainer className={className}>
      <HiddenCheckbox checked={checked} {...props} />
      <StyledCheckbox checked={checked} calColor={calColor}>
        <Icon viewBox="0 0 24 24">
          <polyline points="20 6 9 17 4 12" />
        </Icon>
      </StyledCheckbox>
    </CheckboxContainer>
  );

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsChecked(e.target.checked);
    handleCheckBox(eachCalendarId, e.target.checked);
    // console.log(e.target.checked);
  };

  return (
    <CalCheckBoxLabel>
      <Checkbox
        className={`checkbox_${eachCalendarId}`}
        calColor={eachCalendarColor}
        checked={isChecked}
        onChange={handleCheckboxChange}
      />
      <span style={{ marginLeft: '5px' }}>{eachCalendarName}</span>
    </CalCheckBoxLabel>
  );
}

const CalCheckBoxLabel = styled.label`
  flex: 8;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  text-align: center;
  margin: 2px;
`;

// 클릭하면 나타나는 '체크 기호' 부분
const Icon = styled.svg`
  fill: none;
  stroke: white;
  stroke-width: 4px;
  height: 5;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const CheckboxContainer = styled.div`
  display: inline-block;
  vertical-align: middle;
`;

const HiddenCheckbox = styled.input.attrs({ type: 'checkbox' })`
  // Hide checkbox visually but remain accessible to screen readers.
  // Source: https://polished.js.org/docs/#hidevisually
  border: 0;
  clip: rect(0 0 0 0);
  clip-path: inset(50%);
  height: 1px;
  margin: -1px;
  overflow: hidden;
  padding: 0;
  position: absolute;
  white-space: nowrap;
  width: 1px;
`;

const StyledCheckbox = styled.div`
  width: 16px;
  height: 16px;
  background: ${(props: StyledCheckboxProps) => (props.checked ? props.calColor : 'white')};
  border: 2px solid;
  border-color: ${(props: StyledCheckboxProps) => props.calColor};
  border-radius: 3px;
  transition: all 150ms;
  ${HiddenCheckbox}:focus + & {
    box-shadow: 0 0 0 10px pink;
  }
  ${Icon} {
    visibility: ${props => (props.checked ? 'visible' : 'hidden')};
  }
`;

interface StyledCheckboxProps {
  checked: boolean;
  calColor: string;
}
