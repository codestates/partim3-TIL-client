import React from 'react';
import MypageCalendar from '../componentsNew/pages/MypageCalendar';

import { MypageHeaderAndSidebar } from '../componentsNew/oraganisms';

export default function MypageCalendarContainer() {
  let childComponent = <MypageCalendar></MypageCalendar>;

  return <MypageHeaderAndSidebar childComponent={childComponent}></MypageHeaderAndSidebar>;
}
