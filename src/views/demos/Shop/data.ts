import type { CategoryType, FeatureType } from '@/types'
import {
  bagIcon,
  bookIcon,
  electronicIcon,
  fashionIcon,
  gameIcon,
  mobileIcon
} from '@/assets/data/icons'
import { BIconFire, BIconHeadset, BIconLightningChargeFill, BIconRadar } from 'bootstrap-icons-vue'

export const categories: CategoryType[] = [
  {
    id: '1',
    name: 'Super Foods',
    icon: fashionIcon
  },
  {
    id: '2',
    name: 'Household Care Products',
    icon: electronicIcon
  },
  {
    id: '3',
    name: 'Food Supplements',
    icon: gameIcon
  }
]

export type ProductFeatureType = {
  variant: string
} & FeatureType

export const features: ProductFeatureType[] = [
  {
    title: 'Fast and reliable delivery',
    description: 'Ensure timely and dependable delivery services to meet customer expectations.',
    icon: BIconLightningChargeFill,
    variant: 'info'
  },
  {
    title: 'Package tracking',
    description:
      'Offer real-time tracking information, so customers can monitor the status of their shipments.',
    icon: BIconRadar,
    variant: 'warning'
  },
  {
    title: 'Returns and exchanges',
    description:
      'Clearly outline your return and exchange policy, making it easy for customers to initiate returns.',
    icon: BIconFire,
    variant: 'danger '
  },
  {
    title: 'Customer support',
    description:
      'Provide responsive customer support to address shipping-related queries and issues.',
    icon: BIconHeadset,
    variant: 'primary'
  }
]
