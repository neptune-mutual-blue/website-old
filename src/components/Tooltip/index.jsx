import * as RadixTooltip from '@radix-ui/react-tooltip'
import styled from 'styled-components'
import { colors } from '../../../styles/colors'
import { shadows } from '../../../styles/shadows'
import { typography } from '../../../styles/typography'

/**
 *
 * @param {Object} params
 * @param {React.ReactNode} params.children
 * @param {React.ReactNode | string} params.infoComponent
 * @param {"top" | "right" | "bottom" | "left"} [params.position]
 * @param {number} [params.positionOffset]
 * @param {"start" | "center" | "end"} [params.align]
 * @param {number} [params.alignOffset]
 * @param {boolean} [params.arrow]
 * @param {number} [params.arrowOffset]
 * @param {number} [params.delayDuration]
 * @param {boolean} [params.disabled]
 * @returns
 */
export const Tooltip = ({
  children,
  infoComponent,
  position = 'top',
  positionOffset = 0,
  align = 'center',
  alignOffset = 0,
  arrow = true,
  arrowOffset = 4,
  delayDuration = 200,
  disabled = false
}) => (
  <RadixTooltip.Root delayDuration={delayDuration}>
    <RadixTooltip.Trigger asChild={!disabled} disabled={disabled}>
      {children}
    </RadixTooltip.Trigger>
    <TooltipContent
      side={position}
      sideOffset={positionOffset}
      alignOffset={alignOffset}
      align={align}
    >
      {arrow && (
        <TooltipArrow
          offset={arrowOffset}
          height={7}
        />
      )}
      {infoComponent}
    </TooltipContent>
  </RadixTooltip.Root>
)

const TooltipContent = styled(RadixTooltip.Content)`
  display: flex;
  flex-direction: column;
  row-gap: 4px;
  max-width: 224px;
  z-index: 60;
  border-radius: 8px;
  padding: 8px 12px;
  background-color: ${props => props.theme.isLightMode ? colors.white : colors.gray[900]};
  border: 1px solid ${props => props.theme.isLightMode ? colors.gray[100] : colors.gray[900]};
  color: ${props => props.theme.isLightMode ? colors.gray[700] : colors.white};
  
  box-shadow: ${shadows.lg};  
  ${typography.styles.textXs};
  ${typography.weights.semibold};

`

const TooltipArrow = styled(RadixTooltip.Arrow)`
  fill: ${props => props.theme.isLightMode ? colors.white : colors.gray[900]};
`
