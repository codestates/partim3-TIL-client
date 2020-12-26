import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
// setNewArrayOfTagsId(defaultArrayOfTagsId)
import { RootState } from '../../../modules';

interface EachTagForTodoModalProps {
  tagId: number;
  tagName: string;
  tagColor: string;
  handleCheckedTags: (tagId: number, isChecked: boolean) => void;
  alreadyChecked: boolean;
}

export default function EachTagForTodoModal({
  tagId,
  tagName,
  tagColor,
  handleCheckedTags,
  alreadyChecked,
}: EachTagForTodoModalProps) {
  // const { checkedTagArray } = useSelector((state: RootState) => state.handleCheckedTags);

  // PostTodoModal의 태그 상태는 모달이 새로 열릴때마다 초기화되므로,
  // 태그가 체크되었는지 여부를 checkedTagArray에 연동할 필요가 없다.
  const [isChecked, setIsChecked] = useState(alreadyChecked);

  const handleTagCheckChange = () => {
    setIsChecked(!isChecked);
    handleCheckedTags(tagId, !alreadyChecked); // 아직 갱신이 적용되지 않은 상태에서 바로 실행되므로, 반전해서 반영한다
  };

  return (
    <div
      className="EachTag"
      onClick={() => handleTagCheckChange()}
      style={{ display: 'flex', alignItems: 'center', margin: '3px 0px' }}
    >
      <div style={{ flex: 1, marginLeft: '10px' }}>{!isChecked ? '' : <span>&#10003;</span>}</div>
      <div style={{ flex: 7, display: 'flex' }}>
        <TagIcon tagColor={tagColor} isChecked={isChecked}>
          {tagName}
        </TagIcon>
      </div>
      <div style={{ flex: 1, marginRight: '10px' }}>{!isChecked ? '' : <span>&#10007;</span>}</div>
    </div>
  );
}

const TagIcon = styled.div<{ tagColor: string; isChecked: boolean }>`
  border-radius: 5px;
  background-color: ${props => props.tagColor};
  color: white;
  font-weight: bold;
  padding: 4px;
  margin: 4px;
  box-shadow: 1px 1px 1px grey;
  height: 25px;
  display: flex;
  justify-content: center;
  align-items: center;
`;
