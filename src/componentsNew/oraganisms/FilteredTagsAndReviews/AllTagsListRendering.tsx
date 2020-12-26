import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../../../modules';

interface AllTagsListRenderingProps {
  handleClickTagIcon: (tagId: number) => void;
}

export default function AllTagsListRendering({ handleClickTagIcon }: AllTagsListRenderingProps) {
  const { tags } = useSelector((state: RootState) => state.handleTags);

  let allTagsList =
    tags.length === 0 ? (
      <Link to="/mypage/tags">태그를 먼저 만들어 주세요</Link>
    ) : (
      tags.map(eachTag => {
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
      })
    );

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'center' }}>필터링할 태그를 선택하세요.</div>
      <HrLine />
      <div style={{ display: 'flex', flexWrap: 'wrap' }}>{allTagsList}</div>
    </div>
  );
}

const TagIcon = styled.div<{ tagId: number; tagColor: string }>`
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

const HrLine = styled.hr`
  border: 0;
  clear: both;
  display: block;
  width: 100%;
  background-color: gray;
  height: 2px;
  margin: 10px 0px;
`;
