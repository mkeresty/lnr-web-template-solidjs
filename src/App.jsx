import logo from './logo.svg';
import styles from './App.module.css';
import * as THREE from 'three';
import { createSignal, Switch, Match } from 'solid-js';


const Mint = () =>{
  var og = window.parent.og;
  const [name, setName] = createSignal('');

  async function sign(){
    console.log(og)
    const currentName = name();
    var signature = await og.signer.signMessage(currentName);
    console.log(signature)
  }

  async function mintOg(){
    const currentName = name();
    var checked = await og.lnr.owner(currentName)
    if(!checked){
      var signature = await og.lnr.reserve(currentName);
      return(signature);
    }
    return
  }

  async function checkOg(){
    const currentName = name();
    var ogStatus = await og.owner(currentName)
    return(ogStatus)
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
                  class="input" type="text" placeholder="name"
                  onInput={(e) => {
                    setName(e.target.value)
                  }}/>
                <button class="button is-outlined m-3" onClick={sign}>Sign</button>
                <button class="button is-outlined m-3">Search</button>
        </div>
    </div>
</div>
</div>
  )
}





const Header = ({ callback }) => {

  const [routeTo, setRouteTo] = createSignal('bob');
    
  const [connected, setConnected] = createSignal(false);
  const [address, setAddress] = createSignal('Connect');


  var og = window.parent.og;
  async function derp(){

    var walletAddress = await og.signer.getAddress();
    console.log("test4 log from chain: Wallet:" + walletAddress);
    console.log(og);
    setConnected(true);
    setAddress(walletAddress)
    // console.log("UTF8 stuff 小馬, 昨夜のコンサートは最高でした جیم ذال sdf Д д Ж ж Ñ");
  
  }

  const navigate = () => {
    var routeName = routeTo();
    console.log("navigating ", routeName)
    callback(routeName)
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
      <a onClick={navigate("Home")} class="navbar-item">
        Home
      </a>
{routeTo}
      <div class="navbar-item has-dropdown is-hoverable">
        <a class="navbar-item">
          Names
        </a>

        <div  class="navbar-dropdown">
          <a onClick={navigate("Mint")} class="navbar-item">
            Mint
          </a>
          <a onClick={navigate("Transfer")} class="navbar-item">
            Transfer
          </a>
          <a onClick={()=>setRouteTo("wrap")} class="navbar-item">
            Wrap
          </a>
          <a class="navbar-item">
            Controller
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
          <button onClick={()=>setRouteTo("john")}>test</button>
        <button onClick={derp} class="button is-outlined m-3">
        {address}
    </button>

        </div>
      </div>
    </div>
  </div>
</nav></>)
}

const Home = () => {
  return(
    <div>
      home
    </div>
  )
}

const Transfer = () => {
  return(
    <div>
      home
    </div>
  )
}




function App() {

  var og = window.parent.og;

  const [route, setRoute] = createSignal('Mint');

  const callback = payload => {
    console.log("payload ", payload)
    //setRoute(payload)

    console.log("route", route)
}

  




  async function derp(){

    var walletAddress = await og.signer.getAddress();
    console.log("test3 log from chain: Wallet:" + walletAddress);
    console.log(og);
    // console.log("UTF8 stuff 小馬, 昨夜のコンサートは最高でした جیم ذال sdf Д д Ж ж Ñ");
  
  }

  async function sign(){
    const msg = "hello world";
    var signature = await og.signer.signMessage(msg);
    console.log(signature)
  }

  const test =()=>{
    console.log('test')
  }




  // const scene = new THREE.Scene();
  // const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

  // const renderer = new THREE.WebGLRenderer();
  // renderer.setSize( window.innerWidth, window.innerHeight );
  // document.body.appendChild( renderer.domElement );

  // const geometry = new THREE.BoxGeometry( 1, 1, 1 );
  // const material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
  // const cube = new THREE.Mesh( geometry, material );
  // scene.add( cube );

  // camera.position.z = 5;

  // function animate() {
  //   cube.rotation.x += 0.01;
  //   cube.rotation.y += 0.01;
  // 	requestAnimationFrame( animate );
  // 	renderer.render( scene, camera );
  // }
  // animate();

  return (
    <div class={styles.App}>
      <Header callback={callback} />
      <Switch
      fallback={<Home />}
      >
        <Match when={route() == "Mint"}>
          <Mint />
        </Match>
        <Match when={route() == "Transfer"}>
          <Transfer />
        </Match>
        <Match when={route() == "Home"}>
          <Home />
        </Match>
      </Switch>


    </div>
  );
}

export default App;
