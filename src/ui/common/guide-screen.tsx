import { editUserInfo } from 'api/writes'
import { guide1, guide2, guide3, guide4, guide5, guide6 } from 'image'
import { Colors } from 'infra/colors'
import React from 'react'
import { Dimensions, View } from 'react-native'
import Carousel from 'react-native-reanimated-carousel'
import { mutate } from 'swr'
import { Button } from './button'
import { Image } from './image'

export const GuideScreen = () => {
  const images = [guide1, guide2, guide3, guide4, guide5, guide6]
  return (
    <>
      <Carousel
        data={images}
        loop={false}
        width={Dimensions.get('window').width}
        height={Dimensions.get('window').height}
        modeConfig={{
          parallaxScrollingScale: 0.9,
          parallaxScrollingOffset: 50,
        }}
        scrollAnimationDuration={1000}
        renderItem={({ index }) => {
          return (
            <View>
              {index < images.length - 1 ? (
                <View
                  style={{
                    position: 'absolute',
                    top: 30,
                    right: 20,
                    zIndex: 1000,
                  }}
                >
                  <Button
                    text='건너뛰기'
                    color={'transparent'}
                    onPress={async () => {
                      await editUserInfo({ hasFinishedGuide: true })
                      await mutate('/users/my/')
                    }}
                  />
                </View>
              ) : (
                <View
                  style={{
                    position: 'absolute',
                    width: '50%',
                    bottom: '15%',
                    left: '25%',
                    zIndex: 1000,
                  }}
                >
                  <Button
                    text='시작하기!'
                    onPress={async () => {
                      await editUserInfo({ hasFinishedGuide: true })
                      await mutate('/users/my/')
                    }}
                    color={Colors.primary.blue}
                  />
                </View>
              )}
              <Image
                source={images[index]}
                style={{ width: '100%', height: '100%', borderRadius: 20 }}
              />
            </View>
          )
        }}
      />
    </>
  )
}
