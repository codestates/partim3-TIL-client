interface Data {
  todos: Array<object>;
  reviews: Array<object>;
}

export const data: Data = {
  todos: [
    {
      todoTitle: 'react',
      scheduleTime: 'Fri Nov 20 2020 17:09:00 GMT+0900 (Korean Standard Time)',
    },
    {
      todoTitle: 'redux',
      scheduleTime: 'Fri Nov 20 2020 22:09:00 GMT+0900 (Korean Standard Time)',
    },
  ],
  reviews: [
    {
      title: '어렵다..',
      context: '오랫만에 했더니 역시 생각이 나질 않아..ㅠㅠ',
      createdAt: 'Fri Nov 20 2020 18:09:00 GMT+0900 (Korean Standard Time)',
    },
    {
      title: '어렵다..',
      context: '리덕스!!!',
      createdAt: 'Fri Nov 20 2020 18:09:00 GMT+0900 (Korean Standard Time)',
    },
  ],
};

const example = {
  checkPoint: 1605621916453,
  syncTaskBean: {
    update: [
      {
        id: '5dc2569c5592603ff9e5c126',
        projectId: '5c9335d13e0c3d85eb48df3e',
        sortOrder: -30511447670784,
        title: '쇼카드 소형돌출 만들기',
        content: '',
        timeZone: 'Asia/Seoul',
        isFloating: false,
        reminder: '',
        reminders: [],
        exDate: [],
        completedTime: '2020-08-02T05:01:05.166+0000',
        completedUserId: 114924947,
        priority: 0,
        status: 0,
        items: [],
        progress: 0,
        modifiedTime: '2019-11-06T05:14:04.377+0000',
        etag: 'atov5csf',
        deleted: 0,
        createdTime: '2019-11-06T05:14:04.195+0000',
        creator: 114924947,
        kind: 'TEXT',
      },
    ],
  },
};
