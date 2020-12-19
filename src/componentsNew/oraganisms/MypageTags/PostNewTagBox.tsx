import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import ColorPicker from '../../molecules/sidebar/sidebarCalUnits/ColorPicker';

import { InputMolecule } from '../../molecules';

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
      <div style={{ flex: 3, display: 'flex', width: '100%', justifyContent: 'center' }}>
        <InputMolecule
          text="Tag 이름"
          type="text"
          name="New Tagname"
          placeholder="New Tagname"
          smLabel={1}
          smInput={3}
          handleChange={handleNewTagName}
          className="NewTagName"
        />
      </div>

      <div style={{ flex: 3, display: 'flex', width: '100%', justifyContent: 'center' }}>
        <InputMolecule
          text="Tag 설명"
          type="text"
          name="Description(Optional)"
          placeholder="Description(Optional)"
          smLabel={1}
          smInput={3}
          handleChange={handleSetNewTagDes}
          className="NewTagDescription"
        />
      </div>

      <div style={{ flex: 1, display: 'flex', width: '100%', justifyContent: 'center' }}>
        <div
          style={{
            flex: 2,
            display: 'flex',
            width: '100%',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          Tag color
        </div>

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
      </div>

      <div
        style={{
          flex: 2,
          display: 'flex',
          width: '100%',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <button style={{ width: '70px', height: '40px' }} onClick={togglePostNewTagBoxButton}>
          cancel
        </button>

        <button
          style={{ width: '70px', height: '40px' }}
          onClick={() => {
            postNewTag(userId, newCalcolor, newTagName, newTagDes);
          }}
        >
          create
        </button>
      </div>
    </NewTagBox>
  );
}

const NewTagBox = styled.div<{ showPostNewTagBox?: boolean }>`
  display: ${props => (props.showPostNewTagBox ? 'flex' : 'none')};
  flex: 1;
  width: 100%;
  padding: 5px;
`;
