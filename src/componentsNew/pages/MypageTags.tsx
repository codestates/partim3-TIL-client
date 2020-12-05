import React, { useState } from 'react';
import styled from 'styled-components';
import ColorPicker from '../molecules/sidebar/sidebarCalUnits/ColorPicker';

export default function MypageTags() {
  // const Page = styled.body`
  //   height: 100vh;
  // `;

  // const Container = styled.div`
  //   display: flex;
  //   height: 100%;
  //   flex-direction: column;
  // `;
  // // 화면의 비율이 항상 100%인가? 그 이상으로도 높이를 조정할 수 있는데
  // const Header = styled.div`
  //   flex: 1;
  //   display: flex;
  //   align-items: center;
  //   border-bottom: 1px solid;
  // `;

  // const Title = styled.h2`
  //   flex: 5;
  // `;
  // const Space = styled.span`
  //   flex: 1;
  //   display: flex;
  //   flex-direction: row;
  //   justify-contents: center;
  //   align-items: center;
  // `;
  // const Btn = styled.button`
  //   height: 5vh;
  //   width: 13vw;
  //   color: white;
  //   border: 0.1px;
  //   border-radius: 8px;
  //   background: green;
  // `;

  // const Body = styled.div`
  //   flex: 14;
  //   display: flex;
  //   flex-direction: row;
  // `;
  // // 사이드바는 고정값을 가지게 할 수 없을까
  // // 미디어 쿼리를 써야하나?
  // // 사이드바의 명칭을 더 명확히 하는게 좋을까?
  // const Sidebar = styled.div`
  //   flex: 1;
  //   border-right: 0.1px solid gray;
  // `;
  // const Text = styled.h5`
  //   margin: 10px;
  // `;
  const Main = styled.div`
    flex: 5;
    display: flex;
    flex-direction: column;
  `;
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

  const NewTagBox = styled.div`
    display: flex;
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

  // 왜 글자가 가운데로 오지 않는지 이해가 가지 않는다..
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

  const NewTagName = styled.input`
    flex: 1;
  `;
  const NewTagDes = styled.input`
    flex: 1;
  `;
  const NewTagColor = styled.span`
    flex: 1;
  `;
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
    // console.log({ newCalcolor });
    setNewCalcolor(color);
  };

  // const [newCalcolor, setNewCalcolor] = useState('#0693e3');

  return (
    // <Page>
    //   <Container>
    //     <Header>
    //       <Title>Setting</Title>
    //       <Space>
    //         <Btn>완료</Btn>
    //       </Space>
    //     </Header>
    //     <Body>
    //       <Sidebar>
    //         <Text>Profile</Text>
    //         <Text>Tags</Text>
    //         <Text>Calendar</Text>
    //       </Sidebar>
    <Main>
      <MainHeader>
        <MainHeaderBox>
          <MainHeaderTitle>Tag검색</MainHeaderTitle>
          <MainHeaderSearch placeholder="Serch all tags" onChange={searchTag}></MainHeaderSearch>
          <MainHeaderBtnSpace>
            <MainHeaderBtn>New Tag</MainHeaderBtn>
          </MainHeaderBtnSpace>
        </MainHeaderBox>
        <NewTagBox>
          <span>Tag Name</span>
          <NewTagName placeholder="New Tagname"></NewTagName>
          <span>Tag설명</span>
          <NewTagDes placeholder="Description(Optional)"></NewTagDes>
          <NewTagColor>
            <ColorPicker handleNewCalColor={handleNewCalColor} currentColor={newCalcolor} />
          </NewTagColor>
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
          <Tags>
            <TagsName>E:3</TagsName>
            <TagsDescriptiion>예상시간을 적어주세요</TagsDescriptiion>
            <TagsEdit>Edit</TagsEdit>
            <TagsDelete>Delete</TagsDelete>
          </Tags>
          <Tags>
            <TagsName>E:3</TagsName>
            <TagsDescriptiion>예상시간을 적어주세요</TagsDescriptiion>
            <TagsEdit>Edit</TagsEdit>
            <TagsDelete>Delete</TagsDelete>
          </Tags>
        </TagsBox>
      </MainBody>
    </Main>
    //     </Body>
    //   </Container>
    // </Page>
  );
}
