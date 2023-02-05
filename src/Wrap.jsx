import styles from './App.module.css';
import * as THREE from 'three';
import { createSignal, Switch, Match } from 'solid-js';


const Wrap = () =>{
    var og = window.parent.og;
    const [name, setName] = createSignal('');

    async function createWrapper(){
      var walletAddress = await og.signer.getAddress();
      var checked = await og.lnr.owner(name())
      if(checked && checked[0] == walletAddress){
        var signature = await og.lnr.createWrapper(name());
        return(signature);
      }
      return
  
    }
  
    async function transferToWrapper(){
      var walletAddress = await og.signer.getAddress();
      var checked = await og.lnr.owner(name())
      var waiting = await og.lnr.waitForWrap(name());
      if(checked && checked[0] == walletAddress && waiting == walletAddress){
        var signature = await og.lnr.transfer(lnr.wrapperAddress, name());
        return(signature);
      }
      return
    }
  
    async function wrapName(){
      var checked = await og.lnr.owner(name())
      if(checked && checked[0] == lnr.wrapperAddress){
        var signature = await og.lnr.wrap(name());
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
              <h3 class="title is-3 has-text-light">Wrap</h3>
                  <input  
                    class="input m-3" type="text" placeholder="name"
                    onInput={(e) => {
                      setName(e.target.value)
                    }}/>
                  <button class="button is-outlined m-3" onClick={createWrapper}>Create Wrapper</button>
                  <button class="button is-outlined m-3" onClick={transferToWrapper}>Transfer to Wrapper</button>
                  <button class="button is-outlined m-3" onClick={wrapName}>Wrap</button>
          </div>
      </div>
  </div>
  </div>
    )
  }
  
  

export default Wrap;