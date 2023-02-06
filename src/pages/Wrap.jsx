import styles from '../App.module.css';
import * as THREE from 'three';
import { createSignal, Switch, Match } from 'solid-js';
import MessageBox from '../components/MessageBox';
import { nameLookup, resolveOrReturn } from '../utils/nameUtils';

const Wrap = () =>{
    var og = window.parent.og;
    const [name, setName] = createSignal('');
    const [showModal, setShowModal] = createSignal(false);
    const [modalType, setModalType] = createSignal('nothisstart');
    const [modalName, setModalName] = createSignal('Lorem ipsum');
    const [modalOwner, setModalOwner] = createSignal('Lorem ipsum');
    const [modalSignature, setModalSignature] = createSignal('Lorem ipsum');
    const [modalMessage, setModalMessage] = createSignal('Lorem ipsum');

    async function createWrapper(){
      const currentName = name();
      var isValid = await og.lnr.isValidDomain(currentName);
      if(isValid[0] == false){
        var message = <>{currentName} - {isValid[1]}</>
        return(controlBox('format', currentName, "null", isValid[1], message))
      }
      var walletAddress = await og.signer.getAddress();
      var checked = await og.lnr.owner(name())
      if(checked[0] !== walletAddress){
        var message = <>You do not own {currentName}</>
        return(controlBox("warning", currentName, walletAddress, "null", message))
      }
      if(checked && checked[0] == walletAddress){
        var signature = await og.lnr.createWrapper(name());
        var message = <>Wrapper created for <a href={`https://etherscan.io/tx/${signature}`} target="_blank"> {currentName}</a></>;
        controlBox("success", currentName, walletAddress, "null", message)
        return(signature);
      }
      else{
        var message = <>Oops something went wrong</>;
        controlBox("warning", currentName, walletAddress, "null", message)
      }
      return
    }
  
    async function transferToWrapper(){
      const currentName = name();
      var isValid = await og.lnr.isValidDomain(currentName);
      if(isValid[0] == false){
        var message = <>{currentName} - {isValid[1]}</>
        return(controlBox('format', currentName, "null", isValid[1], message))
      }
      var walletAddress = await og.signer.getAddress();
      var checked = await og.lnr.owner(name())
      var waiting = await og.lnr.waitForWrap(name());
      if(checked[0] !== walletAddress){
        var message = <>You do not own {currentName}</>
        return(controlBox("warning", currentName, walletAddress, "null", message))
      }
      if(waiting !== walletAddress){
        var message = <>Wrapper not created for {currentName}</>
        return(controlBox("warning", currentName, walletAddress, "null", message))
      }
      if(checked && checked[0] == walletAddress && waiting == walletAddress){
        var signature = await og.lnr.transfer(lnr.wrapperAddress, name());
        var message = <>{currentName} transferred to <a href={`https://etherscan.io/tx/${signature}`} target="_blank"> wrapper</a></>;
        controlBox("success", currentName, walletAddress, "null", message)
        return(signature);
      }
      else{
        var message = <>Oops something went wrong</>;
        controlBox("warning", currentName, walletAddress, "null", message)
      }
      return
    }
  
    async function wrapName(){
      const currentName = name();
      var isValid = await og.lnr.isValidDomain(currentName);
      if(isValid[0] == false){
        var message = <>{currentName} - {isValid[1]}</>
        return(controlBox('format', currentName, "null", isValid[1], message))
      }
      var checked = await og.lnr.owner(name())
      if(checked && checked[0] == walletAddress && checked[1] == "unwrapped"){
        var signature = await og.lnr.wrap(name());
        var message = <>{currentName} wrapped! <a href={`https://etherscan.io/tx/${signature}`} target="_blank"> View on Etherscan</a></>;
        controlBox("success", currentName, walletAddress, "null", message)
        return(signature);
      }
      else{
        var message = <>Oops something went wrong</>;
        controlBox("warning", currentName, walletAddress, "null", message)
      }
      return
    }

    async function unwrapName(){
      const currentName = name();
      var isValid = await og.lnr.isValidDomain(currentName);
      if(isValid[0] == false){
        var message = <>{currentName} - {isValid[1]}</>
        return(controlBox('format', currentName, "null", isValid[1], message))
      }
      var checked = await og.lnr.owner(name())
      if(checked && checked[0] == walletAddress && checked[1] == "wrapped"){
        var signature = await og.lnr.wrap(name());
        var message = <>{currentName} unwrapped! <a href={`https://etherscan.io/tx/${signature}`} target="_blank"> View on Etherscan</a></>;
        controlBox("success", currentName, walletAddress, "null", message)
        return(signature);
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
              <h3 class="title is-3 has-text-light">Wrap</h3>
                  <input  
                    class="input m-3" type="text" placeholder="name"
                    onInput={(e) => {
                      setShowModal(false); 
                      setName(e.target.value)
                    }}/>
                  <button class="button is-outlined m-3" onClick={createWrapper}>Create Wrapper</button>
                  <button class="button is-outlined m-3" onClick={transferToWrapper}>Transfer to Wrapper</button>
                  <button class="button is-outlined m-3" onClick={wrapName}>Wrap</button>
                  <button class="button is-outlined m-3" onClick={unwrapName}>Wrap</button>
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
  
  

export default Wrap;