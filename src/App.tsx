import type { Component } from 'solid-js';
import { Photo } from './components/Photo';

import logo from './logo.svg';
import styles from './App.module.css';


const App: Component = () => {
  return (
    <div class={styles.App}>
       <h1>Astronomy Photo of The Day</h1>
       <Photo/>
    </div>
  );
};

export default App;
