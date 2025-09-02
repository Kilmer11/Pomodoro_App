import React, { JSX } from 'react';

interface Props {
  text: string;
  className?: string;
  onClick?: () => void;
}

function Button(props: Props): JSX.Element {
  return (
    <button className={props.className} onClick={props.onClick}>
      {props.text}
    </button>
  );
}

export default Button;
