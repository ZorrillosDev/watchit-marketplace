import React from 'react'
import styled from 'styled-components'

interface rulesType {
  constraint: string,
  width: any,
  rules:string
}

const makeResponsiveComponent = (rulesets: rulesType, tagName = 'div') =>
  // @ts-ignore
  styled(tagName)`
    ${buildStyles(rulesets)}
  `

const buildStyles = (ruleset: any[] | rulesType) =>
  // @ts-ignore
  ruleset.reduce(
    (cssString: any, { constraint, width, rules }: any) =>
      `${cssString} @media (${constraint}-width: ${width}) { ${rules} }`,
    '',
  )

export const hideAt = (breakpoints: { [s: string]: any } | ArrayLike<any>) => {
  const rulesets = Object.entries(breakpoints).reduce(
    (rulesets, [constraint, width]) => [
      ...rulesets,
      {
        constraint,
        width,
        rules: `display: none;`,
      },
    ],
    [],
  )

  // @ts-ignore
  return makeResponsiveComponent(rulesets)
}

export const Breakpoint = ({ min, max, children } : any) => {
  const Component = hideAt({ min, max })
  return <Component>{children}</Component>
}

export default makeResponsiveComponent
