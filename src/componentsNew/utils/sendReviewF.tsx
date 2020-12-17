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
) {
  // dispatch(calendarStart());
  // return 이 없어도 axios는 잘 작동되는데 return이 필요한 이유?
  // 현재 유저를 매번 리덕스에서 확인하는 방식이 맞나..?

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
      },
      { withCredentials: true },
    )
    .then(res => {
      const { reviews } = res.data;
      console.log(reviews);
      // dispatch(calendarSuccess(todos, reviews));
    })
    .catch(err => {
      console.log('err?', err);
      // dispatch(calendarFailure());
    });
}
