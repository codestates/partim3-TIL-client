// import React from 'react'
// import Button from 'react-bootstrap/Button';

// import React from 'react';
// import { render } from 'react-dom';


// interface ButtonProps {
//     color?: string
//   }
  
// // export default const Button: ButtonProps = () => (<button >hoho</button>)

// export default function Button: ButtonProps () {
//     return (
//         <div>
//             <Button>버튼이다</Button>
//         </div>
//     )
// }


import React, { StatelessComponent } from 'react'

interface ButtonProps {
  color: string
}


const Button: StatelessComponent<ButtonProps> = ({color}) => (
  <div>
      confirm
      <button style={{ color }}>hihi</button>
  </div>
)
  
export default Button