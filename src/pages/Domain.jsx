import styles from '../App.module.css';
import * as THREE from 'three';
import { createSignal, Switch, Match, children, createEffect, mergeProps, Show, onMount } from 'solid-js';

const Domain = () =>{
      props=""

      return(
        <div class="box">
            <h4>{props.route}</h4>
            <h4>{props.domain}</h4>
            domain
        </div>
      )
}

export default Domain;