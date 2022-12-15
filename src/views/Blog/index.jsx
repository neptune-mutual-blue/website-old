import { Hero } from './01-hero'
import { FeaturedPosts } from './02-featured-posts'
import { RecentVideos } from './03-videos'
import { RecentPosts } from './04-RecentPosts'
import { NewsletterSignupForm } from '../../components/NewsletterSignupForm'

export const Blog = ({ featuredPosts, blogPosts, totalPages, page, tag }) => {
  return (
    <>
      <Hero />

      <FeaturedPosts posts={featuredPosts} />

      <RecentVideos />

      <RecentPosts
        blogPosts={blogPosts}
        totalPages={totalPages}
        page={page}
        tag={tag}
      />

      <NewsletterSignupForm showRSS />
    </>
  )
}
