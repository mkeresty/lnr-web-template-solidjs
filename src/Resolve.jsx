import styles from './App.module.css';
import * as THREE from 'three';
import { createSignal, Switch, Match } from 'solid-js';


const Resolve = () =>{
  var og = window.parent.og;
  const [name, setName] = createSignal('');
  const [otherAddress, setOtherAddress] = createSignal();

  async function setPrimary(){
    var walletAddress = await og.signer.getAddress();
    var isOwner = await lnr.verifyIsNameOwner(name(), walletAddress);
    var checked = await og.lnr.owner(name())
    var primary = await og.lnr.owner(name())
    if(checked && isOwner && primary == null){
      var signature = await og.lnr.setPrimary(name());
      return(signature);
    }
    return
  }

  async function unsetPrimary(){
    var walletAddress = await og.signer.getAddress();
    var isOwner = await lnr.verifyIsNameOwner(name(), walletAddress);
    var checked = await og.lnr.owner(name())
    var primary = await og.lnr.owner(name())
    if(checked && isOwner && primary !== null){
      var signature = await og.lnr.unsetPrimary(name());
      return(signature);
    }
    return
  }


  async function setController(){
    var walletAddress = await og.signer.getAddress();
    var checked = await og.lnr.owner(name())
    var otherOwner = await lnr.verifyIsNameOwner(name(), otherAddress());
    if(checked && checked[0] == walletAddress && !otherOwner){
      var signature = await og.lnr.setController(name(), otherAddress());
      return(signature);
    }
    return
  }

  async function unsetController(){
    var walletAddress = await og.signer.getAddress();
    var checked = await og.lnr.owner(name())
    var otherOwner = await lnr.verifyIsNameOwner(name(), otherAddress());
    if(checked && checked[0] == walletAddress && otherOwner){
      var signature = await og.lnr.unsetController(name(), otherAddress());
      return(signature);
    }
    return
  }

  async function checkOg(){
    const currentName = name();
    var ogStatus = await og.owner(currentName)
    return(ogStatus)
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
            <h3 class="title is-3 has-text-light">Resolve</h3>
                <input  
                  class="input m-3" type="text" placeholder="name"
                  onInput={(e) => {
                    setName(e.target.value)
                  }}/>
                  <input  
                  class="input m-3" type="text" placeholder="address"
                  onInput={(e) => {
                    setOtherAddress(e.target.value)
                  }}/>
                <button class="button is-outlined m-3" onClick={setPrimary}>Set Primary</button>
                <button class="button is-outlined m-3" onClick={unsetPrimary}>Unset Primary</button>
                <button class="button is-outlined m-3" onClick={setController}>Set Controller</button>
                <button class="button is-outlined m-3" onClick={unsetController}>Unset Controller</button>
        </div>
    </div>
</div>
</div>
  )
}

export default Resolve