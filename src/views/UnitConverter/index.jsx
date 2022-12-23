import { UnitConverterForm } from './02-unit-converter-form'

export const UnitConverter = () => {
  return (
    <>
      <UnitConverterForm
        crumbs={[
          { name: 'Home', link: '/' },
          { name: 'Web3 Tools', link: '/web3-tools' }
        ]}
      />
    </>
  )
}
