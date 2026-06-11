import { HeroSection } from '../../../components/HeroSection'
import { siteContent } from '../../../data/siteContent'

export function Hero() {
  return <HeroSection content={siteContent.hero} />
}