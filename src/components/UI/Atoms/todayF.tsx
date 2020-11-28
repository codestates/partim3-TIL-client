// const today = new Date();

// const year = today.getFullYear();
// const month = today.getMonth() + 1;
// const day = today.getDate();
// const hour = today.getHours();
// const min = today.getMinutes();

// const date = {
//   year,
//   month,
//   day,
//   hour,
//   min,
// };

// export default date;

// 위와 같이 하니까 매일매일 date값을 새롭게 변경해 주는지 의문임
// date를 불러올때마다 new Date() 이하가 새롭게 실행되게 해야 하니까,
// 함수로 해놓고 실행시키도록 하면 맞지 않을까?

const getToday = () => {
  const today = new Date();

  let date = {
    year: today.getFullYear(),
    month: today.getMonth() + 1,
    day: today.getDate(),
    hour: today.getHours(),
    min: today.getMinutes(),
  };

  return date;
};

export default getToday();
