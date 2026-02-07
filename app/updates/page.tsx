import Link from '@/components/Link'
import siteMetadata from '@/data/siteMetadata'
import { allUpdates } from 'contentlayer/generated'
import { formatDate } from 'pliny/utils/formatDate'
import { genPageMetadata } from 'app/seo'

export const metadata = genPageMetadata({ title: 'Updates' })

export default function UpdatesPage() {
  const updates = [...allUpdates].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  )

  return (
    <div className="space-y-10 pb-16">
      <header className="space-y-3">
        <p className="text-xs font-semibold uppercase tracking-[0.35em] text-black/50">
          Updates
        </p>
        <h1 className="text-4xl text-black md:text-5xl">All Updates</h1>
        <p className="max-w-2xl text-black/60">
          A continuous log of progress, experiments, and shipped ideas.
        </p>
      </header>

      <div className="divide-y divide-black/10 rounded-2xl border border-black/10 bg-white/80">
        {updates.map((update) => (
          <article key={update.slug} className="p-6">
            <div className="flex flex-wrap items-center gap-3 text-xs font-semibold uppercase tracking-[0.2em] text-black/40">
              <span>{formatDate(update.date, siteMetadata.locale)}</span>
              {update.status && (
                <>
                  <span className="h-1 w-1 rounded-full bg-black/30" />
                  <span>{update.status}</span>
                </>
              )}
            </div>
            <div className="mt-3 space-y-3">
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
    </div>
  )
}
