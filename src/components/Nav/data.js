export const data = [
  {
    title: 'HOME',
    href: '/'
  },
  {
    title: 'BLOG',
    href: '/blog'
  },
  {
    title: 'CAREERS',
    href: '/careers'
  },
  {
    title: 'RESOURCES',
    children: [
      {
        type: 'section',
        title: 'RESOURCES',
        links: [
          { title: 'EXPLORE_MARKETPLACE', href: 'https://app.neptunemutual.com', description: 'EXPLORE_MARKETPLACE_DESC', icon: 'bank', isExternal: true },
          { title: 'BLOG_AND_PRESS_ROOM', href: '/blog', description: 'BLOG_AND_PRESS_ROOM_DESC', icon: 'edit-03' },
          { title: 'ECOSYSTEM', href: '/ecosystem', description: 'ECOSYSTEM_DESC', icon: 'database-01' },
          { title: 'DOCUMENTATION', href: 'https://docs.neptunemutual.com', description: 'DOCUMENTATION_DESC', icon: 'file-code-01', isExternal: true },
          { title: 'CONTACT', href: '/contact', description: 'CONTACT_DESC', icon: 'book-closed' }
        ]
      },
      {
        type: 'section',
        title: 'COMPANY',
        links: [
          { title: 'ABOUT_US', href: '/about', description: 'ABOUT_US_DESC', icon: 'flag-06' },
          { title: 'GRANTS_AND_BOUNTIES', href: '/grants', description: 'GRANTS_AND_BOUNTIES_DESC', icon: 'stars-02' },
          { title: 'CAREERS', href: '/careers', description: 'CAREERS_DESC', icon: 'users-01', badge: 'We\'re Hiring!' },
          { title: 'SECURITY', href: '/security', description: 'SECURITY_DESC', icon: 'glasses-02' },
          { title: 'Policy', href: '#', description: 'LEGAL_DESC', icon: 'folder' }
        ]
      },
      {
        type: 'videos-section',
        title: 'FROM_YOUTUBE',
        more: {
          title: 'ALL_VIDEO_TUTS',
          href: 'https://youtube.com/neptune-mutual'
        }
      }
    ]
  }
]
