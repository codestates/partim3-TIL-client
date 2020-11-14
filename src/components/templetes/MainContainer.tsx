import React from 'react';
import { Link } from 'react-router-dom';

export default function MainContainer() {
  return (
    <div>
      <div>
        <Link to="/signup"> signUp </Link>
      </div>
      <div>
        <Link to="/login"> login </Link>
      </div>
    </div>
  );
}
