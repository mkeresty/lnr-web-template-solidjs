import styles from '../App.module.css';
import * as THREE from 'three';
import { createSignal, onMount, Show, For } from 'solid-js';
import { nameLookup, handleEthers, getWrappedNames, getUnwrappedNames, getAllNames } from '../utils/nameUtils';

const Home = () => {
  var og = window.parent.og;
  const [name, setName] = createSignal('');
  const [names, setNames] = createSignal('');
  const [namesCount, setNamesCount] = createSignal();

  const getNames =async () =>{
    if(name().length > 0){
      var repNames = await getAllNames(name());
      console.log('reo', repNames)
      if(repNames.length > 1){
        setNames(repNames);
        setNamesCount(repNames.length);
        return
      }
      return

    }
    return

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
          <input  
                    class="input mb-3 mt-3" type="text" placeholder="address"
                    onInput={(e) => {
                      setName(e.target.value)
                    }}/>  
          <button class="button is-outlined m-3" onClick={getNames}>search</button>
          <br />
          <h2 class="title is-2 has-text-white-bis">{namesCount}</h2>
          <br/>
          <div class="columns is-multiline is-mobile">
          <For each={names()}>{(item, i) =>
          <div class="column">
                <div class="tile box is-vertical has-background-dark linagee-border has-text-white-bis fullHeight">
                  <h6 class="title is-4 has-text-white-bis">{item.name}</h6>
                  <h6 class="title is-6 has-text-white-bis">{item.status}</h6>
                
                <Show
                  when={item.isValid == "true"}
                  fallback={
                    <span class="tag is-danger ml-7 mr-7 has-text-white-bis">Invalid</span>
                  }
                >
                  <span class="tag is-success ml-7 mr-7 has-text-white-bis">Valid</span>
                </Show>
                </div>
            </div>
       
      }</For>

</div>
      

      </div>
      </div>
      </div>
    )
  }
  
  export default Home;