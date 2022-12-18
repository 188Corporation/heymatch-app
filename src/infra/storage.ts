import AsyncStorage from '@react-native-async-storage/async-storage'

export const storage = {
  getItem: async <T>(key: string) => {
    const value = await AsyncStorage.getItem(key)
    if (!value) return null
    try {
      return JSON.parse(value) as T
    } catch (e) {
      // for backward compatibility
      return null
    }
  },
  removeItem: async (key: string) => {
    await AsyncStorage.removeItem(key)
  },
  setItem: async <T>(key: string, value: T) => {
    await AsyncStorage.setItem(key, JSON.stringify(value))
  },
}
