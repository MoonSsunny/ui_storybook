import styled from "@emotion/styled";
import React, {ChangeEvent, ReactElement, useEffect, useState} from "react";

export enum Sizes {
  small = 'small',
  medium = 'medium',
  large = 'large'
}

export interface Props {
  size?: Sizes
  isChecked?: boolean
  isDisabled?: boolean
  label?: ReactElement
  background?: string
  color?: string
  change?: (event: ChangeEvent<HTMLInputElement>) => void
}

const Checkbox: React.FC<Props> = ({
                                     size = Sizes.medium,
                                     isChecked,
                                     isDisabled,
                                     label,
                                     color,
                                     background,
                                     change
                                   }) => {
  const [isCheckedState, setIsCheckedState] = useState(isChecked)

  useEffect(() => {
    setIsCheckedState(isChecked)
  }, [isChecked])

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const {target} = e;
    setIsCheckedState(target.checked);
    change?.(e);
  }

  return (
      <StyledLabel color={color} size={size}>
        <input disabled={isDisabled} checked={isCheckedState} type="checkbox" onChange={handleChange}/>
        <StyledCheckbox
            isDisabled={isDisabled}
            isChecked={isCheckedState}
            size={size}
            label={label}
            background={background}
        ></StyledCheckbox>
        {label}
      </StyledLabel>
  )
}

const StyledSize: {
  [key in Sizes]: {
    width: string
    height: string
    fontSize: string
  }
} = {
  [Sizes.large]: {
    width: '24px',
    height: '24px',
    fontSize: '16px'
  },
  [Sizes.medium]: {
    width: '20px',
    height: '20px',
    fontSize: '14px'
  },
  [Sizes.small]: {
    width: '16px',
    height: '16px',
    fontSize: '12px'
  }
}

const StyledLabel = styled.label<Pick<Props, "color"> & { size: Sizes }>`
  display: inline-flex;
  font-size: ${({size}) => StyledSize[size].fontSize};
  align-items: center;
  color: ${({color}) => color};

  input {
    display: none;
  }
`
const StyledCheckbox = styled.span<Props & { size: Sizes }>`
  width: ${({size}) => StyledSize[size].width};
  height: ${({size}) => StyledSize[size].height};
  position: relative;
  border-radius: 5px;
  box-sizing: border-box;
  border: 1px solid ${({background}) => background};
  background: ${({isChecked, background}) => isChecked ? background : '#fff'};

  ${({isDisabled}) => isDisabled && 'opacity: .2;'}
  ${({label}) => !!label && 'margin-right: 5px;'}
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
  size: Sizes.medium,
  isChecked: false,
  isDisabled: false,
  background: '#000',
  color: '#000'
}

export default Checkbox