import React from 'react'
import {
  MobileSmallAndDown, MobileMediumAndDown, MobileLargeAndDown,
  MobileOnly, TabletAndDown, TabletAndUp, TabletOnly,
  LaptopAndDown, LaptopAndUp, LaptopOnly, LaptopLargeAndDown,
  LaptopLargeAndUp, LaptopLargeOnly, DesktopAndDown,
  DesktopAndUp, DesktopOnly, DesktopLargeAndUp
} from '@src/responsive/breakpoints'

/* eslint-disable  @typescript-eslint/explicit-function-return-type */
export default function Login () {
  return (
    <div>
      <h1>Hello world</h1>

      <MobileSmallAndDown>MobileSmallAndDown</MobileSmallAndDown>
      <MobileMediumAndDown>MobileMediumAndDown</MobileMediumAndDown>
      <MobileLargeAndDown>MobileLargeAndDown</MobileLargeAndDown>
      <MobileOnly>MobileOnly</MobileOnly>
      <TabletAndDown>TabletAndDown</TabletAndDown>
      <TabletAndUp>TabletAndUp</TabletAndUp>
      <TabletOnly>TabletOnly</TabletOnly>
      <LaptopAndDown>LaptopAndDown</LaptopAndDown>
      <LaptopAndUp>LaptopAndUp</LaptopAndUp>
      <LaptopOnly>LaptopOnly</LaptopOnly>
      <LaptopLargeAndDown>LaptopLargeAndDown</LaptopLargeAndDown>
      <LaptopLargeAndUp>LaptopLargeAndUp</LaptopLargeAndUp>
      <LaptopLargeOnly>LaptopLargeOnly</LaptopLargeOnly>
      <DesktopAndDown>DesktopAndDown</DesktopAndDown>
      <DesktopAndUp>DesktopAndUp</DesktopAndUp>
      <DesktopOnly>DesktopOnly</DesktopOnly>
      <DesktopLargeAndUp>DesktopLargeAndUp</DesktopLargeAndUp>
    </div>
  )
}
/* eslint-enable  @typescript-eslint/explicit-function-return-type */
