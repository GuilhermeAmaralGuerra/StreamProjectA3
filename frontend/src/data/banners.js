import betterCallSaulBanner from '../assets/banners/better-call-saul.webp'
import breakingBadBanner from '../assets/banners/breaking-bad.webp'
import chernobylBanner from '../assets/banners/chernobyl.webp'
import cosmosBanner from '../assets/banners/cosmos.webp'
import fullmetalAlchemistBanner from '../assets/banners/fullmetal-alchemist.webp'
import rupturaBanner from '../assets/banners/ruptura.webp'
import theBoysBanner from '../assets/banners/the-boys.webp'
import theOfficeBanner from '../assets/banners/the-office.webp'

const bannerByKey = {
  'better-call-saul': betterCallSaulBanner,
  'breaking-bad': breakingBadBanner,
  chernobyl: chernobylBanner,
  cosmos: cosmosBanner,
  'fullmetal-alchemist': fullmetalAlchemistBanner,
  ruptura: rupturaBanner,
  'the-boys': theBoysBanner,
  'the-office': theOfficeBanner,
}

const titleToKey = {
  'better call saul': 'better-call-saul',
  'breaking bad': 'breaking-bad',
  chernobil: 'chernobyl',
  chernobyl: 'chernobyl',
  cosmos: 'cosmos',
  'fullmetal alchemist': 'fullmetal-alchemist',
  'fullmetal alchemist brotherhood': 'fullmetal-alchemist',
  ruptura: 'ruptura',
  severance: 'ruptura',
  'the boys': 'the-boys',
  'the office': 'the-office',
}

const normalize = (value = '') =>
  value
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, ' ')
    .trim()

export const getBannerById = (id) => bannerByKey[id] || null

export const getBannerByTitle = (title) => {
  const normalized = normalize(title)
  const key = titleToKey[normalized] || normalized.replace(/\s+/g, '-')
  return bannerByKey[key] || null
}

export const getBannerBackground = (bannerUrl) => {
  if (!bannerUrl) return undefined

  return {
    backgroundImage: `linear-gradient(to bottom, rgba(0, 0, 0, 0), var(--md-sys-color-surface-container)), url(${bannerUrl})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  }
}
