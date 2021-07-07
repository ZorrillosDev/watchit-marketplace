import React from 'react'
import styled from 'styled-components'

interface rulesType {
  constraint: string
  width: string
  rules: string
}

/* eslint-disable  @typescript-eslint/explicit-function-return-type */
const makeResponsiveComponent = (rulesets: rulesType[], tagName = 'div') =>
  // @ts-expect-error
  styled(tagName)`
    ${buildStyles(rulesets)}
  `

const buildStyles = (ruleset: rulesType[]) =>

  ruleset.reduce(
    (cssString: string, { constraint, width, rules }: rulesType) =>
      `${cssString} @media (${constraint}-width: ${width}) { ${rules} }`,
    ''
  )

export const hideAt = (breakpoints: { [s: string]: any } | ArrayLike<any>) => {
  const rulesets = Object.entries(breakpoints).reduce(
    (rulesets, [constraint, width]) => [
      ...rulesets,
      {
        constraint,
        width,
        rules: 'display: none;'
      }
    ],
    []
  )

  return makeResponsiveComponent(rulesets)
}

export const Breakpoint = ({ min, max, children }: any) => {
  const Component = hideAt({ min, max })
  return <Component>{children}</Component>
}

export default makeResponsiveComponent

/* eslint-enable  @typescript-eslint/explicit-function-return-type */
