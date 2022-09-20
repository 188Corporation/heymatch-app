import React, { PropsWithChildren } from 'react'
import { SvgProps } from 'react-native-svg'

declare module '*.svg' {
  const content: React.FC<SvgProps>
  export default content
}

declare module 'react' {
  // NOTE(gogo): shorthand for `Function Component With Children`
  // https://stackoverflow.com/a/59106817/3535760
  export type FCC<P = {}> = React.FC<PropsWithChildren<P>>
}
