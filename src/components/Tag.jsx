import Link from 'next/link'
import styled from 'styled-components'
import { colors, primaryColorKey } from '../../styles/colors'
import { typography } from '../../styles/typography'
import { utils } from '../../styles/utils'

export const Tag = styled(Link)`
  display: inline-flex;
  padding: 2px 10px;
  border-radius: 9999px;
  background-color: ${props => props.theme.isLightMode ? colors[props.color || primaryColorKey]['50'] : colors.gray['700']};
  color: ${props => props.theme.isLightMode ? colors[props.color || primaryColorKey]['700'] : colors[props.color || primaryColorKey]['400']};

  min-width: 0;

  ${typography.styles.textSm};
  ${typography.weights.medium};
  ${utils.ellipsis};

  :hover, :active{
    color: ${props => props.theme.isLightMode ? colors[props.color || primaryColorKey]['700'] : colors[props.color || primaryColorKey]['400']};
  }
`
