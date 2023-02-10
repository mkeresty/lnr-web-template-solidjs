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
import Search from './pages/search';
import Domain from './pages/Domain';
import { useGlobalContext } from './GlobalContext/store';

function App() {

  var og = window.parent.og;

  const { store, setStore } = useGlobalContext();


  return (
    <div class={styles.App}>
      <Header />
      <Switch fallback={<Home />}>
        <Match when={store().route == "Mint"}><Mint /></Match>
        <Match when={store().route == "Transfer"}><Transfer /></Match>
        <Match when={store().route == "Home"}><Home /></Match>
        <Match when={store().route == "Wrap"}><Wrap /></Match>
        <Match when={store().route == "Resolve"}><Resolve /></Match>
        <Match when={store().route == "Search"}><Search /></Match>
        <Match when={store().route == "Domain"}><Domain /></Match>
      </Switch>
    </div>
  );
}

export default App;
