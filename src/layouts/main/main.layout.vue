<template>
  <div>
    <div class="scroll">
      <Navbar></Navbar>

      <div class="container-sm main-container">
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Options } from "vue-class-component";
import BaseComponent from "../../components/base/base.component";
import Navbar from "../../components/navbar/navbar.component.vue";

@Options({
  components: { Navbar },
  props: {}
})
export default class MainLayout extends BaseComponent {}
</script>
