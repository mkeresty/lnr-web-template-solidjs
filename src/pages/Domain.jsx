import styles from '../App.module.css';
import * as THREE from 'three';
import { createSignal, Switch, Match, children, createEffect, mergeProps, Show, onMount } from 'solid-js';
import { nameLookup, handleEthers, getWrappedNames, getUnwrappedNames, getAllNames } from '../utils/nameUtils';
import { useGlobalContext } from '../GlobalContext/store';

const Domain = () =>{

    var og = window.parent.og;

    const [name, setName] = createSignal({bytes: undefined, name: undefined, isValid: undefined, tokenId: undefined, status: undefined, owner: undefined});
    const [namesCount, setNamesCount] = createSignal(0);
    const [wrappedCount, setWrappedCount] = createSignal(0);
    const [loading, setLoading] = createSignal(false);
    const [transferAddress, setTransferAddress] = createSignal();
    const [transferModal, setTransferModal] = createSignal(false);
    const [primaryAddress, setPrimaryAddress] = createSignal();
    const [controllerAddress, setControllerAddress] = createSignal();
  
    const { store, setStore } = useGlobalContext();

    const getNameData = ()=>{
      if(store().domain){
        setName(store().domain);
        console.log(name());
        setControllerAddress(store().owner);
      }
      else{
        setRouteTo("Home")
      }

    }

    const getPrimaryAndController = (name)=>{
      //do stuff
      return
    }

    createEffect(()=>{
      console.log(transferModal(), "m")
    })

    const setRouteTo = (route) => {
        const prev = store()
        var toSet = {lastRoute: 'Domain',route: route}
        setStore({...prev, ...toSet});
    }

    const goBack = ()=>{
      const prev = store()
      setRouteTo(prev.lastRoute)
    }



  onMount(async () => {
    setLoading(true);
    getNameData();
    setLoading(false);
  });
  


      return(
        <div class="page"> 
                    <div classList={{"modal": true , "is-active":transferModal()}}>   
                  <div class="box dark-bg">
                  <h3 class="title is-3 wh profilePrimary">
                            {name().name}
                        </h3>
                    <br />
                    <input  
                    class="input mt-3 mb-3 dark-bg wh" type="text" placeholder="primary.og or address"
                    onInput={(e) => {

                      setTransferAddress(e.target.value)
                    }}/>
                  <div class="spaceRow">
                  <button class="button tagCount is-pulled-right" onClick={()=>setTransferModal(false)}>close</button>
                  <button class="button tagCount">Transfer</button>
                  </div>

                  </div>


<button class="modal-close is-large" aria-label="close"></button>
</div>
        <div class="spaceRow ml-4">
          <button class="button tagCount is-pulled-left" onClick={goBack}>back</button>
          <Show
            when={store().userAddress == name().owner}>
              <button class="button tagCount is-pulled-right" onClick={()=>setTransferModal(true)}>transfer</button>
          </Show>
        </div>
            <div class="columns" >
                <div class="column ">
                    <div class="block  bw">
                        <div class="box lg profileCard">
                    <img class="profileL" src="https://linagee.vision/LNR_L_Icon_White.svg" width="40" height="12"/>
                        <h3 class="title is-3 wh profilePrimary">
                            {name().name}
                        </h3>
                        </div>
                    </div>
                </div>
                <div class="column  centerColumn profileInfo">
                <div class="container p-4 pt-8 has-light-text wh has-text-left">
                <div class="is-hidden-mobile spacer"></div>
                        <h3 class="title is-3 wh">
                            {name().name}
                        </h3>
                        < br />
                        <div class="tags are-medium">
                          <span class="tag tagCount">
                              {name().status}
                          </span>
                          <Show
                            when={name().isValid == "true"}
                            fallback={<span class="tag is-danger ml-7 mr-7 has-text-white-bis">Invalid</span>}>
                                <span class="tag is-success ml-7 mr-7 has-text-white-bis">Valid</span>
                            </Show>

                        </div>
                    </div>
                    
                </div>
            </div>
            <div class="block  bw">
            <div class="content p-4 has-text-left wh">
              
            <h5 class="title is-5 wh">
              Owner
            </h5>
            <h6 class="subtitle is-6 wh">
              {name().owner}
            </h6>
            <hr class="solid"/>
            <h5 class="title is-5 wh">
              ByteCode
            </h5>
            <h6 class="subtitle is-6 wh">
              {name().bytes}
            </h6>
            <hr class="solid"/>
            <h5 class="title is-5 wh">
              Resolver
            </h5>
            <div class="spaceRow">
            <input  
              class="input dark-bg wh mw" type="text" placeholder="No primary set"
              onInput={(e) => {
                setPrimaryAddress(e.target.value)
              }}/>
              <Show
                when={store().userAddress == name().owner}>
                  <button class="button tagCount">Set Primary</button>
              </Show>
              </div>
            <hr class="solid"/>
            <h5 class="title is-5 wh">
              Controller
            </h5>
            <div class="spaceRow">

              {/* SHOW ALL CONTROLLERS */}

            <input  
              class="input dark-bg wh mw" type="text" placeholder="No controller set"
                    onInput={(e) => {
                      setController(e.target.value)
                    }}/>
              <Show
                when={store().userAddress == name().owner}>
                  <button class="button tagCount">Set Controller</button>
              </Show>
              </div>
            

            </div>
            </div>
           


        </div>

      )
}

export default Domain;