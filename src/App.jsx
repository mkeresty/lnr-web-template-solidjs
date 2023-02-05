import logo from './logo.svg';
import styles from './App.module.css';
import * as THREE from 'three';
import { createSignal, Switch, Match } from 'solid-js';
import Resolve from './Resolve';
import Wrap from './Wrap';
import Transfer from './Transfer';
import Mint from './Mint';
import Header from './Header';
import Home from './Home';

function App() {

  var og = window.parent.og;

  const [route, setRoute] = createSignal('Mint');

  const callback = payload => {
    setRoute(payload)
    return
  }

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
        <Match when={route() == "Wrap"}>
          <Wrap />
        </Match>
        <Match when={route() == "Resolve"}>
          <Resolve />
        </Match>
      </Switch>
    </div>
  );
}

export default App;
