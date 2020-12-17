import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import REACT_APP_URL from '../config';

import { RootState } from '../modules';
import { handleTagsStart, handleTagsSuccess_Get, handleTagsFailure } from '../modules/handleTags';

import MypageTags from '../componentsNew/pages/MypageTags';
import { MypageHeaderAndSidebar } from '../componentsNew/oraganisms';
import { ModalAlert } from '../componentsNew/atoms';

export default function MypageTagsContainer() {
  const { currentUser } = useSelector((state: RootState) => state.loginOut.status);

  const [tagHandled, setTagHandled] = useState(false);
  const [handleModalAlert, setHandleModalAlert] = useState(false);

  const history = useHistory();
  const dispatch = useDispatch();

  if (currentUser === null) {
    setHandleModalAlert(true);
  }

  const handleCloseModal = () => {
    setHandleModalAlert(false);
    history.push('/login');
  };

  let notLoggedInAlertModal =
    handleModalAlert === true ? (
      <ModalAlert message="로그인이 되어있지 않습니다." handleCloseModal={handleCloseModal} />
    ) : (
      ''
    );

  // GET
  const getAllTags = () => {
    dispatch(handleTagsStart());

    axios
      .get(`${REACT_APP_URL}/calendar/tags`, {
        params: {
          userId: currentUser,
        },
        withCredentials: true,
      })
      .then(res => {
        const resTags = res.data.myTags;
        dispatch(handleTagsSuccess_Get(resTags));
      })
      .catch(err => {
        console.log({ err });
        dispatch(handleTagsFailure());
      });
  };

  // POST
  const postNewTag = (
    userId: number | null,
    tagColor: string,
    tagName: string,
    description: string,
  ) => {
    axios
      .post(
        `${REACT_APP_URL}/calendar/addtag`,
        { userId, tagName, tagColor, description },
        { withCredentials: true },
      )
      .then(res => {
        console.log('tag posted');
        setTagHandled(true);
      })
      .catch(err => {
        console.log({ err });
      });
  };

  // PUT
  const updateTag = (
    userId: number | null,
    tagId: number,
    newTagName: string,
    newTagColor: string,
    newDescription: string,
  ) => {
    axios
      .put(
        `${REACT_APP_URL}/calendar/updatetag`,
        {
          userId: userId,
          tagId: tagId,
          tagName: newTagName,
          tagColor: newTagColor,
          description: newDescription,
        },
        { withCredentials: true },
      )
      .then(res => {
        console.log('tag updated');
        setTagHandled(true);
      })
      .catch(err => {
        console.log({ err });
      });
  };

  // DELETE
  const deleteTag = (userId: number, tagId: number) => {
    axios
      .delete(`${REACT_APP_URL}/calendar/deletetag`, {
        data: { userId, tagId },
        withCredentials: true,
      })
      .then(res => {
        console.log('tag deleted');
        setTagHandled(true);
      })
      .catch(err => {
        console.log({ err });
      });
  };

  useEffect(() => {
    getAllTags();
    setTagHandled(false);
  }, [currentUser, tagHandled]);

  let childComponent = (
    <MypageTags
      userId={currentUser!}
      postNewTag={postNewTag}
      updateTag={updateTag}
      deleteTag={deleteTag}
    />
  );

  return (
    <>
      <MypageHeaderAndSidebar childComponent={childComponent}></MypageHeaderAndSidebar>
      {notLoggedInAlertModal}
    </>
  );
}
