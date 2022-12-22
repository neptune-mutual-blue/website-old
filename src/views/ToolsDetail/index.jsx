import { NewsletterSignupForm } from '../../components/NewsletterSignupForm'
import { Web3Converter } from '../../components/Web3Converter'
import { Hero } from './01-Hero'

export const ToolsDetail = ({ slug }) => {
  return (
    <>
      <Hero />
      <NewsletterSignupForm paddingTop />

      <Web3Converter
        slug={slug}
        crumbs={[
          { name: 'Home', link: '/' },
          { name: 'Web3 Tools', link: '/web3-tools' }
        ]}
      />
    </>
  )
}
