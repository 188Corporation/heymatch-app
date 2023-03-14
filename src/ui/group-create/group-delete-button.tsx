import { Colors } from 'infra/colors'
import React from 'react'
import { TouchableOpacity } from 'react-native'
import { useStores } from 'store/globals'
import { Body } from 'ui/common/text'

export const GroupDeleteButton: React.FC<{
  onDelete: () => void
}> = ({ onDelete }) => {
  const { alertStore } = useStores()
  return (
    <TouchableOpacity
      style={{
        marginRight: 8,
        paddingVertical: 8,
        paddingHorizontal: 16,
      }}
      onPress={() => {
        alertStore.open({
          title: '정말 그룹을 삭제할까요?',
          bodyChildren: () => (
            <Body style={{ color: Colors.primary.red }}>
              그룹을 삭제하면 매칭 내역이 삭제돼요!
            </Body>
          ),
          mainButton: '네 삭제할게요!',
          subButton: '다음에 하기',
          onMainPress: () => onDelete(),
        })
      }}
    >
      <Body style={{ color: Colors.white }}>그룹 삭제</Body>
    </TouchableOpacity>
  )
}
