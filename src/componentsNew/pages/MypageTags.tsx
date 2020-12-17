import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../modules';
import styled from 'styled-components';
import ColorPicker from '../molecules/sidebar/sidebarCalUnits/ColorPicker';

import { PostNewTagBox, RenderTagsBox } from '../oraganisms/MypageTags';

interface MypageTagsProps {
  userId: number;
  tags: Array<{
    id: number;
    tagName: string;
    tagColor: string;
    description: string;
  }>;
  postNewTag: (
    userId: number | null,
    tagColor: string,
    tagName: string,
    description: string,
  ) => void;
  updateTag: (
    userId: number | null,
    tagId: number,
    newTagName: string,
    newTagColor: string,
    newDescription: string,
  ) => void;
  deleteTag: (userId: number, tagId: number) => void;
}

export default function MypageTags({
  userId,
  tags,
  postNewTag,
  updateTag,
  deleteTag,
}: MypageTagsProps) {
  const searchTag = () => {};
  // 사이드바의 명칭을 더 명확히 하는게 좋을까?

  const [showPostNewTagBox, setShowPostNewTagBox] = useState(false);
  const togglePostNewTagBoxButton = () => {
    setShowPostNewTagBox(!showPostNewTagBox);
  };

  console.log(tags);
  return (
    <div>
      <MainHeader>
        <MainHeaderBox>
          <MainHeaderTitle>Tag 검색</MainHeaderTitle>
          <MainHeaderSearch placeholder="Search all tags" onChange={searchTag}></MainHeaderSearch>
          <MainHeaderBtnSpace>
            <MainHeaderBtn onClick={togglePostNewTagBoxButton}>New Tag</MainHeaderBtn>
          </MainHeaderBtnSpace>
        </MainHeaderBox>
        <PostNewTagBox
          userId={userId}
          showPostNewTagBox={showPostNewTagBox}
          postNewTag={postNewTag}
          togglePostNewTagBoxButton={togglePostNewTagBoxButton}
          tags={tags}
        />
      </MainHeader>
      <MainBody>
        {/* <MainBodyTitle>Tags</MainBodyTitle> */}
        <RenderTagsBox userId={userId} tags={tags} updateTag={updateTag} deleteTag={deleteTag} />
      </MainBody>
    </div>
  );
}

const MainHeader = styled.div`
  margin: 10px;
  margin-bottom: 0px;
  border: 1px solid gray;
  flex: 0.8;
  display: flex;
  flex-direction: column;
`;
const MainHeaderBox = styled.div`
  border: 1px solid gray;
  flex: 1;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
`;

const MainHeaderTitle = styled.span`
  flex: 0.6;
  margin-left: 10px;
`;
const MainHeaderSearch = styled.input`
  flex: 3;
`;
const MainHeaderBtnSpace = styled.span`
  flex: 5;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
`;
const MainHeaderBtn = styled.button`
  margin-right: 4vw;
`;

const MainBody = styled.div`
  flex: 10;
  display: flex;
  flex-direction: column;
  margin-top: 10px;
`;

const MainBodyTitle = styled.div`
  flex: 1;
  border: 1px solid gray;
  text-align: justify;
  margin: 10px;
  margin-bottom: 0px;
`;
