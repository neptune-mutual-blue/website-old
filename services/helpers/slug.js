
const getSlug = (title) => {
  return title.toLowerCase().replace(/ /g, '-').replace(/[-]+/g, '-').replace(/[^\w-]+/g, '')
}

export { getSlug }
