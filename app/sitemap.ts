import { MetadataRoute } from 'next'
import { allProjects, allUpdates } from 'contentlayer/generated'
import siteMetadata from '@/data/siteMetadata'

export const dynamic = 'force-static'

export default function sitemap(): MetadataRoute.Sitemap {
  const siteUrl = siteMetadata.siteUrl

  const projectRoutes = allProjects.map((project) => ({
    url: `${siteUrl}/projects/${project.slug}`,
    lastModified: project.date || new Date().toISOString().split('T')[0],
  }))

  const updateRoutes = allUpdates.map((update) => ({
    url: `${siteUrl}/updates/${update.slug}`,
    lastModified: update.date,
  }))

  const routes = ['', 'projects', 'updates'].map((route) => ({
    url: `${siteUrl}/${route}`,
    lastModified: new Date().toISOString().split('T')[0],
  }))

  return [...routes, ...projectRoutes, ...updateRoutes]
}
