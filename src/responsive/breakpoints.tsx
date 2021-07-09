import { hideAt } from './responsive-component'
import settings from '../settings'

const devices = settings.styles.devices

export const MobileSmallAndDown = hideAt({ min: devices.mobileS })
export const MobileMediumAndDown = hideAt({ min: devices.mobileM })
export const MobileLargeAndDown = hideAt({ min: devices.mobileL })
export const MobileOnly = hideAt({ max: devices.mobileS, min: devices.tablet })
export const TabletAndDown = hideAt({ min: devices.tablet })
export const TabletAndUp = hideAt({ max: devices.tablet })
export const TabletOnly = hideAt({ max: devices.tablet, min: devices.laptop })
export const LaptopAndDown = hideAt({ min: devices.laptop })
export const LaptopAndUp = hideAt({ max: devices.laptop })
export const LaptopOnly = hideAt({ max: devices.laptop, min: devices.laptopL })
export const LaptopLargeAndDown = hideAt({ min: devices.laptopL })
export const LaptopLargeAndUp = hideAt({ max: devices.laptopL })
export const LaptopLargeOnly = hideAt({ max: devices.laptopL, min: devices.desktop })
export const DesktopAndDown = hideAt({ min: devices.desktop })
export const DesktopAndUp = hideAt({ max: devices.desktop })
export const DesktopOnly = hideAt({ max: devices.desktop, min: devices.desktopL })
export const DesktopLargeAndUp = hideAt({ max: devices.desktopL })
