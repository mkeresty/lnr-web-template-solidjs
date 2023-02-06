import styles from './App.module.css';
import * as THREE from 'three';
import { createSignal, Switch, Match, children, createEffect, mergeProps, Show, onMount } from 'solid-js';

const MintBox = (props) => {
    console.log("showing", props)
  const merged = mergeProps({
    type: 'start',
    name: 'null',
    owner: 'null',
    signature: 'null',
    onOk: () => console.log('Ok')
  }, props); 

  var msg = "";
  if(props.type == "warning"){
    var msg = <>{props.name} is owned by <a href={`https://etherscan.io/address/${props.owner}`} target="_blank"> {props.owner}</a></>
  } 
  if(props.type == "success"){
    var msg = <> {props.name} minted! <a href={`https://etherscan.io/tx/${props.signature}`} target="_blank">View on Etherscan</a></>
  }
  if(props.type == "format"){
    var msg = <>{props.name} - {props.signature}</>
  } 

  return(
    <Show
    when={props.type == "success"}
    fallback={
        <div class="box errorBox">
       {msg}
    </div>
    }
  >
    <div class="box successBox">
    {msg}
    </div>
    </Show>
  )
};

const Mint = () =>{
    var og = window.parent.og;
    const [name, setName] = createSignal('');
    const [errorBorder, setErrorBorder] = createSignal(false);

    const [showModal, setShowModal] = createSignal(false);
    const [modalType, setModalType] = createSignal('nothisstart');
    const [modalName, setModalName] = createSignal('Lorem ipsum');
    const [modalOwner, setModalOwner] = createSignal('Lorem ipsum');
    const [modalSignature, setModalSignature] = createSignal('Lorem ipsum');

    onMount(() => {
        if (showModal()) {
          setTimeout(() => {
            setModalType('SUCCESS');
            setModalName('Everything is good');
          }, 1500);
    
          setTimeout(() => {
            setModalType('ERROR');
            setModalName('Something is wrong');
          }, 3000);
        }
      });


    async function mintOg(){
      const currentName = name();
      var isValid = await og.lnr.isValidDomain(currentName)
      if(isValid[0] == false){
        return(controlBox('format', currentName, "null", isValid[1]))
      }
      var walletAddress = await og.signer.getAddress();
      var checked = await og.lnr.owner(currentName);
      if(checked == null){
        var signature = await og.lnr.reserve(currentName);
        setBoxProps({error: false, signature: signature});
        if(signature){
            controlBox("success", currentName, walletAddress, signature);
        }
        return(signature);
      }
      if(checked && checked[0]){
        controlBox("warning", currentName, checked[0], "null")
        return(checked[0])
      }
      return
    }

    const controlBox = (boxType, currentName, ownerAddress, signature)=>{
        setModalType(boxType);
        setModalName(currentName);
        setModalOwner(ownerAddress);
        setModalSignature(signature);
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
              <h3 class="title is-3 has-text-light">Mint</h3>
                  <input  
                    class="input m-3" classList={{errorClass: errorBorder() === true}} type="text" placeholder="name.og"
                    onInput={(e) => {
                      setShowModal(false); 
                      setName(e.target.value)
                    }}/>      
                    <button class="button is-outlined m-3" onClick={mintOg}>Mint</button>
                <Show when={showModal()}>
                    <MintBox
                    type={modalType()}
                    name={modalName()}
                    owner={modalOwner()}
                    signature={modalSignature()}
                    onOk={() => {
                        setModalType('WARNING');
                        setShowModal(false);
                    }}>
                    </MintBox>
                </Show>
                
          </div>
      </div>
  </div>
  </div>
    )
  }
  
  
export default Mint;  