import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Link, useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../../modules';

interface FilteredTodosAndReviewsProps {
  tagId?: number;
}

export default function FilteredTodosAndReviews({ tagId }: FilteredTodosAndReviewsProps) {
  const { currentUser } = useSelector((state: RootState) => state.loginOut.status);
  const { tags } = useSelector((state: RootState) => state.handleTags);
  const [allTagsForFiltering, setAllTagsForFiltering] = useState<number[]>([]);
  const [selectedTags, setSelectedTags] = useState<number[]>([]);

  const history = useHistory();
  if (typeof currentUser !== 'number') {
    alert('먼저 로그인을 해 주세요.');
    history.push('/login');
  }

  const handleClickTagIcon = (tagId: number) => {
    if (allTagsForFiltering.indexOf(tagId) !== -1) {
      let tagIdIndex = allTagsForFiltering.indexOf(tagId);
      let delBefore = allTagsForFiltering.slice(0, tagIdIndex);
      let delAfter = allTagsForFiltering.slice(tagIdIndex + 1);
      setAllTagsForFiltering([...delBefore, ...delAfter]);
    } else {
      let newTagsForFiltering = allTagsForFiltering.slice();
      setAllTagsForFiltering([...newTagsForFiltering, tagId]);
    }
    // 클릭할때마다 배열 안에 잘 들어오고 나가는 중임.
    // 전체 todo/review에 대한 get 요청 api가 나오면, 이 allTagsForFiltering 배열에 맞춰서 필터링해서 렌더링하면 된다.
  };

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

  let selectedTagsList =
    tags.length === 0 ? (
      <span>아직 선택된 태그가 없습니다.</span>
    ) : (
      tags.map(eachTag => {
        if (allTagsForFiltering.indexOf(eachTag.id) !== -1) {
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

  useEffect(() => {
    if (tagId) {
      handleClickTagIcon(tagId);
    }
  }, [tagId]);

  return (
    <FilteredTodosAndReviewsWrap>
      <FilteredTodosAndReviewsHeader></FilteredTodosAndReviewsHeader>
      <FilteredTodosAndReviewsSidebar>
        <SideBarTags>
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            필터링할 태그를 선택해 주세요.
          </div>
          {/* <HrLine /> */}
          <div style={{ display: 'flex', flexWrap: 'wrap' }}>{allTagsList}</div>
          <HrLine />
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            현재 선택하신 태그들입니다.
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap' }}>{selectedTagsList}</div>
        </SideBarTags>
        <SideBarCalendars></SideBarCalendars>
      </FilteredTodosAndReviewsSidebar>
    </FilteredTodosAndReviewsWrap>
  );
}

const FilteredTodosAndReviewsWrap = styled.div`
  display: flex;
  flex-direction: column;
  width: 100vw;
  height: 100vh;
`;

const HrLine = styled.hr`
  border: 0;
  clear: both;
  display: block;
  width: 100%;
  background-color: gray;
  height: 1px;
  margin: 10px 0px;
`;

const FilteredTodosAndReviewsHeader = styled.div`
  display: flex;
  border: 1px solid red;
  width: 100%;
  height: 100px;
`;

const FilteredTodosAndReviewsSidebar = styled.div`
  display: flex;
  flex-direction: column;
  border: 1px solid black;
  flex-basis: auto;
  height: 100%;
  width: 250px;
`;

const SideBarTags = styled.div`
  flex: 1;
  border: 1px solid blue;
  width: 100%;
  padding: 10px;
`;

const SideBarCalendars = styled.div`
  flex: 1;
  border: 1px solid blue;
  width: 100%;
  padding: 10px;
`;

const TagIcon = styled.div<{ tagId: number; tagColor: string }>`
  border-radius: 10px;
  background-color: ${props => props.tagColor};
  color: white;
  font-weight: bold;
  padding: 4px;
  margin: 4px;
  box-shadow: 5px 5px 5px grey; // 클릭한 것만 이런 강조 효과를 주고 싶었는데,
`;
