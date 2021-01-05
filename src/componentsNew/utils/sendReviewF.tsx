import axios from 'axios';
import REACT_APP_URL from '../../config';

// 스케줄데이트(3) / 스케줄타임(2)으로 나눠서 보내야 함

export default function sendReview(
  userId: number | null,
  title: string,
  context: string,
  imageUrl: string,
  scheduleDate: object,
  scheduleTime: object,
  calendarId: number,
  tags: number[],
) {
  if (title === '' || context === '') {
    alert('제목 또는 내용이 입력되지 않았습니다.');
    return;
  }

  if (calendarId === NaN) {
    alert('캘린더가 선택되지 않았습니다.');
    return;
  }

  // dispatch(calendarStart());
  // return 이 없어도 axios는 잘 작동되는데 return이 필요한 이유?
  // 현재 유저를 매번 리덕스에서 확인하는 방식이 맞나..?
  console.log('sendReview', scheduleTime);
  return axios
    .post(
      `${REACT_APP_URL}/calendar/review`,
      {
        userId,
        title,
        context,
        imageUrl,
        // scheduleTime: JSON.stringify(Date),
        scheduleDate: JSON.stringify(scheduleDate),
        scheduleTime: JSON.stringify(scheduleTime),
        calendarId,
        tags: tags, // 서버에서 tags를 요청하도록 변경됐는데, 일단 임의의 배열(임의의 태그id를 담은 배열)로 넘김
        // 실제로는 BigModal 안에서 태그를 선택(select/option)해서 '태그id들이 담긴 배열'로 만들어 매개변수로 넘길 수 있어야 한다.
      },
      { withCredentials: true },
    )
    .then(res => {
      // dispatch(calendarSuccess(todos, reviews));
    })
    .catch(err => {
      console.log('err?', err);
      // dispatch(calendarFailure());
    });
}
