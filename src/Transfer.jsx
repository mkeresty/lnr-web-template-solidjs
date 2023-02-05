import styles from './App.module.css';
import * as THREE from 'three';
import { createSignal, Switch, Match } from 'solid-js';


const Transfer = () =>{
    var og = window.parent.og;
    const [name, setName] = createSignal('');
    const [transferAddress, setTransferAddress] = createSignal();
  
    async function transferOg(){
      var walletAddress = await og.signer.getAddress();
      var checked = await og.lnr.owner(name())
      if(checked && checked[0] == walletAddress){
        var signature = await og.lnr.transfer(transferAddress(), name());
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
              <h3 class="title is-3 has-text-light">Transfer</h3>
                  <input  
                    class="input m-3" type="text" placeholder="name"
                    onInput={(e) => {
                      setName(e.target.value)
                    }}/>
                    <br />
                    <input  
                    class="input m-3" type="text" placeholder="address"
                    onInput={(e) => {
                      setTransferAddress(e.target.value)
                    }}/>
                  <button class="button is-outlined m-3" onClick={transferOg}>Transfer</button>
          </div>
      </div>
  </div>
  </div>
    )
  }
  

export default Transfer