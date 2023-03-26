<template>
  <div>
    <div
      class="card mb-2 w-100"
      :class="checked ? 'bg-success bg-opacity-25' : ''"
    >
      <div
        class="card-text d-flex justify-content-start align-items-center m-1 ms-3 me-3"
      >
        <input
          class="form-check me-3"
          type="checkbox"
          :checked="checked"
          @change="onChecked()"
        />
        <p class="text-break mb-0">{{ text }}</p>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
// import BaseComponent from "../base/base.component";

@Options({
  props: {
    checked: { type: Boolean, required: false },
    text: { type: String, required: false },
    onChecked: { type: Function, required: false }
  }
})
export default class Todo extends Vue {
  // extends BaseComponent
  readonly checked!: boolean;
  readonly text!: string;
  readonly onChecked!: () => boolean;
}
</script>
