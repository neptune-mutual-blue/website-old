import { useTranslation } from 'react-i18next'
import { Popover } from '@headlessui/react'
import styled from 'styled-components'
import { colors } from '../../../../../styles/colors'
import { typography } from '../../../../../styles/typography'
import { Icon } from '../../../Icon'
import { DesktopSubmenu } from '../../DesktopNavigation/Submenu'

export const SubmenuItem = ({ item }) => {
  const { t } = useTranslation('common')

  return (
    <Container>
      {({ open }) => (
        /* Use the `open` state to conditionally change the direction of the chevron icon. */
        <>
          <Button>
            {t(item.title)}
            <Icon size={20} variant={open ? 'chevron-up' : 'chevron-down'} />
          </Button>
          <Popover.Panel>
            {({ close }) => <DesktopSubmenu item={item} close={close} />}
          </Popover.Panel>
        </>
      )}
    </Container>
  )
}

const Container = styled(Popover)`
  display: flex;
`

const Button = styled(Popover.Button)`
  display: flex;
  align-items: center;
  margin-top: -12px;
  margin-bottom: -12px;
  padding: 12px 16px;
  gap: 16px;
  color: ${props => props.theme.isLightMode ? colors.gray['600'] : colors.gray['400']};
  border-radius: 8px;
  cursor: pointer;

  ${typography.styles.textMd};
  ${typography.weights.semibold};

  :hover {
    color: ${props => props.theme.color};
  }
`
