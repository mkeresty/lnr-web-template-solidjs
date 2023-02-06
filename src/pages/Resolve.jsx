import styles from '../App.module.css';
import * as THREE from 'three';
import { createSignal, Switch, Match } from 'solid-js';
import MessageBox from '../components/MessageBox';
import { nameLookup, resolveOrReturn } from '../utils/nameUtils';

const Resolve = () =>{
  var og = window.parent.og;
  const [name, setName] = createSignal('');
  const [otherAddress, setOtherAddress] = createSignal();
  const [showModal, setShowModal] = createSignal(false);
  const [modalType, setModalType] = createSignal('nothisstart');
  const [modalName, setModalName] = createSignal('Lorem ipsum');
  const [modalOwner, setModalOwner] = createSignal('Lorem ipsum');
  const [modalSignature, setModalSignature] = createSignal('Lorem ipsum');
  const [modalMessage, setModalMessage] = createSignal('Lorem ipsum');

  async function setPrimary(){
    const currentName = name();
    var isValid = await og.lnr.isValidDomain(currentName);
    if(isValid[0] == false){
      var message = <>{currentName} - {isValid[1]}</>
      return(controlBox('format', currentName, "null", isValid[1], message))
    }
    var walletAddress = await og.signer.getAddress();
    var isOwner = await lnr.verifyIsNameOwner(name(), walletAddress);
    var checked = await og.lnr.owner(name())
    var primary = await og.lnr.owner(name())
    if(checked && isOwner && primary == null){
      var signature = await og.lnr.setPrimary(name());
      var message = <>{currentName} set as primary <a href={`https://etherscan.io/address/${checkedAddress}`} target="_blank"> View on Etherscan</a></>;
      controlBox("success", currentName, walletAddress, "null", message)
      return(signature);
    }
    if(!isOwner){
      var message = <>You do not own or control {currentName}</>
      return(controlBox("warning", currentName, walletAddress, "null", message))
    }
    if(primary !== null){
      var curPrimary = await og.lnr.resolveName(currentName);
      var message = <>{currentName} is primary for {curPrimary}</>
      return(controlBox("warning", currentName, walletAddress, "null", message))
    }
    else{
      var message = <>Oops something went wrong</>;
      controlBox("warning", currentName, walletAddress, "null", message)
    }
    return
  }

  async function unsetPrimary(){
    const currentName = name();
    var isValid = await og.lnr.isValidDomain(currentName);
    if(isValid[0] == false){
      var message = <>{currentName} - {isValid[1]}</>
      return(controlBox('format', currentName, "null", isValid[1], message))
    }
    var walletAddress = await og.signer.getAddress();
    var isOwner = await lnr.verifyIsNameOwner(name(), walletAddress);
    var checked = await og.lnr.owner(name())
    var primary = await og.lnr.owner(name())
    if(checked && isOwner && primary !== null){
      var signature = await og.lnr.unsetPrimary(name());
      var message = <>{currentName} unset <a href={`https://etherscan.io/address/${checkedAddress}`} target="_blank"> View on Etherscan</a></>;
      controlBox("success", currentName, walletAddress, "null", message)
      return(signature);
    }
    if(!isOwner){
      var message = <>You do not own or control {currentName}</>
      return(controlBox("warning", currentName, walletAddress, "null", message))
    }
    else{
      var message = <>Oops something went wrong</>;
      controlBox("warning", currentName, walletAddress, "null", message)
    }
    return
  }


  async function setController(){
    const currentName = name();
    var isValid = await og.lnr.isValidDomain(currentName);
    if(isValid[0] == false){
      var message = <>{currentName} - {isValid[1]}</>
      return(controlBox('format', currentName, "null", isValid[1], message))
    }
    var walletAddress = await og.signer.getAddress();
    var checked = await og.lnr.owner(name())
    var nameorAddress = await nameLookup(otherAddress())
    if(checked && checked[0] == walletAddress){
      var signature = await og.lnr.setController(name(), otherAddress());
      var message = <>Controller set for {currentName}  - {nameorAddress}<a href={`https://etherscan.io/address/${checkedAddress}`} target="_blank"> View on Etherscan</a></>;
      controlBox("success", currentName, walletAddress, "null", message)
      return(signature);
    }
    if(checked[0] !== walletAddress){
      var message = <>You do not own {currentName}</>
      return(controlBox("warning", currentName, walletAddress, "null", message))
    }
    else{
      var message = <>Oops something went wrong</>;
      controlBox("warning", currentName, walletAddress, "null", message)
    }
    return
  }

  async function unsetController(){
    const currentName = name();
    var isValid = await og.lnr.isValidDomain(currentName);
    if(isValid[0] == false){
      var message = <>{currentName} - {isValid[1]}</>
      return(controlBox('format', currentName, "null", isValid[1], message))
    }
    var walletAddress = await og.signer.getAddress();
    var checked = await og.lnr.owner(name())
    var nameorAddress = await nameLookup(otherAddress())
    if(checked && checked[0] == walletAddress){
      var signature = await og.lnr.unsetController(name(), otherAddress());
      var message = <>Controller removed for {currentName} - {nameorAddress}<a href={`https://etherscan.io/address/${checkedAddress}`} target="_blank"> View on Etherscan</a></>;
      controlBox("success", currentName, walletAddress, "null", message)
      return(signature);
    }
    if(checked[0] !== walletAddress){
      var message = <>You do not own {currentName}</>
      return(controlBox("warning", currentName, walletAddress, "null", message))
    }
    else{
      var message = <>Oops something went wrong</>;
      controlBox("warning", currentName, walletAddress, "null", message)
    }
    return
  }

  const controlBox = (boxType, currentName, ownerAddress, signature, message)=>{
    console.log("showing modal")
    setModalType(boxType);
    setModalName(currentName);
    setModalOwner(ownerAddress);
    setModalSignature(signature);
    setModalMessage(message);
    setShowModal(true);
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
                    setShowModal(false); 
                    setName(e.target.value)
                  }}/>
                  <input  
                  class="input m-3" type="text" placeholder="address"
                  onInput={(e) => {
                    setShowModal(false); 
                    setOtherAddress(e.target.value)
                  }}/>
                <button class="button is-outlined m-3" onClick={setPrimary}>Set Primary</button>
                <button class="button is-outlined m-3" onClick={unsetPrimary}>Unset Primary</button>
                <button class="button is-outlined m-3" onClick={setController}>Set Controller</button>
                <button class="button is-outlined m-3" onClick={unsetController}>Unset Controller</button>
                <Show when={showModal()}>
                    <MessageBox
                    type={modalType()}
                    name={modalName()}
                    owner={modalOwner()}
                    signature={modalSignature()}
                    message={modalMessage()}
                    onOk={() => {
                        setModalType('WARNING');
                        setShowModal(false);
                    }}>
                    </MessageBox>
                </Show>
        </div>
    </div>
</div>
</div>
  )
}

export default Resolve