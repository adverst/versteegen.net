import { notFound } from 'next/navigation'
import { allUpdates } from 'contentlayer/generated'
import { MDXLayoutRenderer } from 'pliny/mdx-components'
import { components } from '@/components/MDXComponents'
import siteMetadata from '@/data/siteMetadata'
import { formatDate } from 'pliny/utils/formatDate'
import Link from '@/components/Link'

type PageProps = {
  params: Promise<{ slug: string[] }>
}

export default async function UpdateDetailPage({ params }: PageProps) {
  const { slug: slugParts } = await params
  const slug = slugParts?.join('/')
  const update = allUpdates.find((item) => item.slug === slug)

  if (!update) {
    notFound()
  }

  return (
    <article className="space-y-8 pb-16">
      <header className="space-y-4">
        <div className="flex flex-wrap items-center gap-3 text-xs font-semibold uppercase tracking-[0.2em] text-black/40">
          <span>{formatDate(update.date, siteMetadata.locale)}</span>
          {update.status && (
            <>
              <span className="h-1 w-1 rounded-full bg-black/30" />
              <span>{update.status}</span>
            </>
          )}
        </div>
        <h1 className="text-4xl text-black md:text-5xl">{update.title}</h1>
        <p className="max-w-2xl text-black/60">{update.summary}</p>
        <div className="flex flex-wrap gap-3 text-xs font-semibold uppercase tracking-[0.2em] text-black/60">
          <Link href="/updates" className="hover:text-black">
            Back to updates
          </Link>
        </div>
      </header>
      <div className="prose max-w-none prose-p:text-black/70 prose-a:text-black">
        <MDXLayoutRenderer code={update.body.code} components={components} toc={update.toc} />
      </div>
    </article>
  )
}
