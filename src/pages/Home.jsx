import styles from '../App.module.css';
import * as THREE from 'three';
import { createSignal, onMount, Show, For } from 'solid-js';
import { nameLookup, handleEthers, getWrappedNames, getUnwrappedNames, getAllNames } from '../utils/nameUtils';

const Home = () => {
  var og = window.parent.og;
  const [names, setNames] = createSignal('');
  const [namesCount, setNamesCount] = createSignal(0);

  const getNames =async () =>{
    var walletAddress = await og.signer.getAddress();
    var test = "0x59657D79Fb2c0fa2C38C576f08866632Cf7729a6"
    var repNames = await getAllNames(test);
    setNames(repNames);
    setNamesCount(repNames.length);
    console.log(repNames)
  }

  const testfunwrapped =async () =>{
    await getWrappedNames();
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
          
          <br/>
          </div>
          <button class="button is-outlined m-3" onClick={getNames}>get names</button>
          <br />
          {namesCount}
          <br/>
  
          <For each={names()}>{(item, i) =>
  
          <div class="box is-ancestor">
                  <div class="tile  m-1">
                    <p class="title is-4">{item.name}</p>
                    <br />
                    <p class="subtitle is-6">{item.status}</p>
                  </div>
            </div>
       
      }</For>
      

      </div>
      </div>
      </div>
    )
  }
  
  export default Home;