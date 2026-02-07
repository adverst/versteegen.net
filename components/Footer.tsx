import siteMetadata from '@/data/siteMetadata'
import SocialIcon from '@/components/social-icons'

export default function Footer() {
  return (
    <footer id="contact" className="mt-16 border-t border-black/10 py-10">
      <div className="flex flex-col items-center gap-6 text-center">
        <div className="text-xs font-semibold uppercase tracking-[0.3em] text-black/40">
          Find Me
        </div>
        <div className="flex items-center gap-6">
          <SocialIcon kind="github" href={siteMetadata.github} size={6} />
          <SocialIcon kind="linkedin" href={siteMetadata.linkedin} size={6} />
          <SocialIcon kind="x" href={siteMetadata.x} size={6} />
        </div>
        <div className="text-xs text-black/45">
          © {new Date().getFullYear()} {siteMetadata.author}
        </div>
      </div>
    </footer>
  )
}
