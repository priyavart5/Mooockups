'use client'

import React from 'react';
import styles from './styles.module.scss';
import { Tooltip } from 'react-tippy';
import 'react-tippy/dist/tippy.css';

interface IconProps {
  icon: React.ElementType;
  color: string;
  size: number | string;
  strokeWidth: number;
  onClick?: () => void;
  tipTitle: string;
  tipPosition: 'top' | 'bottom' | 'left' | 'right';
}

const Icon: React.FC<IconProps> = ({ icon: Icon, color, size, strokeWidth, tipTitle, tipPosition, onClick }) => {
  return (
    // @ts-expect-error is necessary
    <Tooltip
      title={tipTitle}
      position={tipPosition}
      trigger="mouseenter"
      size="small"
      animation="fade"
    >
      <div className={styles.icon} onClick={onClick}>
          <span>
              <Icon color={color} size={size} strokeWidth={strokeWidth} />
          </span>
      </div>
    </Tooltip>
  );
};

export default Icon;
