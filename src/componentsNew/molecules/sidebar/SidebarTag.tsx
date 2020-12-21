import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import styled from 'styled-components';
import { RootState } from '../../../modules';
import { Input } from '../../atoms';

import {
  handle_first_filtering_on_sidebar_day_start,
  handle_first_filtering_on_sidebar_day_success,
} from '../../../modules/handle_TagsAndCalsArrayForFiltering';

export default function SidebarTag() {
  const { currentUser } = useSelector((state: RootState) => state.loginOut.status);
  const { tags } = useSelector((state: RootState) => state.handleTags);
  const [showTagsSelectOptions, setShowTagsSelectOptions] = useState(false);
  const [tagfilteringInput, setTagfilteringInput] = useState('');
  const searchTag = (e: React.KeyboardEvent<HTMLInputElement> & { target: HTMLInputElement }) => {
    setTagfilteringInput(e.target.value);
  };

  /* 모달을 필요로 하실지도 모르니까, 일단 이하의 모달 코드를 남겨 둠 */
  // const [smShow, setSmShow] = useState(false);

  const history = useHistory();
  const dispatch = useDispatch();

  const handleClickTagIcon = (tagId: number) => {
    dispatch(handle_first_filtering_on_sidebar_day_start());
    dispatch(handle_first_filtering_on_sidebar_day_success(tagId));
    history.push('/filtered');

    // 클릭한 tagId 를 기준으로 FilteredTodosAndReviews에서 최초 필터링을 하게 수정했음

    // FilteredTodosAndReviews에서 필터링을 redux로 관리하게 되면,
    // 이 컴포넌트에서도 FilteredTodosAndReviews의 redux 관리 액션생성자를 가져와서
    // 태그 클릭시에 필터링이 다시 되도록 해야 한다.
  };

  let filteredTags =
    tagfilteringInput === ''
      ? tags
      : tags.filter(eachTag => {
          return eachTag.tagName.indexOf(tagfilteringInput) !== -1;
        });

  let tagsList =
    filteredTags.length === 0 ? (
      <Link to="/mypage/tags">태그를 먼저 만들어 주세요</Link>
    ) : (
      filteredTags.map(eachTag => {
        return (
          <TagIcon
            key={eachTag.id}
            tagId={eachTag.id}
            tagColor={eachTag.tagColor}
            onClick={() => handleClickTagIcon(eachTag.id)}
          >
            {eachTag.tagName}
          </TagIcon>
        );
      })
    );

  let tagsSelectOptions = showTagsSelectOptions ? (
    <div
      style={{
        position: 'absolute',
        top: '30px',
        left: '30px',
        zIndex: 2,
      }}
    >
      <div
        // 바깥을 클릭하면 닫히도록 하는 기능인 듯
        style={{
          position: 'fixed',
          top: '0px',
          right: '0px',
          bottom: '0px',
          left: '0px',
        }}
        onClick={() => {
          setShowTagsSelectOptions(false);
        }}
      ></div>
      <TagSelectWindow>
        <div
          className="TagSettingIcon"
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: '5px',
          }}
        >
          <div>
            <Input
              type="text"
              name="SearchAllTags"
              placeholder="Search All Tags"
              smInput={1}
              handleChange={searchTag}
              autoFocus={true}
              className="SearchAllTags"
            />
          </div>
          <Link to="/mypage/tags">
            {/* <button type="button" style={{ border: 'none', padding: '0px' }}> */}
            <img
              src="/img/settingIcon.png"
              alt="캘린더 설정하기"
              width="30px"
              height="30px"
              style={{ margin: '0px', padding: '0px' }}
            ></img>
            {/* <span>&#9881;</span> */}
            {/* </button> */}
          </Link>
        </div>
        <HrLine style={{ margin: '5px', width: '95%' }} />
        <div
          className="EachTag_Sidebar"
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-start',
            margin: '3px 0px',
            paddingLeft: '10px',
          }}
        >
          {tagsList}
        </div>
      </TagSelectWindow>
    </div>
  ) : null;

  return (
    <SidebarTagWrap className="SidebarTagWrap">
      <div style={{ flex: 1, margin: '5px', position: 'relative' }}>
        <div onClick={() => setShowTagsSelectOptions(true)}>tag 필터링하기</div>
        {tagsSelectOptions}
      </div>

      {/* <div style={{ display: 'flex', flexWrap: 'wrap' }}>{tagsList}</div> */}
      {/* 해야 할 일
          - 일단 모든 태그 나열하기. (여기까지는 완성 : 1218)
          - 나열된 태그를 클릭하면, 다른 화면으로 넘어가기.
          - 이 별도의 화면에서는 클릭된 태그를 포함하는 모든 todo/review들이 날짜와 무관하게(순서대로?) 나열되어야 함.
          - 또한, 그 안에서도 다른 태그들로 필터링이 다시 가능해야 하고, 그 안에서도 캘린더별 필터링도 가능해야 함.
      */}
      {/* ------------------------------------------------------------------------------------ */}
      {/* 팀원 분들이 모달을 필요로 하실지도 모르니까, 일단 이하의 모달 코드를 남겨 둠 */}
      {/* 유저가 가진 모든 tag를 보여줄 건지? 캘린더별로 필터할건지 정해야함 */}
      {/* <Modal
        size="sm"
        show={smShow}
        onHide={() => setSmShow(false)}
        aria-labelledby="example-modal-sizes-title-sm"
      >
        <Modal.Header closeButton>
          <Modal.Title id="example-modal-sizes-title-sm">Todo나 Review에 달아보세요</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <input placeholder="tag 검색하기"></input>
          <div>서버로부터 tagTitle, tagColor받아와야함</div>
          <div>tag</div>
          <div>tag</div>
          <div>tag</div>
        </Modal.Body>
      </Modal> */}
      {/* ------------------------------------------------------------------------------------ */}
    </SidebarTagWrap>
  );
}

const SidebarTagWrap = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  width: 10px;
  /* width 속성을 이렇게 줘야 좀 작게 나열된다. 숫자는 어느정도 이하이기만 하면 되고, 그 이상 넘어가면 이상해짐 */
  /* 상위 컴포넌트에서 부트스트랩 코들르 지우고 넓이 지정을 제대로 해 주면 해결되지 않을까 생각함 */
  border: 1px solid red;
`;

const TagIcon = styled.div<{ tagId: number; tagColor: string }>`
  border-radius: 10px;
  background-color: ${props => props.tagColor};
  color: white;
  font-weight: bold;
  padding: 4px;
  margin: 4px;
`;

const HrLine = styled.hr`
  border: 0;
  clear: both;
  display: block;
  width: 100%;
  background-color: gray;
  height: 1px;
`;

const TagSelectWindow = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
  border-radius: 10px;
  border: 1px solid red;
  background-color: white;
  width: 280px;
  z-index: 7;
  padding: 5px;
`;
