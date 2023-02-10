import styles from '../App.module.css';
import * as THREE from 'three';
import { createSignal, Switch, Match, children, createEffect, mergeProps, Show, onMount } from 'solid-js';
import { nameLookup, handleEthers, getWrappedNames, getUnwrappedNames, getAllNames } from '../utils/nameUtils';
import { useGlobalContext } from '../GlobalContext/store';

const Profile = () =>{

    var og = window.parent.og;

    const [names, setNames] = createSignal([]);
    const [namesCount, setNamesCount] = createSignal(0);
    const [wrappedCount, setWrappedCount] = createSignal(0);
    const [loading, setLoading] = createSignal(false);
  
    const { store, setStore } = useGlobalContext();

    const handleCount = (array)=>{
        const id = "unwrapped";
        const count = array.filter((obj) => obj.id === id).length;
        setWrappedCount(count);
    }
  
    const getNames = async () =>{
      if((store().profileAddress).length > 0){
        var repNames = await getAllNames((store().profileAddress));
        console.log('reo', repNames)
        if(repNames.length > 1){
          setNames(repNames);
          setNamesCount(repNames.length);
          handleCount(repNames);
          return
        }
        return
      }
      return
  
    }

    const setRouteTo = (route) => {
        const prev = store()
        var toSet = {route: route}
        setStore({...prev, ...toSet});
    }



  onMount(async () => {
    setLoading(true);
    await getNames();
    setLoading(false);
  });
  


      return(
        <div class="page"> 
            <div class="columns">
                <div class="column">
                    <div class="box lg">
                        <h3 class="title is-3">
                            primary.og
                        </h3>
                    </div>
                </div>
                <div class="column">
                <div class="box is-transparent">
                        <h3 class="title is-3">
                            primary.og
                        </h3>
                        <h5 class="subtitle is-3">
                            {store().profileAddress} and copy icon
                        </h5>
                        <span class="tag">
                            Total: {namesCount}
                        </span>
                        <span class="tag">
                            Unwrapped: {namesCount() - wrappedCount()}
                        </span>
                        <span class="tag">
                            Wrapped: {wrappedCount}
                        </span>
                    </div>
                    
                </div>
            </div>
            <div class="content">
                <Show when={loading() == true}>
                <progress class="progress is-small is-primary" max="100">15%</progress>
                </Show>
                <table class="table is-transparent">
                    <thead>
                        <tr>
                        <th>Domain</th>
                        <th>Status</th>
                        <th>Normalized</th>
                        <th>Bytecode</th>
                        </tr>
                    </thead>
                    <tbody>
            <For each={names()}>{(item, i) =>

            
                        <tr>
                        <th>{item.name}</th>
                        <th>{item.status}</th>
                        <th>
                            <Show
                            when={item.isValid == "true"}
                            fallback={<span class="tag is-danger ml-7 mr-7 has-text-white-bis">Invalid</span>}>
                                <span class="tag is-success ml-7 mr-7 has-text-white-bis">Valid</span>
                            </Show>
                        </th>
                        <th>{item.bytes}</th>
                        </tr>
            
      }</For>
      </tbody>
      </table>

            </div>

        </div>
      )
}

export default Profile;