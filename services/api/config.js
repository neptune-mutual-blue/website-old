import path from 'path'

import { env } from '../environment'

const allowed = ['audits', 'blog', 'ecosystems', 'news', 'pages', 'pressroom', 'programs', 'vacancies', 'videos']

const root = path.join(process.cwd(), 'public', 'cache')

const config = { allowed, root }

// @todo: delete this
const getApiHeaders = () => {
  return { Authorization: `Bearer ${env.websiteApiAuthToken}` }
}

export { config, getApiHeaders }
