import { Hero } from './01-hero'
import { UnitConverterForm } from './02-unit-converter-form'
import { NewsletterSignupForm } from '../../components/NewsletterSignupForm'

export const UnitConverter = () => {
  return (
    <>
      <Hero />

      <UnitConverterForm
        crumbs={[
          { name: 'Home', link: '/' },
          { name: 'Web3 Tools', link: '/web3-tools' }
        ]}
      />

      <NewsletterSignupForm paddingTop />
    </>
  )
}
