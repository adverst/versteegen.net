import headerNavLinks from '@/data/headerNavLinks'
import Link from './Link'
import MobileNav from './MobileNav'

const Header = () => {
  return (
    <header className="flex items-center justify-between py-8">
      <Link href="/" aria-label="José Versteegenson">
        <div className="group flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-full border border-black/10 bg-white/80 text-xs font-semibold uppercase tracking-[0.2em] text-black shadow-sm transition group-hover:-translate-y-0.5 group-hover:shadow-md">
            JV
          </div>
          <div className="hidden text-lg font-semibold tracking-tight text-black sm:block">
            José Versteegenson
          </div>
        </div>
      </Link>
      <div className="flex items-center gap-6">
        <nav className="hidden items-center gap-8 text-xs font-semibold uppercase tracking-[0.28em] text-black/60 md:flex">
          {headerNavLinks.map((link) => (
            <Link key={link.title} href={link.href} className="hover:text-black">
              {link.title}
            </Link>
          ))}
        </nav>
        <MobileNav />
      </div>
    </header>
  )
}

export default Header

