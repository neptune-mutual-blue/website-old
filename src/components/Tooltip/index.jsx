import { useRef, useState } from 'react'
import styled, { css } from 'styled-components'
import { colors } from '../../../styles/colors'
import { shadows } from '../../../styles/shadows'
import { typography } from '../../../styles/typography'

/**
 *
 * @param {Object} params
 * @param {React.ReactNode} params.children
 * @param {React.ReactNode | string} params.infoComponent
 * @param {"top" | "right" | "bottom" | "left"} [params.position]
 * @param {boolean} [params.arrow]
 * @returns
 */
export const Tooltip = ({
  children,
  infoComponent,
  position = 'top',
  arrow = true
}) => {
  const [showContent, setShowContent] = useState(false)
  const ref = useRef(null)
  const [align, setAlign] = useState('middle')

  const handleMouseEnter = () => {
    if (!ref.current || !window) return

    if (ref.current) {
      const boundingInfo = ref.current.getBoundingClientRect()
      const width = window.innerWidth
      const overflowingRight = (boundingInfo.x + boundingInfo.width + 50) > width
      const overflowingLeft = boundingInfo.x <= 0

      if (overflowingRight) setAlign('right')
      else if (overflowingLeft) setAlign('left')
    }
  }

  return (
    <TooltipRoot>
      <TooltipTrigger
        onMouseEnter={handleMouseEnter}
      >
        {children}
      </TooltipTrigger>
      <TooltipContent
        className='content'
        data-side={position}
        data-align={align}
        data-show={showContent ? 'true' : 'false'}
        ref={ref}
      >
        {infoComponent}
      </TooltipContent>

      {arrow && (
        <TooltipArrow
          className='arrow'
          onMouseEnter={() => setShowContent(true)}
          onMouseLeave={() => setShowContent(false)}
        />
      )}
    </TooltipRoot>
  )
}

const TooltipRoot = styled.div`
  position: relative;
  width: fit-content;
  height: fit-content;
`

const TooltipArrow = styled.div`
  display: none;

  background-image: ${props => props.theme.isLightMode
    ? 'url("data:image/svg+xml,%3Csvg width=\'17\' height=\'9\' viewBox=\'0 0 17 9\' fill=\'none\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cpath d=\'M14.5711 0.485289C15.462 0.485289 15.9081 1.56243 15.2782 2.1924L9.20711 8.26347C8.81658 8.654 8.18342 8.654 7.79289 8.26347L1.72183 2.1924C1.09187 1.56243 1.53803 0.485289 2.42894 0.485289L14.5711 0.485289Z\' fill=\'%23ffffff\'/%3E%3C/svg%3E%0A")'
    : 'url("data:image/svg+xml,%3Csvg width=\'17\' height=\'9\' viewBox=\'0 0 17 9\' fill=\'none\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cpath d=\'M14.5711 0.485289C15.462 0.485289 15.9081 1.56243 15.2782 2.1924L9.20711 8.26347C8.81658 8.654 8.18342 8.654 7.79289 8.26347L1.72183 2.1924C1.09187 1.56243 1.53803 0.485289 2.42894 0.485289L14.5711 0.485289Z\' fill=\'%23101828\'/%3E%3C/svg%3E%0A")'
  };
  background-repeat: no-repeat;
  width: 16px;
  height: 16px;

  z-index: 61;
  box-shadow: ${shadows.lg};

  &:hover {
    display: block;
  }
`

const positionStyles = css`
  position: absolute;
  
  & + .arrow {
    position: absolute;
  }

  &[data-side="top"] {
    bottom: calc(100% + 15px);
    left: 50%;
    transform: translateX(-50%);
  
    & + .arrow {
      bottom: 100%;
      left: 50%;
      transform: translateX(-50%);
    }
  }

  &[data-side="bottom"] {
    top: calc(100% + 15px);
    left: 50%;
    transform: translateX(-50%);
  
    & + .arrow {
      top: 100%;
      left: 50%;
      transform: translateX(-50%) rotate(180deg)
    }
  }

  &[data-side="right"] {
    left: calc(100% + 15px);
    top: 50%;
    transform: translateY(-50%);
  
    & + .arrow {
      left: 100%;
      top: 50%;
      transform: translateY(-50%) rotate(90deg)
    }
  }

  &[data-side="left"] {
    right: calc(100% + 15px);
    top: 50%;
    transform: translateY(-50%);
  
    & + .arrow {
      right: 100%;
      top: 50%;
      transform: translateY(-50%) rotate(270deg)
    }
  }

  &[data-align="right"] {
    transform: translateX(-98%);
    
    & + .arrow {
      transform: translateX(-99%);
    }
  }

  &[data-align="left"] {
    left: 0;
    transform: translateX(-1%);
    
    & + .arrow {
      left: 0%;
      transform: translateX(0%);
    }
  }
`

const TooltipContent = styled.div`
  ${positionStyles}

  display: none;
  flex-direction: column;
  row-gap: 4px;
  min-width: 224px;
  z-index: 99;
  border-radius: 8px;
  padding: 8px 12px;
  background-color: ${props => props.theme.isLightMode ? colors.white : colors.gray[900]};
  border: 1px solid ${props => props.theme.isLightMode ? colors.gray[100] : colors.gray[900]};
  color: ${props => props.theme.isLightMode ? colors.gray[700] : colors.white};
  
  box-shadow: ${shadows.lg};  
  ${typography.styles.textXs};
  ${typography.weights.semibold};

  &[data-show="true"] {
    display: flex;
  }

  &:hover {
    display: flex;
  }

  &:hover + .arrow {
    display: block;
  } 
`

const TooltipTrigger = styled.div`
  position: relative;
  width: fit-content;
  height: fit-content;

  &:hover + .content {
    display: flex;
  }

  &:hover ~ .arrow {
    display: block;
  }
`
