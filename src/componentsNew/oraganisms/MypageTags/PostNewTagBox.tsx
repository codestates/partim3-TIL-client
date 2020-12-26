import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import ColorPicker from '../../molecules/sidebar/sidebarCalUnits/ColorPicker';

import { InputMolecule } from '../../molecules';
import { Input } from '../../atoms';

interface PostNewTagBoxProps {
  userId: number;
  showPostNewTagBox: boolean;
  postNewTag: (
    userId: number | null,
    tagColor: string,
    tagName: string,
    description: string,
  ) => void;
  togglePostNewTagBoxButton: () => void;
  tags: Array<{
    id: number;
    tagName: string;
    tagColor: string;
    description: string;
  }>;
}

export default function PostNewTagBox({
  userId,
  showPostNewTagBox,
  postNewTag,
  togglePostNewTagBoxButton,
  tags,
}: PostNewTagBoxProps) {
  const [newTagName, setNewTagName] = useState('');
  const handleNewTagName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewTagName(e.target.value);
  };

  const [newTagDes, setNewTagDes] = useState('');
  const handleSetNewTagDes = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewTagDes(e.target.value);
  };

  const [newCalcolor, setNewCalcolor] = useState('#0693e3');
  const handleNewCalColor = (color: string) => {
    setNewCalcolor(color);
  };

  useEffect(() => {
    (document.querySelector('.NewTagName') as HTMLInputElement).value = '';
    setNewTagName('');
    (document.querySelector('.NewTagDescription') as HTMLInputElement).value = '';
    setNewTagDes('');
    setNewCalcolor('#0693e3');
  }, [tags]);

  return (
    <NewTagBox showPostNewTagBox={showPostNewTagBox}>
      <InputBox style={{ flex: 3 }}>
        <Input
          className="NewTagName"
          type="text"
          name="New Tagname"
          handleChange={handleNewTagName}
          placeholder="New Tagname"
          smInput={3}
        />
      </InputBox>

      <InputBox style={{ flex: 3 }}>
        <Input
          className="NewTagDescription"
          type="text"
          name="Description(Optional)"
          handleChange={handleSetNewTagDes}
          placeholder="Description(Optional)"
          smInput={3}
        />
      </InputBox>

      <InputBox style={{ flex: 1 }}>
        <div
          style={{
            flex: 1,
            display: 'flex',
            width: '100%',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <ColorPicker handleNewCalColor={handleNewCalColor} currentColor={newCalcolor} />
        </div>
      </InputBox>

      <InputBox
        style={{
          flex: 3,
          display: 'flex',
          width: '100%',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <NewTagButton onClick={togglePostNewTagBoxButton}>cancel</NewTagButton>

        <NewTagButton
          onClick={() => {
            postNewTag(userId, newCalcolor, newTagName, newTagDes);
          }}
        >
          create
        </NewTagButton>
      </InputBox>
    </NewTagBox>
  );
}

const NewTagBox = styled.div<{ showPostNewTagBox?: boolean }>`
  display: ${props => (props.showPostNewTagBox ? 'flex' : 'none')};
  flex: 1;
  width: 100%;
  height: 60px;
  margin: 10px 0px;
  padding: 10px;
  border-radius: 10px;
  border: 2px solid lightgrey;
`;

const InputBox = styled.div`
  display: flex;
  width: 100%;
  justify-content: center;
  align-items: center;
  padding: 0px 15px;
`;

const NewTagButton = styled.button`
  width: 80px;
  height: 40px;
  margin: 0px 10px;
  background-color: grey;
  color: white;
  font-weight: bold;
  font-size: 18px;
  border-radius: 10px;
`;
