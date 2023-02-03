import logo from './logo.svg';
import styles from './App.module.css';
import * as THREE from 'three';

function App() {


  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

  const renderer = new THREE.WebGLRenderer();
  renderer.setSize( window.innerWidth, window.innerHeight );
  document.body.appendChild( renderer.domElement );

  const geometry = new THREE.BoxGeometry( 1, 1, 1 );
  const material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
  const cube = new THREE.Mesh( geometry, material );
  scene.add( cube );

  camera.position.z = 5;

  function animate() {
    cube.rotation.x += 0.01;
    cube.rotation.y += 0.01;
  	requestAnimationFrame( animate );
  	renderer.render( scene, camera );
  }
  animate();

  return (
    <div class={styles.App}>
      <header class={styles.header}>
        <img src={logo} class={styles.logo} alt="logo" />
        <p>
          Edit <code>src/App.jsx</code> and save to reload.
        </p>
        <a
          class={styles.link}
          href="https://github.com/solidjs/solid"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn Solid
        </a>
        <div class="columns is-centered">
          <div class="column is-6">
              <div>
                <svg height="200" width="200">
                  <circle cx="100" cy="100" r="70" stroke="black" stroke-width="3" fill="grey" />
                </svg>
              </div>
              <div class="buttons are-medium">
                <button class="button is-fullwidth">Bad</button>
              </div>
              <div class="buttons are-medium">
                <button class="button is-fullwidth">Link</button>
              </div>
              <div class="buttons are-medium">
                <button class="button is-fullwidth">Tree</button>
              </div>
              <div class="buttons are-medium">
                <button id="test" class="button is-fullwidth">Clone</button>
              </div>

          </div>
        </div>
      </header>
    </div>
  );
}

export default App;
