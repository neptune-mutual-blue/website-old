export const data = [
  {
    title: 'HOME',
    href: '#'
  },
  {
    title: 'BLOG',
    href: '#'
  },
  {
    title: 'CAREERS',
    href: '#'
  },
  {
    title: 'RESOURCES',
    children: [
      {
        type: 'section',
        title: 'RESOURCES',
        links: [
          { title: 'EXPLORE_MARKETPLACE', href: '#', description: 'EXPLORE_MARKETPLACE_DESC', icon: 'bank' },
          { title: 'BLOG_AND_PRESS_ROOM', href: '#', description: 'BLOG_AND_PRESS_ROOM_DESC', icon: 'edit-03' },
          { title: 'ECOSYSTEM', href: '#', description: 'ECOSYSTEM_DESC', icon: 'database-01' },
          { title: 'DOCUMENTATION', href: '#', description: 'DOCUMENTATION_DESC', icon: 'file-code-01' },
          { title: 'CONTACT', href: '#', description: 'CONTACT_DESC', icon: 'book-closed' }
        ]
      },
      {
        type: 'section',
        title: 'COMPANY',
        links: [
          { title: 'ABOUT_US', href: '#', description: 'ABOUT_US_DESC', icon: 'flag-06' },
          { title: 'GRANTS_AND_BOUNTIES', href: '#', description: 'GRANTS_AND_BOUNTIES_DESC', icon: 'stars-02' },
          { title: 'CAREERS', href: '#', description: 'CAREERS_DESC', icon: 'users-01' },
          { title: 'SECURITY', href: '#', description: 'SECURITY_DESC', icon: 'glasses-02' },
          { title: 'LEGAL', href: '#', description: 'LEGAL_DESC', icon: 'folder' }
        ]
      },
      {
        type: 'videos-section',
        title: 'From our Youtube Channel',
        videos: [
          { title: 'How to Purchase Cover Policy?', href: '#', description: 'Learn how you can purchase policy and reduce your risk exposure', video_link: 'https://example.com', thumbnail: 'https://via.placeholder.com/176x104' },
          { title: 'How to Provide Liquidity?', href: '#', description: 'Learn how you can benefit from pooling the cover capital together with other users.', video_link: 'https://example.com', thumbnail: 'https://via.placeholder.com/176x104' },
          { title: 'Reporting an Incident', href: '#', description: 'how to report an incident when you believe a hack meets the parameters of the cover policy of the project in question.', video_link: 'https://example.com', thumbnail: 'https://via.placeholder.com/176x104' }
        ]
      }
    ]
  }
]
