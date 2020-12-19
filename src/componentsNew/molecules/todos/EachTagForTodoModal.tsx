import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import styled from 'styled-components';

import { RootState } from '../../../modules';
import {
  handleCheckedTagsStart,
  handleCheckedTagsSuccess_add,
  handleCheckedTagsSuccess_del,
  handleTagsFailure,
} from '../../../modules/handleCheckedTags';

interface EachTagForTodoModalProps {
  tagId: number;
  tagName: string;
  tagColor: string;
}

export default function EachTagForTodoModal({
  tagId,
  tagName,
  tagColor,
}: EachTagForTodoModalProps) {
  const { checkedTagArray } = useSelector((state: RootState) => state.handleCheckedTags);

  let isCheckedDefault;
  if (checkedTagArray.indexOf(tagId) !== -1) {
    isCheckedDefault = true;
  } else {
    isCheckedDefault = false;
  }

  const [isChecked, setIsChecked] = useState(isCheckedDefault);

  const dispatch = useDispatch();

  const handleTagCheckChange = () => {
    setIsChecked(!isChecked);
    handleCheckTags(tagId, !isChecked); // 아직 갱신이 적용되지 않은 상태에서 바로 실행되므로, 반전해서 반영한다
  };

  const handleCheckTags = (checkedTag: number, isChecked: boolean) => {
    if (checkedTagArray.indexOf(checkedTag) === -1 && isChecked === true) {
      dispatch(handleCheckedTagsStart());
      dispatch(handleCheckedTagsSuccess_add(checkedTag));
    } else {
      dispatch(handleCheckedTagsStart());
      dispatch(handleCheckedTagsSuccess_del(checkedTagArray.indexOf(checkedTag)));
    }
  };

  return (
    <div className="EachTag" style={{ display: 'flex', alignItems: 'center', margin: '3px 0px' }}>
      <div style={{ flex: 1, marginLeft: '10px' }}>{!isChecked ? '' : <span>&#10003;</span>}</div>
      <div style={{ flex: 7, display: 'flex' }} onClick={() => handleTagCheckChange()}>
        <TagIcon tagColor={tagColor} isChecked={isChecked}>
          {tagName}
        </TagIcon>
      </div>
      <div style={{ flex: 1, marginRight: '10px' }} onClick={() => setIsChecked(!isChecked)}>
        {!isChecked ? '' : <span>&#10007;</span>}
      </div>
    </div>
  );
}

const TagIcon = styled.div<{ tagColor: string; isChecked: boolean }>`
  border-radius: 10px;
  background-color: ${props => props.tagColor};
  color: white;
  font-weight: bold;
  padding: 4px;
`;
