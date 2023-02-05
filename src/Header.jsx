import styles from './App.module.css';
import * as THREE from 'three';
import { createSignal, Switch, Match } from 'solid-js';


const Header = ({ callback }) => {
    
    const [connected, setConnected] = createSignal(false);
    const [address, setAddress] = createSignal('Connect');
  
  
    var og = window.parent.og;
    async function derp(){
  
      var walletAddress = await og.signer.getAddress();
      setConnected(true);
      setAddress(walletAddress)
    
    }
  
    const setRouteTo = (route) => {
      callback(route)
    }
  
  
  
    return(<><nav class="navbar linagee"  role="navigation" aria-label="main navigation">
    <div class="navbar-brand">
      <a class="navbar-item" href="https://linagee.vision">
        <img src="https://linagee.vision/LNR_L_Icon_White.svg" width="112" height="28"/>
      </a>
  
      <a role="button" class="navbar-burger " aria-label="menu" aria-expanded="false" data-target="navbarBasicExample">
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
      </a>
    </div>
  
    <div id="navbarBasicExample" class="navbar-menu">
      <div class="navbar-start">
        <a onClick={()=>setRouteTo("Home")} class="navbar-item">
          Home
        </a>
  {setRouteTo}
        <div class="navbar-item has-dropdown is-hoverable">
          <a class="navbar-item">
            Names
          </a>
  
          <div  class="navbar-dropdown">
            <a onClick={()=>setRouteTo("Mint")} class="navbar-item">
              Mint
            </a>
            <a onClick={()=>setRouteTo("Transfer")} class="navbar-item">
              Transfer
            </a>
            <a onClick={()=>setRouteTo("Wrap")} class="navbar-item">
              Wrap
            </a>
            <a onClick={()=>setRouteTo("Resolve")} class="navbar-item">
              Resolve
            </a>
          </div>
        </div>
        <div class="navbar-item has-dropdown is-hoverable">
          <a class="navbar-item">
            Web
          </a>
  
          <div class="navbar-dropdown">
            <a class="navbar-item">
              Explore
            </a>
            <a class="navbar-item">
              Create
            </a>
          </div>
        </div>
        <div class="navbar-item has-dropdown is-hoverable">
          <a class="navbar-item">
            More
          </a>
  
          <div class="navbar-dropdown">
            <a class="navbar-item">
              About
            </a>
            <a class="navbar-item">
              Docs
            </a>
            <a class="navbar-item">
              History
            </a>
            <hr class="navbar-divider"/>
            <a class="navbar-item">
              Socials
            </a>
          </div>
        </div>
      </div>
          
      <div class="navbar-end">
        <div class="navbar-item">
          <div class="buttons">
          <button onClick={derp} class="button is-outlined m-3">
          {address}
      </button>
  
          </div>
        </div>
      </div>
    </div>
  </nav></>)
  }
  


export default Header;