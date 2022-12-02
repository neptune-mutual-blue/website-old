import Head from 'next/head'

import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { services } from '../../services'
import Link from 'next/link'

export async function getStaticProps ({ locale }) {
  const s = await serverSideTranslations(locale, ['common', 'careers'])

  return {
    props: {
      ...(s),
      vacancies: await services.getVacancies(),
      videos: await services.getVideos(),
      headerStyle: 'colored'
      // Will be passed to the page component as props
    }
  }
}

export default function CareersPage (props) {
  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name='description' content='Generated by create next app' />
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <main>

        {props.vacancies.map(vacancy => {
          return (
            <div key={vacancy.id}>
              <Link href={`/careers/${vacancy.slug}`}>{vacancy.title}</Link>
            </div>
          )
        })}

      </main>

      <footer />
    </>
  )
}
