import styled from "@emotion/styled";
import {useEffect, useState} from "react";

const Checkbox = ({
                      width,
                      height,
                      isChecked,
                      isDisabled,
                      children
                  }) => {
    const [isCheckedState, setIsCheckedState] = useState(isChecked)

    useEffect(() => {
        setIsCheckedState(isChecked)
    }, [isChecked])

    const handleChange = ({target}) => setIsCheckedState(target.checked)

    return (
        <StyledLabel>
            <input disabled={isDisabled} checked={isCheckedState} type="checkbox" onChange={handleChange}/>
            <StyledCheckbox isChecked={isCheckedState} width={width} height={height}></StyledCheckbox>
            {children}
        </StyledLabel>
    )
}

const StyledLabel = styled.label`
  display: inline-flex;

  input {
    display: none;
  }
`
const StyledCheckbox = styled.span`
  width: ${({width}) => width};
  height: ${({height}) => height};
  position: relative;
  border: 1px solid;
  border-radius: 5px;
  box-sizing: border-box;
  background: ${({isChecked}) => isChecked ? '#000' : '#fff'};

  &:before {
    // TODO. 체크 아이콘으로 변경
    content: 'v';
    position: absolute;
    top: 50%;
    left: 50%;
    ${({isChecked}) => !isChecked && 'display: none;'}
    transform: translate(-50%, -50%);
    color: #fff;
  }
`

Checkbox.defaultProps = {
    width: '20px',
    height: '20px',
    isChecked: false,
    isDisabled: false
}

export default Checkbox