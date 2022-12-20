import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { useTranslation } from 'react-i18next'

import { services } from '../../services'
import {
  getCanonical,
  getFQDN
} from '../../src/helpers'
import { Careers } from '../../src/views/Careers'

export async function getStaticProps ({ locale }) {
  const s = await serverSideTranslations(locale, ['common', 'careers'])

  return {
    props: {
      ...(s),
      vacancies: await services.getVacancies(),
      videos: await services.getVideos(),
      pages: await services.getPages(),
      headerStyle: 'colored'
      // Will be passed to the page component as props
    }
  }
}

export default function CareersPage (props) {
  const { t } = useTranslation('careers')
  const router = useRouter()

  return (
    <>
      <Head>
        <title>{t('META_TITLE')}</title>
        <meta name='description' content={t('META_DESCRIPTION')} />
        <link rel='canonical' href={getCanonical(router)} />
        <link rel='icon' href='/favicon.ico' />

        <meta property='og:type' content='website' />
        <meta property='og:title' content={t('Careers / Neptune Mutual')} />
        <meta property='og:description' content={t('Neptune Mutual is an excellent place to work if you are interested in the web3 industry. Check out the job openings that are currently available.')} />
        <meta property='og:image' content={getFQDN('/assets/images/meta/og/careers.png')} />
        <meta property='og:locale' content={router.locale} />
        <meta property='og:url' content={router.asPath} />
        <meta property='twitter:site' content='@neptunemutual' />
        <meta property='twitter:creator' content='@neptunemutual' />
        <meta property='twitter:card' content='summary_large_image' />
        <meta property='twitter:description' content={t('Neptune Mutual is an excellent place to work if you are interested in the web3 industry. Check out the job openings that are currently available.')} />
        <meta property='twitter:title' content={t('Careers / Neptune Mutual')} />
        <meta property='twitter:image' content={getFQDN('/assets/images/meta/og/careers.png')} />
        <meta property='twitter:image:alt' content={t('Neptune Mutual Careers Open Graph Banner')} />
      </Head>

      <main>

        <Careers vacancies={props.vacancies} />

      </main>

      <footer />
    </>
  )
}
