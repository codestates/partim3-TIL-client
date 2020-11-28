import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

export default function SidebarCal() {
  const [startDate, setStartDate] = useState(new Date());
  const handleDate = (date: Date | null) => {
    if (date !== null) {
      setStartDate(date);
    }
  };

  return <DatePicker selected={startDate} onChange={handleDate} />;
}
