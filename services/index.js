import {
  getAudits,
  getAuditSlugs,
  getSingleAudit
} from './api/audits'
import {
  getAllBlogPosts,
  getBlogPaginatedData,
  getBlogPostTagDataBySlug,
  getBlogPostTagsData,
  getFeaturedPosts,
  getLatestBlogPosts,
  getPostsSlugs,
  getRelatedBlogPosts,
  getSinglePost
} from './api/blog'
import { getEcosystems } from './api/ecosystems'
import { getNews } from './api/news'
import {
  getPages,
  getPageSlugs,
  getSinglePage
} from './api/pages'
import * as pressroom from './api/pressroom'
import {
  getPrograms,
  getProgramSlugs,
  getSingleProgram
} from './api/programs'
import {
  getSingleVacancy,
  getVacancies,
  getVacancySlugs
} from './api/vacancies'
import { getVideos } from './api/videos'

export const services = {
  pressroom,
  getAllBlogPosts,
  getLatestBlogPosts,
  getRelatedBlogPosts,
  getPostsSlugs,
  getBlogPaginatedData,
  getBlogPostTagsData,
  getBlogPostTagDataBySlug,
  getSinglePost,
  getFeaturedPosts,
  getNews,
  getVideos,
  getEcosystems,
  getAudits,
  getAuditSlugs,
  getSingleAudit,
  getPrograms,
  getProgramSlugs,
  getSingleProgram,
  getPages,
  getPageSlugs,
  getSinglePage,
  getVacancies,
  getVacancySlugs,
  getSingleVacancy
}
