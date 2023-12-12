import { ExternalLink } from '@/components/external-link'
import GithubIcon from '@/assets/icons/social-github.svg'
import InIcon from '@/assets/icons/social-in.svg'

const css = {
  wrapper: 'flex justify-center items-center gap-x-10',
  link: 'relative flex items-center justify-center rounded-full group',
  gradient:
    'absolute -inset-1.5 rounded-full bg-body shadow-xl transition-all group-hover:-inset-2.5',
  icon: 'relative w-8 h-8 group-hover:rotate-12 transition-all',
}

const socialLinks = [
  {
    Icon: InIcon,
    url: 'https://www.linkedin.com/in/jozefini',
    name: 'LinkedIn',
  },
  {
    Icon: GithubIcon,
    url: 'https://www.github.com/jozefini',
    name: 'GitHub',
  },
]

export function SocialLinks() {
  return (
    <div className={css.wrapper}>
      {socialLinks.map(({ Icon, url, name }) => (
        <ExternalLink
          key={url}
          className={css.link}
          href={url}
          aria-label={name}
        >
          <div className={css.gradient} />
          <Icon className={css.icon} />
        </ExternalLink>
      ))}
    </div>
  )
}
