import React from 'react';
import { zeroLeft } from './zero-left';

function secondsToMinutes(seconds: number): string {
  // Transforma em um string, e caso n possua menos de duas casas decimais acrescenta um '0'
  const min = zeroLeft((seconds / 60) % 60);
  const sec = zeroLeft((seconds % 60) % 60);

  return `${min}:${sec}`;
}

export default secondsToMinutes;
