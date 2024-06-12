import { StoreWritable } from 'effector'

export interface IProduct {
  _id: string
  type: string
  category: string
  collection: string
  price: number
  name: string
  description: string
  characteristics: { [index: string]: string }
  images: string[]
  vendorCode: string
  inStock: string
  isBestseller: boolean
  isNew: boolean
  sizes: ISizes
  popularity: number
  errorMessage?: string
}

export interface ISizes {
  pmd_no: boolean
  pmd_5: boolean
  pmd_10: boolean
  pmd_15: boolean
  pmd_20: boolean
  pmd_25: boolean
  s: boolean
  l: boolean
  m: boolean
  xl: boolean
  xxl: boolean
  БЕЗ: boolean
  ПМД5: boolean
  ПМД10: boolean
  ПМД15: boolean
  ПМД20: boolean
  ПМД25: boolean
}

export interface ISelectedSizes {
  sizes: ISizes
  type: string
  className?: string
}

export interface IBaseEffectProps {
  jwt: string
  id: string
  setSpinner: (arg0: boolean) => void
}

export type UseGoodsByAuth<T> = StoreWritable<T>

export interface IGetGeolocationFx {
  lat: number
  lon: number
}
