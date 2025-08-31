import React, { JSX } from 'react';

interface Props {
  text: string;
  clasName?: string;
  onClick?: () => void;
}

function Button(props: Props): JSX.Element {
  return (
    <button className={props.clasName} onClick={props.onClick}>
      {props.text}
    </button>
  );
}

export default Button;
