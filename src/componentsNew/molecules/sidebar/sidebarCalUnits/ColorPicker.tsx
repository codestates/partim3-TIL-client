import React, { useState } from 'react';
import styled from 'styled-components';
import { TwitterPicker } from 'react-color';

interface MakeNewCalProps {
  handleNewCalColor: (color: string) => void;
  currentColor: string;
}

export default function ColorPicker({ handleNewCalColor, currentColor }: MakeNewCalProps) {
  const [displayColorPicker, setDisplayColorPicker] = useState(false);
  // const [color, setColor] = useState('');

  const handleClick = () => {
    setDisplayColorPicker(!displayColorPicker);
  };

  const handleClose = () => {
    setDisplayColorPicker(false);
  };

  const handleChange = (color: colorType) => {
    handleNewCalColor(color.hex);
  };

  interface colorType {
    hex: string;
  }

  const styles = {
    color: {
      width: '30px',
      height: '30px',
      borderRadius: '4px',
      // margin: '3px',
      marginLeft: '3px',
      marginRight: '3px',
      background: `${currentColor || '#0693E3'}`,
    },
    swatch: {
      padding: '1px',
      background: '#fff',
      borderRadius: '1px',
      boxShadow: '0 0 0 1px white',
      // display: 'inline-block',
      cursor: 'pointer',
    },
  };

  return (
    <ColorPickerWrap>
      <div style={styles.swatch} onClick={handleClick}>
        <div style={styles.color} />
      </div>
      {displayColorPicker ? (
        <div
          style={{
            position: 'absolute',
            zIndex: 2,
          }}
        >
          <div
            style={{
              position: 'fixed',
              top: '0px',
              right: '0px',
              bottom: '0px',
              left: '0px',
            }}
            onClick={handleClose}
          />
          <TwitterPicker color={currentColor} onChange={handleChange} />
        </div>
      ) : null}
    </ColorPickerWrap>
  );
}

const ColorPickerWrap = styled.div`
  /* flex: 1; */
`;
