import Link from '@/components/Link'
import siteMetadata from '@/data/siteMetadata'
import { allProjects } from 'contentlayer/generated'
import { formatDate } from 'pliny/utils/formatDate'
import { genPageMetadata } from 'app/seo'

export const metadata = genPageMetadata({ title: 'Projects' })

export default function ProjectsPage() {
  const projects = [...allProjects].sort((a, b) => {
    const aTime = a.date ? new Date(a.date).getTime() : 0
    const bTime = b.date ? new Date(b.date).getTime() : 0
    return bTime - aTime
  })

  return (
    <div className="space-y-10 pb-16">
      <header className="space-y-3">
        <p className="text-xs font-semibold uppercase tracking-[0.35em] text-black/50">
          Projects
        </p>
        <h1 className="text-4xl text-black md:text-5xl">All Projects</h1>
      </header>

      <div className="grid gap-6 md:grid-cols-2">
        {projects.map((project) => (
          <article
            key={project.slug}
            className="flex flex-col justify-between rounded-2xl border border-black/10 bg-white/80 p-6 shadow-[0_20px_60px_-50px_rgba(15,23,42,0.45)]"
          >
            <div className="space-y-4">
              <div className="flex flex-wrap items-center gap-3 text-xs font-semibold uppercase tracking-[0.2em] text-black/40">
                <span>{project.status || 'In progress'}</span>
                {project.date && (
                  <>
                    <span className="h-1 w-1 rounded-full bg-black/30" />
                    <span>{formatDate(project.date, siteMetadata.locale)}</span>
                  </>
                )}
              </div>
              <h2 className="text-2xl text-black">{project.title}</h2>
              <p className="text-sm text-black/60">{project.summary}</p>
              {project.tags?.length ? (
                <div className="flex flex-wrap gap-2 text-xs text-black/50">
                  {project.tags.map((tag) => (
                    <span key={tag} className="rounded-full bg-black/5 px-3 py-1">
                      {tag}
                    </span>
                  ))}
                </div>
              ) : null}
            </div>
            <div className="mt-6 flex flex-wrap gap-3 text-xs font-semibold uppercase tracking-[0.2em] text-black/60">
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
              <Link href={`/projects/${project.slug}`} className="hover:text-black">
                Details
              </Link>
            </div>
          </article>
        ))}
      </div>
    </div>
  )
}

