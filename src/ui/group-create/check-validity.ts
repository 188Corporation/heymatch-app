import { AlertStore } from 'store/alert'
import { GroupCreateStoreRegacy } from 'store/group-create-regacy'

export const checkTitleIntroValidity = (
  groupCreateStore: GroupCreateStoreRegacy,
  alertStore: AlertStore,
): boolean => {
  if (!groupCreateStore.isTitleValid) {
    alertStore.open({
      title: '그룹 이름을 확인해주세요!',
      body: '15자 이내로 적어주세요.',
    })
    return false
  }
  if (!groupCreateStore.isIntroValid) {
    alertStore.open({
      title: '그룹 소개를 확인해주세요!',
      body: '10자 이상 400자 이내로 적어주세요.',
    })
    return false
  }
  return true
}
