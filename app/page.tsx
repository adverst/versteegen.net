import Link from '@/components/Link'
import siteMetadata from '@/data/siteMetadata'
import InteractiveField from '@/components/InteractiveField'
import { allProjects, allUpdates } from 'contentlayer/generated'
import { formatDate } from 'pliny/utils/formatDate'

const MAX_PROJECTS = 3
const MAX_UPDATES = 5

function sortByDate<T extends { date?: string }>(items: T[]) {
  return [...items].sort((a, b) => {
    const aTime = a.date ? new Date(a.date).getTime() : 0
    const bTime = b.date ? new Date(b.date).getTime() : 0
    return bTime - aTime
  })
}

export default function Page() {
  const projects = sortByDate(allProjects).slice(0, MAX_PROJECTS)
  const updates = sortByDate(allUpdates).slice(0, MAX_UPDATES)

  return (
    <div className="flex flex-col gap-16 pb-16">
      <section className="relative overflow-hidden rounded-3xl border border-black/10 bg-white/70 p-8 shadow-[0_20px_60px_-40px_rgba(15,23,42,0.35)] backdrop-blur md:p-12">
        <div className="pointer-events-none absolute inset-0">
          <InteractiveField />
        </div>
        <div className="relative z-10 flex flex-col gap-8">
          <div className="space-y-4">
            <h1 className="text-4xl leading-tight text-black sm:text-5xl md:text-6xl">
              José Versteegenson
            </h1>
          </div>
          <div className="flex flex-wrap gap-4">
            <Link
              href="/#projects"
              className="inline-flex items-center gap-2 rounded-full bg-black px-6 py-3 text-sm font-semibold uppercase tracking-[0.2em] text-white shadow-lg shadow-black/20 transition hover:-translate-y-0.5 hover:shadow-xl"
            >
              Explore Projects
            </Link>
            <Link
              href="/#updates"
              className="inline-flex items-center gap-2 rounded-full border border-black/20 bg-white/70 px-6 py-3 text-sm font-semibold uppercase tracking-[0.2em] text-black/70 transition hover:-translate-y-0.5 hover:border-black/40 hover:text-black"
            >
              Recent Updates
            </Link>
          </div>
        </div>
      </section>

      <section id="projects" className="space-y-8">
        <div className="flex items-end justify-between gap-6">
          <div className="space-y-3">
            <p className="text-xs font-semibold uppercase tracking-[0.35em] text-black/50">
              Projects
            </p>
            <h2 className="text-3xl text-black md:text-4xl">Projects</h2>
          </div>
          <Link
            href="/projects"
            className="hidden text-xs font-semibold uppercase tracking-[0.3em] text-black/50 hover:text-black md:inline-flex"
          >
            View all
          </Link>
        </div>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {projects.map((project) => (
            <article
              key={project.slug}
              className="group flex h-full flex-col justify-between rounded-2xl border border-black/10 bg-white/80 p-6 shadow-[0_20px_60px_-50px_rgba(15,23,42,0.45)] transition hover:-translate-y-1 hover:border-black/30 hover:shadow-[0_30px_70px_-50px_rgba(15,23,42,0.5)]"
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
                <h3 className="text-2xl text-black">{project.title}</h3>
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
      </section>

      <section id="updates" className="space-y-8">
        <div className="space-y-3">
          <p className="text-xs font-semibold uppercase tracking-[0.35em] text-black/50">
            Updates
          </p>
          <h2 className="text-3xl text-black md:text-4xl">Updates</h2>
        </div>
        <div className="divide-y divide-black/10 rounded-2xl border border-black/10 bg-white/80">
          {updates.map((update) => (
            <article key={update.slug} className="p-6 transition hover:bg-white">
              <div className="flex flex-wrap items-center gap-3 text-xs font-semibold uppercase tracking-[0.2em] text-black/40">
                <span>{formatDate(update.date, siteMetadata.locale)}</span>
                {update.status && (
                  <>
                    <span className="h-1 w-1 rounded-full bg-black/30" />
                    <span>{update.status}</span>
                  </>
                )}
              </div>
              <div className="mt-3 flex flex-col gap-3">
                <Link href={`/updates/${update.slug}`} className="text-2xl text-black">
                  {update.title}
                </Link>
                <p className="text-sm text-black/60">{update.summary}</p>
                {update.tags?.length ? (
                  <div className="flex flex-wrap gap-2 text-xs text-black/50">
                    {update.tags.map((tag) => (
                      <span key={tag} className="rounded-full bg-black/5 px-3 py-1">
                        {tag}
                      </span>
                    ))}
                  </div>
                ) : null}
              </div>
            </article>
          ))}
        </div>
        <Link
          href="/updates"
          className="inline-flex text-xs font-semibold uppercase tracking-[0.3em] text-black/50 hover:text-black"
        >
          View all updates
        </Link>
      </section>
    </div>
  )
}

