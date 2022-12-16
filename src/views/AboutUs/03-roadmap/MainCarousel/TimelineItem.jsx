import styled from 'styled-components'
import { colors, primaryColorKey } from '../../../../../styles/colors'
import { typography } from '../../../../../styles/typography'

export const TimelineItem = ({
  point, onClick, isActive, isFuture, isCurrent, index
  , totalCount
}) => {
  return (
    <Container
      onClick={onClick}
      isFirst={index === 0}
      isLast={index === totalCount - 1}
      isFuture={isFuture}
      isCurrent={isCurrent}
    >
      <Dot
        isActive={isActive}
        isFuture={isFuture}
        isCurrent={isCurrent}
      >
        <DotChild
          isActive={isActive}
          isFuture={isFuture}
          isCurrent={isCurrent}
        />
      </Dot>
      <DotName
        isActive={isActive}
        isFuture={isFuture}
        isCurrent={isCurrent}
      >
        {point.name}
      </DotName>
    </Container>
  )
}

const Container = styled.button`
  position: relative;
  display: flex;
  width: 100%;
  flex-direction: column;
  align-items: center;

  ::before {
    display: ${props => props.isFirst ? 'none' : 'inline-block'};
    content: '';
    position: absolute;
    top: 50%;
    left: 0;
    transform: translateY(-50%);
    height: 2px;
    width: 50%;
    background: ${props => {
    const isLightMode = props.theme.isLightMode
      let color = isLightMode ? colors.gray['400'] : colors.gray['500']

      if (props.isFuture) {
        color = isLightMode ? colors.gray['200'] : colors.gray['600']
      }

      return color
    }};
  }

  ::after {
    display: ${props => props.isLast ? 'none' : 'inline-block'};
    content: '';
    position: absolute;
    top: 50%;
    right: 0;
    transform: translateY(-50%);
    height: 2px;
    width: 50%;
    background: ${props => {
    const isLightMode = props.theme.isLightMode
      let color = isLightMode ? colors.gray['400'] : colors.gray['500']

      if (props.isCurrent || props.isFuture) {
        color = isLightMode ? colors.gray['200'] : colors.gray['600']
      }

      return color
    }};
  }
`

const Dot = styled.div`
  display: inline-flex;
  justify-content: center;
  align-items: center;
  width: 16px;
  height: 16px;
  border-radius: 50%;
  position: relative;
  z-index: 1;

  background: ${props => {
    const isLightMode = props.theme.isLightMode
    let color = isLightMode ? colors[primaryColorKey]['50'] : colors.gray['50']

    if (props.isFuture) {
      color = isLightMode ? props.theme.primaryBackgroundColor : colors.gray['500']
    }

    if (props.isCurrent) {
      color = isLightMode ? colors[primaryColorKey]['50'] : colors[primaryColorKey]['50']
    }

  return color
  }};
  
  border: 1px solid ${props => {
    const isLightMode = props.theme.isLightMode
    let color = isLightMode ? colors.gray['600'] : colors.gray['500']

    if (props.isFuture) {
      color = isLightMode ? colors.gray['300'] : colors.gray['600']
    }

    if (props.isCurrent) {
      color = isLightMode ? colors[primaryColorKey]['600'] : colors[primaryColorKey]['500']
    }

    return color
  }};

  box-shadow: 0px 0px 0px 4px ${props => {
    const isLightMode = props.theme.isLightMode
    let color = isLightMode ? 'transparent' : 'transparent'

    if (props.isActive) {
      color = isLightMode ? colors[primaryColorKey]['500'] : colors[primaryColorKey]['500']
    }

  return color
  }};

  ${Container}:hover &{
    background: ${props => {
      const isLightMode = props.theme.isLightMode
      const color = isLightMode ? colors[primaryColorKey]['100'] : colors[primaryColorKey]['100']
      return color
    }};

    box-shadow: 0px 0px 0px 4px ${props => {
      const isLightMode = props.theme.isLightMode
      let color = isLightMode ? colors.gray['500'] : colors.gray['500']

      if (props.isActive) {
        color = isLightMode ? colors[primaryColorKey]['500'] : colors[primaryColorKey]['500']
      }

    return color
    }};
  }
`

const DotChild = styled.div`
  display: block;
  width: 6px;
  height: 6px;
  border-radius: 50%;

  background: ${props => {
    const isLightMode = props.theme.isLightMode
    let color = isLightMode ? colors.gray['500'] : colors.gray['500']

    if (props.isCurrent) {
      color = isLightMode ? colors[primaryColorKey]['600'] : colors[primaryColorKey]['600']
    }

    if (props.isFuture) {
      color = 'transparent'
    }

  return color
  }};
`

const DotName = styled.p`
  top: 40px;
  left: 0;
  width: 100%;
  position: absolute;
  text-align: center;

  ${typography.styles.textSm};
  ${typography.weights.bold};
  color: ${props => {
    const isLightMode = props.theme.isLightMode
    let color = isLightMode ? colors.gray['600'] : colors.gray['400']

    if (props.isFuture) {
      color = isLightMode ? colors.gray['500'] : colors.gray['400']
    }

    if (props.isActive) {
      color = isLightMode ? colors.gray['900'] : colors.white
    }

    if (props.isCurrent) {
      color = isLightMode ? colors[primaryColorKey]['700'] : colors[primaryColorKey]['300']
    }

  return color
  }};
`
