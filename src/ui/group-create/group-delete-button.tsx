import React from 'react'
import { TouchableOpacity } from 'react-native'
import { Body } from 'ui/common/text'
import { Colors } from 'infra/colors'
import { useStores } from 'store/globals'

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
          buttonText: '네 삭제할게요!',
          cancelText: '다음에 하기',
          onPress: () => onDelete(),
        })
      }}
    >
      <Body style={{ color: Colors.white }}>그룹 삭제</Body>
    </TouchableOpacity>
  )
}
