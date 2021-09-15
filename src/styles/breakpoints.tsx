import { hideAt } from '@styles/responsive'
import {
  RESPONSIVE_DESKTOP,
  RESPONSIVE_DESKTOP_L,
  RESPONSIVE_LAPTOP,
  RESPONSIVE_LAPTOP_L,
  RESPONSIVE_MOBILE_L,
  RESPONSIVE_MOBILE_M,
  RESPONSIVE_MOBILE_S,
  RESPONSIVE_TABLET
} from '@styles/CONSTANTS'

export const MobileSmallAndDown = hideAt({ min: RESPONSIVE_MOBILE_S })
export const MobileMediumAndDown = hideAt({ min: RESPONSIVE_MOBILE_M })
export const MobileLargeAndDown = hideAt({ min: RESPONSIVE_MOBILE_L })
export const MobileOnly = hideAt({ max: RESPONSIVE_MOBILE_S, min: RESPONSIVE_TABLET })
export const TabletAndDown = hideAt({ min: RESPONSIVE_TABLET })
export const TabletAndUp = hideAt({ max: RESPONSIVE_TABLET })
export const TabletOnly = hideAt({ max: RESPONSIVE_TABLET, min: RESPONSIVE_LAPTOP })
export const LaptopAndDown = hideAt({ min: RESPONSIVE_LAPTOP })
export const LaptopAndUp = hideAt({ max: RESPONSIVE_LAPTOP })
export const LaptopOnly = hideAt({ max: RESPONSIVE_LAPTOP, min: RESPONSIVE_LAPTOP_L })
export const LaptopLargeAndDown = hideAt({ min: RESPONSIVE_LAPTOP_L })
export const LaptopLargeAndUp = hideAt({ max: RESPONSIVE_LAPTOP_L })
export const LaptopLargeOnly = hideAt({ max: RESPONSIVE_LAPTOP_L, min: RESPONSIVE_DESKTOP })
export const DesktopAndDown = hideAt({ min: RESPONSIVE_DESKTOP })
export const DesktopAndUp = hideAt({ max: RESPONSIVE_DESKTOP })
export const DesktopOnly = hideAt({ max: RESPONSIVE_DESKTOP, min: RESPONSIVE_DESKTOP_L })
export const DesktopLargeAndUp = hideAt({ max: RESPONSIVE_DESKTOP_L })
