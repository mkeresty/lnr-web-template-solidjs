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
  
    const { store, setStore } = useGlobalContext();

    const getNameData = ()=>{
      if(store().domain){
        setName(store().domain);
        console.log(name())
      }
      else{
        setRouteTo("Home")
      }

    }

    const setRouteTo = (route) => {
        const prev = store()
        var toSet = {route: route}
        setStore({...prev, ...toSet});
    }



  onMount(async () => {
    setLoading(true);
    getNameData();
    setLoading(false);
  });
  


      return(
        <div class="page"> 
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
                <div class="container p-4 pt-8 has-text-left">
                        <h4 class="title is-4 has-light-text wh">
                            {name().name}
                        </h4>
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
            <div class="content p-4">
              
            <h3 class="title is-3">
              Owner
            </h3>
            <h4 class="subtitle is-4">
              {name().owner}
            </h4>
            <hr class="solid"/>
            <h3 class="title is-3">
              ByteCode
            </h3>
            <h4 class="subtitle is-4">
              {name().bytes}
            </h4>
            <hr class="solid"/>
            <h3 class="title is-3">
              Resolver
            </h3>
            <h4 class="subtitle is-4">
              res
              <Show
                when={store().userAddress == name().owner}>
                  <button class="button">Set Primary</button>
              </Show>
            </h4>
            <hr class="solid"/>
            <h3 class="title is-3">
              Controller
            </h3>
            <h4 class="subtitle is-4">
              c
              <Show
                when={store().userAddress == name().owner}>
                  <button class="button">Set Controller</button>
              </Show>
            </h4>
            

            </div>
            </div>
        </div>
      )
}

export default Domain;