import styles from './App.module.css';
import * as THREE from 'three';
import { createSignal, Switch, Match } from 'solid-js';


const Mint = () =>{
    var og = window.parent.og;
    const [name, setName] = createSignal('');

    async function mintOg(){
      const currentName = name();
      var checked = await og.lnr.owner(currentName)
      if(!checked){
        var signature = await og.lnr.reserve(currentName);
        return(signature);
      }
      return
    }
  

  
    return(
      <div class="page">
  <br/>
  <div class="columns is-mobile">  
  
  <div class="column is-10 is-offset-1 pb-10">
          <div class="card lg has-text-centered">
          <br/>
          <p class="title has-text-light">
          This entire site is on chain
          </p>
          <br/>
          </div>
      </div>
      </div>
  <div class="columns is-mobile">   
      <div class="column is-half is-offset-one-quarter mt-6">
          <div class="block has-text-centered">
              <h3 class="title is-3 has-text-light">Mint</h3>
                  <input  
                    class="input m-3" type="text" placeholder="name"
                    onInput={(e) => {
                      setName(e.target.value)
                    }}/>
                  <button class="button is-outlined m-3" onClick={mintOg}>Mint</button>
          </div>
      </div>
  </div>
  </div>
    )
  }
  
  
export default Mint;  