import { NewsletterSignupForm } from '../../components/NewsletterSignupForm'
import { Web3Converter } from '../../components/Web3Converter'
import { Hero } from './01-Hero'

const getTitle = slug => {
  let _title = {}

  switch (slug) {
    case 'string-to-bytes32':
      _title = 'String to Bytes32 Converter Online'
      break

    case 'number-to-bytes32':
      _title = 'Number to Bytes32 Converter Online'
      break

    case 'bytes32-to-string':
      _title = 'Bytes32 to String Converter Online'
      break

    case 'bytes32-to-number':
      _title = 'Bytes32 to Number Converter Online'
      break

    default:
      _title = 'String to Bytes32 Converter Online'
      break
  }

  return _title
}
export const ToolsDetail = ({ slug }) => {
  return (
    <>
      <Hero title={getTitle(slug)} />

      <Web3Converter
        slug={slug}
        crumbs={[
          { name: 'Home', link: '/' },
          { name: 'Web3 Tools', link: '/web3-tools' }
        ]}
      />

      <NewsletterSignupForm paddingTop />
    </>
  )
}
