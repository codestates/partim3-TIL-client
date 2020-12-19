import React, { useState } from 'react';
import styled from 'styled-components';
import ColorPicker from '../../molecules/sidebar/sidebarCalUnits/ColorPicker';
// import { ChoiceModal } from '../../atoms';

interface TagProps {
  userId: number;
  tagId: number;
  tagName: string;
  tagDescription: string;
  tagColor: string;
  updateTag: (
    userId: number | null,
    tagId: number,
    newTagName: string,
    newTagColor: string,
    newDescription: string,
  ) => void;
  deleteTag: (userId: number, tagId: number) => void;
}

export default function Tag({
  userId,
  tagId,
  tagName,
  tagDescription,
  tagColor,
  updateTag,
  deleteTag,
}: TagProps) {
  const [openEditTag, setOpenEditTag] = useState(false);

  const [newTagName, setNewTagName] = useState(tagName);
  const handleNewTagName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewTagName(e.target.value);
  };

  const [newTagDescription, setNewTagDescription] = useState(tagDescription);
  const handleSetNewTagDescription = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewTagDescription(e.target.value);
  };

  const [newCalcolor, setNewCalcolor] = useState(`${tagColor}`);
  const handleNewCalColor = (color: string) => {
    setNewCalcolor(color);
  };

  let editTagName = !openEditTag ? (
    <TagIcon tagColor={tagColor}>{tagName}</TagIcon>
  ) : (
    <input
      className="newTagName_Input"
      type="text"
      placeholder="new Tag Name"
      onChange={handleNewTagName}
      autoFocus={true}
      defaultValue={newTagName}
      // width={'100%'}
      style={{
        borderLeftWidth: 0,
        borderRightWidth: 0,
        borderTopWidth: 0,
        borderBottomWidth: 1,
        // marginLeft: '2px',
        marginRight: '2px',
      }}
    ></input>
  );

  let editTagDescription = !openEditTag ? (
    <Label>{tagDescription}</Label>
  ) : (
    <>
      <input
        className="newTagDescription_Input"
        type="text"
        placeholder="new Tag Description"
        onChange={handleSetNewTagDescription}
        defaultValue={newTagDescription}
        style={{
          borderLeftWidth: 0,
          borderRightWidth: 0,
          borderTopWidth: 0,
          borderBottomWidth: 1,
          // marginLeft: '2px',
          marginRight: '2px',
        }}
      ></input>
      <ColorPicker handleNewCalColor={handleNewCalColor} currentColor={newCalcolor} />
    </>
  );

  let editButton = !openEditTag ? (
    <Label onClick={() => setOpenEditTag(true)}>Edit</Label>
  ) : (
    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
      <Label
        onClick={() => {
          updateTag(userId, tagId, newTagName, newCalcolor, newTagDescription);
          setOpenEditTag(false); // 태그 수정이 성공할 때에만 이렇게 가야 하는데...
        }}
      >
        Edit Tag
      </Label>
      <Label onClick={() => setOpenEditTag(false)}>Cancle</Label>
    </div>
  );

  // const [handleChoiceModal, setHandleChoiceModal] = useState(false);

  // let deleteTagChoiceModal =
  //   handleChoiceModal === true ? (
  //     <ChoiceModal message="로그인이 되어있지 않습니다." handleCloseModal={handleCloseModal} />
  //   ) : (
  //     ''
  //   );

  let deleteButton = <Label onClick={() => deleteTag(userId, tagId)}>Delete</Label>;

  // useEffect(() => {
  //   console.log('태그 변경시마다?');
  //   setOpenEditTag(false);
  // }, [eachTag]);

  return (
    <TagWarp>
      <TagsName>{editTagName}</TagsName>
      <TagsDescription>{editTagDescription}</TagsDescription>
      <TagsEdit>{editButton}</TagsEdit>
      <TagsDelete>{deleteButton}</TagsDelete>
    </TagWarp>
  );
}

const TagWarp = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  align-items: center;
  margin: 10px 3px;
  /* height: 20px; */
`;

const TagsName = styled.div`
  display: flex;
  flex: 3;
  text-align: justify;
  margin-left: 10px;
`;
const TagsDescription = styled.div`
  display: flex;
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

const Label = styled.label`
  margin: 0;
`;

const TagIcon = styled.div<{ tagColor: string }>`
  border-radius: 10px;
  background-color: ${props => props.tagColor};
  color: white;
  font-weight: bold;
  padding: 4px;
`;
