import React from 'react';
import { zeroLeft } from './zero-left';

function secondsToTime(seconds: number): string {
  // Transforma em um string, e caso n possua menos de duas casas decimais acrescenta um '0'
  const hours = zeroLeft(seconds / 3600);
  const min = zeroLeft((seconds / 60) % 60);
  const sec = zeroLeft((seconds % 60) % 60);

  return `${hours}:${min}:${sec}`;
}

export default secondsToTime;
