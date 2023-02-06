import logo from './logo.svg';
import styles from './App.module.css';
import * as THREE from 'three';
import { createSignal, Switch, Match } from 'solid-js';
import Resolve from './pages/Resolve';
import Wrap from './pages/Wrap';
import Transfer from './pages/Transfer';
import Mint from './pages/Mint';
import Header from './components/Header';
import Home from './pages/Home';

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
