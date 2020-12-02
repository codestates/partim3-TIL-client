import React from 'react';

export default function SidebarOtherCal() {
  const checked = (e: any) => {
    console.log(e.target.checked);
    console.log(e.target.value);
  };
  let calName1: string = 'calendar name';
  let calName2: string = 'calendar name2';
  let calName3: string = 'calendar name3';

  return (
    <div>
      <div>공유캘린더</div>
      <div>
        <input type="checkbox" onClick={checked} name={calName1} value={calName1}></input>
        {calName1}
      </div>
      <div>
        <input type="checkbox" onClick={checked} name={calName2} value={calName2}></input>
        {calName2}
      </div>
      <div>
        <input type="checkbox" onClick={checked} name={calName3} value={calName3}></input>
        {calName3}
      </div>
    </div>
  );
}
