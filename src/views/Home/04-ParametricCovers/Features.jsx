import { Tab } from '@headlessui/react'
import { useTranslation } from 'react-i18next'
import styled from 'styled-components'

import { colors, primaryColorKey } from '../../../../styles/colors'
import { features } from './data'
import { FeatureTabContent } from './FeatureTabContent'

export const Features = () => {
  const { t } = useTranslation('home')

  return (
    <Container>
      <Tab.Group vertical>
        <StyledTabsList>
          {features.map(feature => {
            return (
              <StyledTab key={feature.id}>
                <FeatureTabContent icon={feature.icon} title={t(feature.title)} text={t(feature.text)} />
              </StyledTab>
            )
          })}
        </StyledTabsList>
        <StyledTabPanels>
          {features.map(feature => {
            return (
              <Tab.Panel key={feature.id}>
                <ImageContainer>
                  <img
                    src={feature.image} alt={feature.title}
                    height={350}
                    width={350}
                    loading='lazy'
                  />
                </ImageContainer>
              </Tab.Panel>
            )
          })}
        </StyledTabPanels>
      </Tab.Group>
    </Container>
  )
}

const Container = styled.div`
  display: flex;
  gap: 64px;

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 48px;
  }
`

const StyledTabsList = styled(Tab.List)`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
`

const StyledTab = styled(Tab)`
  padding-top: 16px;
  padding-bottom: 16px;
  padding-left: 24px;
  text-align: left;
  border-left: 4px solid ${props => props.theme.isLightMode ? colors.gray['100'] : colors.gray['700']};
  outline: none;

  &[aria-selected="true"] {
    border-left: 4px solid ${colors[primaryColorKey]['600']};
  }
`

const StyledTabPanels = styled(Tab.Panels)`
  flex: 1;
`

const ImageContainer = styled.div`
  position: relative;
  height: 420px;
  max-width: 100%;
  background-color: ${props => props.theme.isLightMode ? colors.gray['100'] : colors.gray['700']};
  border-radius: 16px;
  display: flex;
  justify-content: center;
  align-items: center;

  @media (max-width: 768px) {
    height: 320px;
    border-radius: 0px;
    max-width: none;
    margin-left: -16px;
    margin-right: -16px;
  }

  img {
    width: auto;
    height: 90%;
    max-height: 350px;
    display: block;
    object-fit: contain;
  }

`
