const today = new Date();

const year = today.getFullYear();
const month = today.getMonth() + 1;
const day = today.getDate();
const hour = today.getHours();
const min = today.getMinutes();

const date = {
  year,
  month,
  day,
  hour,
  min,
};

export default date;
