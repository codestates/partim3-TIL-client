import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import MypageHeaderAndSidebar from '../componentsNew/oraganisms/MypageHeaderAndSidebar';
import MypageAddCal from '../componentsNew/pages/MypageAddCal';
import axios from 'axios';
import REACT_APP_URL from '../config';
import { RootState } from '../modules';
import { mypageCalendarMessageSuccess } from '../modules/mypageCalendarMessagesM';
import mypageCalendarMessagesM from '../modules';

export default function MypageAddCalContainer() {
  //캘린더 추가 버튼을 클릭하면 라우팅이 됨
  //캘린더 페이지로 넘어와서 컨테이너 랜더링
  //param이 없기 때문에, onClick을 기준으로 axios -> useEffect
  //뷰에게 받아온 메세지 배열을 넘겨주기
  //뷰 컴포넌트 랜더링
  const dispatch = useDispatch();

  const { currentUser } = useSelector((state: RootState) => state.loginOut.status);

  const getMessage = () => {
    axios
      .get(`${REACT_APP_URL}/user/message`, {
        params: {
          userId: currentUser,
        },
        withCredentials: true,
      })
      .then(res => {
        //일단 state를 쓴다고 가정.
        const { myMessages } = res.data;
        //state를 쓰니 무한 반복됨. shareCalMessage 변수명을 같게 해주어서 무한 반복되는 것이었음.
        //캘린더의 상태값을 다양한 곳에서 필요로 할 것 같아서 리덕스 사용
        dispatch(mypageCalendarMessageSuccess(myMessages));
      })
      .catch(err => {
        //메세지가 없는 경우
        console.log(err);
      });
  };

  const connectcalendarauthority = (messageId: number, answer: boolean) => {
    axios
      .post(
        `${REACT_APP_URL}/calendar/connectcalendarauthority`,
        {
          userId: currentUser,
          messageId,
          answer,
        },
        { withCredentials: true },
      )
      .then(res => {
        console.log(res.data);
      })
      .catch(err => {
        console.log(err);
      });
  };

  const handleMessage = () => {};

  //문제점: 최초랜더링시 빈배열이 랜더링 되는 문제.
  //사이드바의 캘린더 추가버튼을 클릭시 calendar 주소로 이동한다.
  //그러나 컴포넌트를 바꾸어주지 않았기 때문에 최초 랜더링 페이지(messages가 빈배열인 상태)가 화면에 나타난다.
  //이를 해결해 주기 위해서 MypageCalendarContainer에서는
  //캘린더의 이름이 바뀌거나 색이 변경되면 useEffect를 통해 서버에 포스트 요청, 겟요청을 보냈다.
  //param이 바뀔 경우에는 useEffect에서 해당 param에 맞는 주소로 이동.
  //여기에서는 주소는 변하지 않으므로,색깔 변경시에 해당 하는 코드를 참조하자.
  //요청은 하위에서 나가지 않고, 하위의 state값 변경에 따라 상위에서 서버로 나간다.

  const [messageStatus, setMessageStatus] = useState(false);
  const handleMessageStatus = () => {
    setMessageStatus(true);
  };

  useEffect(() => {}, [messageStatus]);

  //초반의 messages는 빈배열인 상태.
  //하위에서 클릭시 변경값을 받아올 수 있도록, messageStatus를 내린다.
  //변경값으로 무엇을 받아와야 할까?
  //캘린더의 경우 색을 변경해서 그 변경된 색을 함수에 담아 상위로 올려준다.
  //하위에서 변경된 값을 받아올 필요는 없고 수락/거절 버튼이 눌리면 그 요청을 실행해주면 된다.
  //boolean으로 해당 값을 세팅해 준다면?

  //생각해보니 이렇게 복잡하게 할 필요없이, 컴포넌트 실행시에 값을 받아서 내려주면 된다.

  //calendar로 라우팅이 되면 메세지를 받아오기.
  getMessage();
  const { messages } = useSelector((state: RootState) => state.mypageCalendarMessagesM);
  //받은 메세지를 하위로 내려주기 위해 리덕스에서 받아오기

  let childComponent = (
    <MypageAddCal
      messages={messages}
      handleMessageStatus={handleMessageStatus}
      connectcalendarauthority={connectcalendarauthority}
    ></MypageAddCal>
  );

  return <MypageHeaderAndSidebar childComponent={childComponent}></MypageHeaderAndSidebar>;
}
