import React from 'react';
import styled from 'styled-components';
import { useSelector } from 'react-redux';
import { RootState } from '../../../modules';

interface SelectedTagsListRenderingProps {
  handleClickTagIcon: (tagId: number) => void;
}

export default function SelectedTagsListRendering({
  handleClickTagIcon,
}: SelectedTagsListRenderingProps) {
  const { tags } = useSelector((state: RootState) => state.handleTags);
  const { tags_ArrayForFiltering } = useSelector(
    (state: RootState) => state.handle_TagsAndCalsArrayForFiltering,
  );

  let selectedTagsList =
    tags_ArrayForFiltering.length === 0 ||
    (tags_ArrayForFiltering.length === 1 && tags_ArrayForFiltering[0] === undefined) ? (
      <span>아직 선택된 태그가 없습니다.</span>
    ) : (
      tags.map(eachTag => {
        if (tags_ArrayForFiltering.indexOf(eachTag.id) !== -1) {
          return (
            <TagIcon
              key={eachTag.id}
              className={`TagIcon_${eachTag.id}`}
              tagId={eachTag.id}
              tagColor={eachTag.tagColor}
              onClick={() => {
                handleClickTagIcon(eachTag.id);
              }}
            >
              {eachTag.tagName}
            </TagIcon>
          );
        }
      })
    );

  return (
    <div>
      {/* <div style={{ display: 'flex', justifyContent: 'center' }}>현재 선택하신 태그들입니다.</div> */}
      <div style={{ display: 'flex', flexWrap: 'wrap' }}>{selectedTagsList}</div>
    </div>
  );
}

const TagIcon = styled.div<{ tagId: number; tagColor: string }>`
  border-radius: 10px;
  background-color: ${props => props.tagColor};
  color: white;
  font-weight: bold;
  padding: 4px;
  margin: 4px;
  box-shadow: 5px 5px 5px grey; // 클릭한 것만 이런 강조 효과를 주고 싶었는데,
`;
