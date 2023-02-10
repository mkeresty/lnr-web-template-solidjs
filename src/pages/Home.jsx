import styles from '../App.module.css';
import * as THREE from 'three';
import { createSignal, Switch, Match, children, createEffect, mergeProps, Show, onMount } from 'solid-js';

const Home = () =>{


      return(
        <div class="page">
        <br />
        <div class="columns is-mobile">  
          <div class="column is-10 is-offset-1 pb-10">
              <div class="card lg has-text-centered">
                <br/>
                <p class="title has-text-light">
                home.og
                </p>

                
                <br/>
              </div>
            </div>
          </div>
          <div class="is-flex is-flex-direction-row m-3">
          <a role="button" id="burger" class="navbar-burger mr-3">
    <span aria-hidden="true"></span>
    <span aria-hidden="true"></span>
    <span aria-hidden="true"></span>
</a>
            <input  
                      class="input" type="text" placeholder="address"
/>  
            <button class="button is-outlined ml-3" >search</button>
          </div>

      </div>
      )
}

export default Home;