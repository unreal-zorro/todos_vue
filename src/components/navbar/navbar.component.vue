<template>
  <div>
    <div
      class="bg-success position-absolute"
      :style="{
        width: 'calc(100vw - 100%)',
        height: `${height}px`,
        zIndex: '1000',
        top: '0',
        left: '0'
      }"
    ></div>

    <nav class="navbar navbar-expand-sm navbar-dark bg-success" id="navbar">
      <div class="container-sm main-container">
        <router-link class="navbar-brand" to="/">
          <span data-bs-toggle="collapse" data-bs-target=".navbar-collapse.show"
            >Заметки</span
          >
        </router-link>

        <button
          class="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Переключить навигацию"
        >
          <span class="navbar-toggler-icon"></span>
        </button>

        <div class="collapse navbar-collapse" id="navbarNav">
          <ul class="navbar-nav">
            <li class="nav-item">
              <router-link class="nav-link" to="/">
                <span
                  data-bs-toggle="collapse"
                  data-bs-target=".navbar-collapse.show"
                  >Главная</span
                >
              </router-link>
            </li>

            <li class="nav-item">
              <router-link
                class="nav-link"
                to="/notes"
                routerLinkActive="active"
                ><span
                  data-bs-toggle="collapse"
                  data-bs-target=".navbar-collapse.show"
                  >Все заметки</span
                ></router-link
              >
            </li>

            <li class="nav-item">
              <router-link class="nav-link" to="/new" routerLinkActive="active">
                <span
                  data-bs-toggle="collapse"
                  data-bs-target=".navbar-collapse.show"
                  >Новая заметка</span
                >
              </router-link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  </div>
</template>

<script lang="ts">
import { Options } from "vue-class-component";
import BaseComponent from "../base/base.component";

@Options({
  props: {}
})
export default class Navbar extends BaseComponent {
  height = 0;

  override activate() {
    super.activate();
    this.height = 0;
  }

  override mount() {
    super.mount();
    const navbar = document.querySelector("#navbar");
    if (navbar) {
      this.height = navbar.clientHeight;
      this.$forceUpdate();
    }
  }
}
</script>
