import styles from '../App.module.css';
import * as THREE from 'three';
import { createSignal, onMount, Show } from 'solid-js';
import { nameLookup, handleEthers, getWrappedNames, getUnwrappedNames } from '../utils/nameUtils';

const Home = () => {

  const testfun =async () =>{
    await getUnwrappedNames();
  }


    return(
      <div class="page">
        <br />
        <div class="columns is-mobile">  
  
        <div class="column is-10 is-offset-1 pb-10">
          <div class="card lg has-text-centered">
          <br/>
          <p class="title has-text-light">
          home.og
          </p>
          <button onClick={testfun}>test</button>
          <br/>
          </div>
      </div>
      </div>
      </div>
    )
  }
  
  export default Home;