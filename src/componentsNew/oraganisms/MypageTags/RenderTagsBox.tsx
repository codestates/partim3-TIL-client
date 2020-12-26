import React from 'react';
import styled from 'styled-components';

import { Tag } from '../../molecules/tagsSetting';

interface RenderTagsBoxProps {
  userId: number;
  tags: Array<{
    id: number;
    tagName: string;
    tagColor: string;
    description: string;
  }>;
  updateTag: (
    userId: number | null,
    tagId: number,
    newTagName: string,
    newTagColor: string,
    newDescription: string,
  ) => void;
  deleteTag: (userId: number, tagId: number) => void;
}

export default function RenderTagsBox({ userId, tags, updateTag, deleteTag }: RenderTagsBoxProps) {
  const renderTags =
    tags.length === 0
      ? ''
      : tags.map(eachTag => {
          return (
            <Tag
              userId={userId}
              key={eachTag.id}
              tagId={eachTag.id}
              tagName={eachTag.tagName}
              tagDescription={eachTag.description}
              tagColor={eachTag.tagColor}
              updateTag={updateTag}
              deleteTag={deleteTag}
            />
          );
        });

  return (
    <TagsBox>
      <TagWarp>
        <TagsName>Tag Name</TagsName>
        <TagsDescription>Tag Description</TagsDescription>
        <TagsEdit>Tag Edit</TagsEdit>
        <TagsDelete>Tag Delete</TagsDelete>
      </TagWarp>
      <div style={{ border: '1px solid black', margin: '10px 0px' }}></div>
      {renderTags}
    </TagsBox>
  );
}

const TagsBox = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  border-radius: 10px;
  border: 2px solid lightgrey;
  margin: 10px;
  padding: 10px;
  overflow: auto;
`;

const TagWarp = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  align-items: center;
  height: 20px;
`;

const TagsName = styled.div`
  display: flex;
  flex: 3;
  text-align: justify;
  margin-left: 10px;
`;
const TagsDescription = styled.div`
  flex: 5;
  margin-left: 10px;
`;

const TagsEdit = styled.div`
  flex: 2;
  text-align: right;
  margin-left: 10px;
`;

const TagsDelete = styled.div`
  flex: 1.5;
  text-align: right;
  margin-right: 10px;
`;
