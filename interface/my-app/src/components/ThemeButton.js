// src/components/ThemeButton.js
import React from 'react';
import { useTheme } from '../ThemeContext';
import { Button } from 'antd';

const savedTheme = localStorage.getItem('theme') || 'light';
document.body.className = savedTheme;

const ThemeButton = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <Button onClick={toggleTheme}>
      Switch to {theme === 'light' ? 'Dark' : 'Light'} Mode
    </Button>
  );
};

export default ThemeButton;
