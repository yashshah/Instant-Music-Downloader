import { default as React } from 'react';
import styles from '../styles/index.css';

export const HomePage  = ({config}) => {
  return (
    <div>
      <h1>React Boilerplate</h1>
      <p>This React project uses React, Webpack and <span className={styles.blueBg}>Materialize CSS</span> local styles.</p>
      <p>Global Materialize css import works too as you can see on the following button.</p>
    </div>
  )
};