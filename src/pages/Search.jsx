import styles from '../App.module.css';
import * as THREE from 'three';
import { createSignal, Switch, Match, children, createEffect, mergeProps, Show, onMount } from 'solid-js';
import MessageBox from '../components/MessageBox';
import { nameLookup, handleEthers } from '../utils/nameUtils';

const Search = () =>{
    var og = window.parent.og;
    const [name, setName] = createSignal('');

    const handleSearch =() =>{
        return
    }


    return(
        <div class="page">
        <br />
        <div class="columns is-mobile">  
  
        <div class="column is-10 is-offset-1 pb-10">
          <div class="card lg has-text-centered">
          <br/>
          <p class="title has-text-light">
          search.og
          </p>
          <br/>
          </div>
      </div>
      </div>
      <div class="columns is-mobile">   
      <div class="column is-half is-offset-one-quarter mt-6">
          <div class="block has-text-centered">
              <h3 class="title is-3 has-text-light">Search</h3>
                  <input  
                    class="input mb-3 mt-3" type="text" placeholder="name.og or address"
                    onInput={(e) => {
                      setShowModal(false); 
                      setName(e.target.value)
                    }}/>      
                    <button class="button is-outlined mb-3" onClick={handleSearch}>Search</button>

                
          </div>
      </div>
  </div>
      </div>


    )
}

export default Search;