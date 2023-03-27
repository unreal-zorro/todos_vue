<template>
  <div>
    <h1 class="text-center mt-3">Изменение заметки!</h1>

    <hr class="border border-dark border-2 opacity-50" />

    <EditNote></EditNote>
  </div>
</template>

<script lang="ts">
import { Options } from "vue-class-component";
import EditNote from "../../components/editNote/editNote.component.vue";
import BaseComponent from "../../components/base/base.component";

@Options({
  components: { EditNote },
  props: {}
})
export default class EditNotePage extends BaseComponent {}
</script>
