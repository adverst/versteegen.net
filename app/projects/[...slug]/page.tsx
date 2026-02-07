import { notFound } from 'next/navigation'
import { allProjects } from 'contentlayer/generated'
import { MDXLayoutRenderer } from 'pliny/mdx-components'
import { components } from '@/components/MDXComponents'
import siteMetadata from '@/data/siteMetadata'
import { formatDate } from 'pliny/utils/formatDate'
import Link from '@/components/Link'

type PageProps = {
  params: Promise<{ slug: string[] }>
}

export default async function ProjectDetailPage({ params }: PageProps) {
  const { slug: slugParts } = await params
  const slug = slugParts?.join('/')
  const project = allProjects.find((item) => item.slug === slug)

  if (!project) {
    notFound()
  }

  return (
    <article className="space-y-8 pb-16">
      <header className="space-y-4">
        <div className="flex flex-wrap items-center gap-3 text-xs font-semibold uppercase tracking-[0.2em] text-black/40">
          <span>{project.status || 'In progress'}</span>
          {project.date && (
            <>
              <span className="h-1 w-1 rounded-full bg-black/30" />
              <span>{formatDate(project.date, siteMetadata.locale)}</span>
            </>
          )}
        </div>
        <h1 className="text-4xl text-black md:text-5xl">{project.title}</h1>
        <p className="max-w-2xl text-black/60">{project.summary}</p>
        <div className="flex flex-wrap gap-3 text-xs font-semibold uppercase tracking-[0.2em] text-black/60">
          {project.links?.live && (
            <Link href={project.links.live} className="hover:text-black">
              Live
            </Link>
          )}
          {project.links?.repo && (
            <Link href={project.links.repo} className="hover:text-black">
              Repo
            </Link>
          )}
          <Link href="/projects" className="hover:text-black">
            Back to projects
          </Link>
        </div>
      </header>
      <div className="prose max-w-none prose-p:text-black/70 prose-a:text-black">
        <MDXLayoutRenderer code={project.body.code} components={components} toc={project.toc} />
      </div>
    </article>
  )
}
