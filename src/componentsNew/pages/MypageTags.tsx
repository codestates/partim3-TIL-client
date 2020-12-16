import React, { useState } from 'react';
import styled from 'styled-components';
import ColorPicker from '../molecules/sidebar/sidebarCalUnits/ColorPicker';

export default function MypageTags(props: any) {
  const userId = props.userId;
  const searchTag = () => {};
  // 사이드바의 명칭을 더 명확히 하는게 좋을까?
  interface MakeNewCalProps {
    handleNewCalName: (
      e: React.KeyboardEvent<HTMLInputElement> & { target: HTMLInputElement },
    ) => void;
    handleNewCalColor: (color: string) => void;
    addCalendar: () => void;
    currentColor: string;
  }

  const [newCalcolor, setNewCalcolor] = useState('#0693e3');
  const handleNewCalColor = (color: string) => {
    setNewCalcolor(color);
  };

  const [show, setShow] = useState(false);
  const handleNewTag = () => {
    setShow(!show);
  };

  const [newTagName, setNewTagName] = useState('');
  const handleNewTagName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewTagName(e.target.value);
  };

  const [newTagDes, setNewTagDes] = useState('');
  const handleSetNewTagDes = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewTagDes(e.target.value);
  };

  console.log(props.tags);
  return (
    <div>
      <MainHeader>
        <MainHeaderBox>
          <MainHeaderTitle>Tag검색</MainHeaderTitle>
          <MainHeaderSearch placeholder="Serch all tags" onChange={searchTag}></MainHeaderSearch>
          <MainHeaderBtnSpace>
            <MainHeaderBtn onClick={handleNewTag}>New Tag</MainHeaderBtn>
          </MainHeaderBtnSpace>
        </MainHeaderBox>
        <NewTagBox show={show}>
          <TemSpace>Tag 이름</TemSpace>
          <NewTagName onChange={handleNewTagName}></NewTagName>
          <TemSpace>Tag설명</TemSpace>
          <NewTagDes onChange={handleSetNewTagDes}></NewTagDes>
          <TemSpace>Tag color</TemSpace>
          <NewTagColor>
            <ColorPicker handleNewCalColor={handleNewCalColor} currentColor={newCalcolor} />
          </NewTagColor>
          <TemSpace>
            <button onClick={handleNewTag}>cancel</button>
            <button
              onClick={() => {
                props.createTag(userId, newCalcolor, newTagName, newTagDes);
              }}
            >
              create
            </button>
          </TemSpace>
        </NewTagBox>
      </MainHeader>
      <MainBody>
        <MainBodyTitle>Tags</MainBodyTitle>
        <TagsBox>
          <Tags>
            <TagsName>E:3</TagsName>
            <TagsDescriptiion>예상시간을 적어주세요</TagsDescriptiion>
            <TagsEdit>Edit</TagsEdit>
            <TagsDelete>Delete</TagsDelete>
          </Tags>
        </TagsBox>
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
  justify-contents: flex-start;
  align-items: center;
`;

const NewTagBox = styled.div<{ show?: boolean }>`
  display: ${props => (props.show ? 'flex' : 'none')};
  flex-direction: row;
  flex: 3;
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
`;

const MainBodyTitle = styled.div`
  flex: 1;
  border: 1px solid gray;
  text-align: justify;
  margin: 10px;
  margin-bottom: 0px;
`;

const TagsBox = styled.div`
  flex: 14;
  border: 1px solid gray;
  margin: 10px;
  margin-top: 0px;
  display: flex;
  flex-direction: column;
`;

const Tags = styled.div`
  display: flex;
  flex-direction: row;
  justify-contents: flex-end;
  align-items: center;
  margin: 3px;
`;

const TagsName = styled.div`
  flex: 1;
  text-align: justify;
`;
const TagsDescriptiion = styled.div`
  flex: 5;
`;
const TagsEdit = styled.div`
  flex: 0.5;
  text-align: right;
`;
const TagsDelete = styled.div`
  flex: 0.5;
  text-align: right;
  margin-right: 10px;
`;

const NewTagName = styled.input.attrs({
  placeholder: 'New Tagname',
})`
  flex: 1;
`;
const NewTagDes = styled.input.attrs({ placeholder: 'Description(Optional)' })`
  flex: 1;
`;
const NewTagColor = styled.span`
  flex: 1;
`;
const TemSpace = styled.span`
  flex: 1;
`;
