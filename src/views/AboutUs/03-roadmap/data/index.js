import Link from 'next/link'

import { Command } from './Command'
import { UnorderedList } from './UnorderedList'

const links = {
  SDK: 'https://docs.neptunemutual.com/sdk/quickstart',
  DISCORD: 'https://discord.com/invite/2qMGTtJtnW',
  BLOG: 'https://neptunemutual.com/blog',
  DOCUMENTATION: 'https://docs.neptunemutual.com/',
  PRIVACY_POLICY: 'https://docs.neptunemutual.com/usage/privacy-policy',
  TERMS_OF_USE: 'https://docs.neptunemutual.com/usage/terms-of-use',
  FAUCET: 'https://faucet.neptunemutual.com/',
  LIGHTPAPER: '/files/lightpaper.v1.pdf',
  TESTNET: 'https://test.neptunemutual.net/',
  CONTACT: 'https://forms.clickup.com/f/6vvfh-4624/UVJHEDAS2T3P6DCFJM'
}

export const data = [
  {
    name: <>The Idea</>,
    Story: () => {
      return (
        <>
          <p>
            Blockchain-based covers have a low claims-to-payout ratio. Existing cover products are unscalable, discretionary, and discriminatory. Smart contract audits do not guarantee security. Attacks on exchanges, metaverses, DApps, and DeFi protocols are increasing and getting more sophisticated.
          </p>
          <p>
            Observing a need in the market for a solid parametric DeFi insurance solution, we decided to launch Neptune Mutual.
          </p>
        </>
      )
    }
  },
  {
    name: <>Product Design</>,
    Story: () => {
      return (
        <>
          <p>
            We designed the protocol with these four key principles:
          </p>

          <UnorderedList items={[
            'Security',
            'Minimizing risk',
            'Scalability',
            'User Experience (UX)'
          ]}
          />

        </>
      )
    }
  },
  {
    name: <>Product MVP</>,
    Story: () => {
      return (
        <>
          <p>
            The Neptune Mutual MVP was developed and deployed on a number of blockchain testnets, including but not limited to Ropsten, Kovan, BSC Testnet, Mumbai, and Fuji.
          </p>
        </>
      )
    }
  },
  {
    name: <>Cover SDK Beta</>,
    Story: () => {
      return (
        <>
          <p>
            Check out the Cover SDK source code on the Neptune Mutual Github
            repository. <a target='_blank' rel='noreferrer noopener nofollow' href={links.SDK}>Read the SDK documentation</a>
            &nbsp;to find out how to get access to cover feature on your own frontend app or backend API.
            Built on Typescript, developers can use the SDK in both frontend and backend environments using any popular framework.
            The SDK is also available as an NPM package.
          </p>

          <Command text='npm install @neptunemutual/sdk' />
        </>
      )
    }
  },
  {
    name: <>Incorporation & Legal</>,
    Story: () => {
      return (
        <p>
          In September 2021, we incorporated legal entities to support the fundraising, development, recruitment, expansion, and operational demand of the Neptune Mutual protocol.
        </p>
      )
    }
  },
  {
    name: <>Fundraising & Team Building</>,
    Story: () => {
      return (
        <>
          <p>
            Neptune Mutual successfully closed its Seed Round backed by industry leaders including Fenbushi and Coinbase Ventures. Soon after, Animoca Brands led the subsequent investment round and has been joined by an impressive list of investors.
          </p>
          <p>
            Neptune Mutual has swiftly expanded from three co-founders to a workforce of over 25 people located in locations all over the globe.
          </p>
        </>
      )
    }
  },
  {
    name: <>Protocol Testnet Launch</>,
    Story: () => {
      return (
        <>
          <p>
            The Neptune Mutual protocol launches on a couple of test networks like Ropsten and Mumbai testnet. Community members participate in the protocol by becoming cover purchasers,  liquidity providers, and consensus witnesses. We develop <a target='_blank' rel='noreferrer' href={links.FAUCET}>Neptune Mutual faucet</a> to provide users with testnet DAI and NPM tokens.
          </p>
          <p>
            <a target='_blank' href='https://faucet.neptunemutual.com/' title='Neptune Mutual Faucet' rel='noreferrer'>View Faucet</a>
            &nbsp;/&nbsp;
            <a target='_blank' href='https://test.neptunemutual.net/' title='Neptune Mutual Testnet' rel='noreferrer'>View Testnet</a>
          </p>
        </>
      )
    }
  },
  {
    name: <>Blocksec Protocol Audit</>,
    Story: () => {
      return (
        <>
          <p>
            When it comes to the validation and auditing of smart contracts, Blocksec is a well-known brand name. We entered into a contract with them to have them perform, over the period of almost two months, a full security review of the smart contracts that serve as the foundation of the Neptune Mutual protocol.
          </p>
          <p>
            <Link href='/security'>View Audit Reports</Link>
          </p>
        </>
      )
    }
  },
  {
    name: <>SDK Audit & Launch</>,
    Story: () => {
      return (
        <>
          <p>
            Neptune Mutual SDK undergoes a strict internal security audit before it gets released as an NPM module.
          </p>

          <p>
            Furthermore, the app, Github, hosting, CI/CD pipelines, DNS, HTTP security, and more is thoroughly audited as well. A proper cyber hygiene is implemented across the team and organization.
          </p>

          <p>
            <a target='_blank' href='https://www.npmjs.com/package/@neptunemutual/sdk' rel='nofollow noopener noreferrer' title='Neptune Mutual SDK on NPM Database'>View on npmjs.com</a>
          </p>
        </>
      )
    }
  },
  {
    name: <>Cyraacs SDK Audit</>,
    Story: () => {
      return (
        <>
          <p>
            The Cyraacs team was brought on board to perform security audit of the Neptune Mutual Typescript SDK.
          </p>
          <p>
            <Link href='/security'>View Audit Reports</Link>
          </p>
        </>
      )
    }
  },
  {
    name: <>Diversified Pools (v2)</>,
    current: false,
    Story: () => {
      return (
        <>
          <p>
            We rolled up our sleeves and completed the diversified insurance pool feature that was initially scheduled to be released in 2023 as version 2.
          </p>
          <p>
            With this upgrade, cover pools can now be integrated into numerous baskets for enhanced capital efficiency and increased returns for liquidity providers. Due to the leverage element, diversified pools, unlike dedicated pools, do not have 1:1 liquidity.
          </p>
          <p>
            <a target='_blank' href='https://test.neptunemutual.net/' rel='noreferrer'>View Testnet</a>
          </p>
        </>
      )
    }
  },
  {
    name: <>Open Zeppelin Audit</>,
    Story: () => {
      return (
        <>
          <p>We have always prioritized security from the beginning. We studied a number of audit firms, their adoption, and track records when looking for a new smart contract audit partner. The contribution of OpenZeppelin to open source has helped the whole Ethereum community, and their support paves the way for a more secure DeFi industry. We chose OpenZeppelin because of their track record, outstanding reputation, and commitment to the Ethereum ecosystem.</p>
          <p>
            <Link href='/security'>View Audit Reports</Link>
          </p>
        </>
      )
    }
  },
  {
    name: <>Cyraacs Pentest</>,
    Story: () => {
      return (
        <>
          <p>
            Following the end of our Typescript SDK audit with Cyraacs, we contacted them to obtain grey-box and black-box penetration testing service on publicly-hosted instances of our frontend application and API backends.
          </p>
          <p>
            <Link href='/security'>View Audit Reports</Link>
          </p>
        </>
      )
    }
  },
  {
    name: <>Marketplace Launch</>,
    current: false,
    Story: () => {
      return (
        <>
          <p>
            The Neptune Mutual protocol was launched on the Ethereum mainnet after the completion of an extensive internal security audit.
          </p>
          <p>
            <a target='_blank' href='https://app.neptunemutual.net' rel='noreferrer'>View Marketplace</a>
          </p>
        </>
      )
    }
  },
  {
    name: <>Prime dApps Diversified Insurance Cover</>,
    current: false,
    Story: () => {
      return (
        <>
          <p>
            Neptune Mutual announces "Prime dApps," a diversified cover pool that includes industry-leading DeFi protocols such as Uniswap, Aave, Balancer, Curve, Gnosis Safe, MakerDAO, and Synthetix.
          </p>
          <p>
            <a target='_blank' href='https://app.neptunemutual.net/covers/prime' title='View Prime dApps Diversified Insurance Cover Pool' rel='noreferrer'>View Prime dApps</a>
          </p>
        </>
      )
    }
  },
  {
    name: <>Discount Coupons</>,
    current: false,
    Story: () => {
      return (
        <>
          <p>
            Neptune Mutual announced a discount coupon feature on Twitter, via which policyholders are eligible to earn 100% of the USDC stablecoin protocol fee.
          </p>

          <p>
            <a target='_blank' href='https://twitter.com/neptunemutual/status/1594910920228360192' rel='nofollow noopener noreferrer' title='View Announcement in Twitter'>View Tweet</a>
          </p>
        </>
      )
    }
  },
  {
    name: <>Binance Dedicated Cover</>,
    current: false,
    Story: () => {
      return (
        <>
          <p>
            We listed Binance, one of the biggest and most popular exchange, on our marketplace. Binance exchange custody has been deployed as a dedicated standalone cover. A dedicated cover pool always has at least 1:1 or more liquidity available than policies underwritten.
          </p>
          <p>
            <a target='_blank' href='https://app.neptunemutual.net/covers/binance/purchase' rel='noreferrer'>Purchase Binance Policy</a>
          </p>
        </>
      )
    }
  },
  {
    name: <>OKX Dedicated Cover</>,
    current: true,
    Story: () => {
      return (
        <>
          <p>
            We formed strategic alliance with OKX, one of the most popular cryptocurrency exchanges worldwide.
            To serve the OKX community, we've previously implemented support for the OKX wallet and now we have a dedicated standalone
            cover pool for OKX exchange custody. This dedicated cover pool will provide OKX policyholders instant payouts
            if the cover parameters are triggered and resolved.
          </p>
          <p>
            Moreover, both the Neptune Mutual and OKX teams are working diligently
            to further the adoption of decentralized insurance.
          </p>
          <p>
            <a target='_blank' href='https://app.neptunemutual.net/covers/okx/purchase' rel='noreferrer'>Purchase OKX Policy</a>
          </p>
        </>
      )
    }
  },
  {
    name: <>Cover Pool Announcement</>,
    current: false,
    Story: () => {
      return (
        <p>
          There are more diversified and dedicated cover pools on the horizon. As we go ahead, we will make an announcement on the listing and availability of these cover pools. Please stay tuned.
        </p>
      )
    }
  },
  {
    name: <>Cashback Announcement</>,
    current: false,
    Story: () => {
      return (
        <p>
          A few of additional cashback programs will be announced to expand and grow our community and encourage people to engage with our protocol. More information will be provided once these programs are launched.
        </p>
      )
    }
  },
  {
    name: <>Bug Bounty Program</>,
    current: false,
    Story: () => {
      return (
        <>
          <p>
            We are presently putting the final touches to the guidelines for our bug bounty program, and as soon as they are finished, they will be published on the "Grants and Bounties" page of our website. Hang tight.
          </p>
          <p>
            <Link href='/grants-and-bounties' title='View Grants and Bounties Page'>View Grants and Bounties</Link>
          </p>
        </>
      )
    }
  },
  {
    name: <>Marketplace Launch</>,
    current: false,
    Story: () => {
      return (
        <p>
          To process transactions with smaller amounts and lower gas fees, Neptune Mutual protocol and marketplace will be launched on additional blockchain network(s). Please stay tuned.
        </p>
      )
    }
  },
  {
    name: <>Penetration Test</>,
    current: false,
    Story: () => {
      return (
        <>
          <p>
            We will engage additional cybersecurity partners to conduct a thorough penetration test on our application's frontend and backend services
            routinely to analyze and assess its security posture.
          </p>
          <p>
            <Link title='Security' href='/security'>View Previous Penetration Tests</Link>
          </p>
        </>
      )
    }
  },
  {
    name: <>TGE</>,
    current: false,
    Story: () => {
      return (
        <p>
          The NPM token will be launched on Ethereum as part of the token generation event. We will also upgrade the protocol to use NPM instead of PoT tokens (Proof of Authority Token).
        </p>
      )
    }
  },
  {
    name: <>Decentralized Exchange Listing</>,
    current: false,
    Story: () => {
      return (
        <p>
          The Neptune Mutual token will be made available on decentralized exchanges.
        </p>
      )
    }
  },
  {
    name: <>Ecosystem and Integration Grant</>,
    current: false,
    Story: () => {
      return (
        <p>
          We will announce a grant programme in which protocols that integrate with the Neptune Mutual protocol and promote our adoption will be eligible for ecosystem and integration incentives.
        </p>
      )
    }
  },
  {
    name: <>Ambassador Program</>,
    current: false,
    Story: () => {
      return (
        <p>
          Full information will be made accessible once the program is launched.
        </p>
      )
    }
  },
  {
    name: <>Referral Portal</>,
    current: false,
    Story: () => {
      return (
        <p>
          A referral portal will be built to allow the community to generate vouchers and promo coupons in order to collect protocol fees as cashback. This site will also allow users to monitor and track their rewards.
        </p>
      )
    }
  }, {
    name: <>POD Staking Pools</>,
    current: false,
    Story: () => {
      return (
        <p>
          Neptune Mutual will introduce POD staking pools, allowing community members to get rewards via staking Proof of Deposit tokens.
        </p>
      )
    }
  },
  {
    name: <>Bond Pool</>,
    current: false,
    Story: () => {
      return (
        <p>
          Neptune Mutual will launch Bond Pool with our partner(s) to bootstrap liquidity for cover pools.
        </p>
      )
    }
  },
  {
    name: <>Staking Pools</>,
    current: false,
    Story: () => {
      return (
        <p>
          Neptune Mutual will deploy staking pools in which the community will be rewarded for staking NPM tokens.
        </p>
      )
    }
  },
  {
    name: <>Product Listing</>,
    current: false,
    Story: () => {
      return (
        <p>
          More diversified and dedicated cover pools will be added to the Neptune Mutual marketplace.
        </p>
      )
    }
  },
  {
    name: <>To Be Announced</>,
    Story: () => {
      return (
        <p>
          As the industry evolves and matures further, Neptune Mutual creates even more products, apps, and services to remain relevant in the space and continuously innovate.
        </p>
      )
    }
  }
]
