import React from 'react'

// NOTE(viz.ko): react-navigation 내장 타입이 유연하지 않아서 그냥 any 로 대체
//  인터페이스를 `navigation` 통해 추상화해서 expose
export const _navigationRef = React.createRef<any>()

export const navigation = {
  navigate: (name: string, params?: object) => {
    _navigationRef.current?.navigate(name, params)
  },
  goBack() {
    _navigationRef.current?.goBack()
  },
}
