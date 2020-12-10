import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import axios from 'axios';

import { RootState } from '../modules';
import { tagsSuccess, tagsFailure } from '../modules/tagsM';

import MypageTags from '../componentsNew/pages/MypageTags';

export default function MypageTagsContainer() {
  const [nickname, setNickname] = useState('');

  const userInfoState = useSelector((state: RootState) => state.handleUserInfo); // 끝에 [] 해줘야하는데 에러가 난다
  // userInfo get 요청에 대응하는 API가 없으므로, 위 코드는 지금은 쓰이질 않고 있음

  const history = useHistory();
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state: RootState) => state.loginOut.status);
  const { tags } = useSelector((state: RootState) => state.tagsM);

  const getTag = () => {
    axios
      .get(`http://localhost:5000/calendar/tags`, {
        params: {
          userId: currentUser,
        },
        withCredentials: true,
      })
      .then(res => {
        const tags = res.data.myTags;
        dispatch(tagsSuccess(tags));
      })
      .catch(err => {
        console.log(err);
      });
  };

  useEffect(() => {
    getTag();
  }, []);

  const createTag = (
    userId: number | null,
    tagColor: string,
    tagName: string,
    description: string,
  ) => {
    axios
      .post(
        'http://localhost:5000/calendar/addtag',
        { userId, tagName, tagColor, description },
        { withCredentials: true },
      )
      .then(res => {
        console.log('tag sent');
      })
      .catch(err => {
        console.log(err);
        dispatch(tagsFailure());
      });
  };
  // interface tagsProps {
  //   userId: number;
  //   createTag: void;
  //   tags: Array<object>;
  // }

  return <MypageTags userId={currentUser} createTag={createTag} tags={tags} />;
}
