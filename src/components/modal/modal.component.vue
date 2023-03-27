<template>
  <div>
    <div :class="show ? '' : 'd-none'" @click="modalClickHandler($event)">
      <div class="vw-100 vh-100 bg-black opacity-75 fixed-top"></div>

      <div class="modal d-block" tabIndex="{-1}">
        <div class="modal-dialog modal-dialog-centered">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title">{{ title }}</h5>
              <button
                type="button"
                class="btn-close"
                data-bs-dismiss="modal"
                aria-label="Закрыть"
                @click="handleClose"
              ></button>
            </div>
            <div class="modal-body">
              <p>{{ text }}</p>
            </div>
            <div class="modal-footer">
              <router-link
                v-if="okIsLink && to && okIsLink"
                :to="to"
                class="btn btn-success"
                @click="handleSave"
              >
                {{ textOkButton }}
              </router-link>

              <div v-else>
                <button class="btn btn-success" @click="handleSave">
                  {{ textOkButton }}
                </button>
              </div>

              <button
                class="btn btn-danger"
                data-bs-dismiss="modal"
                @click="handleClose()"
              >
                {{ textCancelButton }}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Options } from "vue-class-component";
import BaseComponent from "../base/base.component";

@Options({
  props: {
    show: { type: Boolean, required: false },
    title: { type: String, required: false },
    text: { type: String, required: false },
    textOkButton: { type: String, required: false },
    textCancelButton: { type: String, required: false },
    handleClose: { type: Function, required: false },
    handleSave: { type: Function, required: false },
    okIsLink: { type: Boolean, required: false },
    to: { type: String, required: false }
  }
})
export default class Modal extends BaseComponent {
  readonly show!: boolean;
  readonly title!: string;
  readonly text!: string;
  readonly textOkButton!: string;
  readonly textCancelButton!: string;
  readonly handleClose!: () => void;
  readonly handleSave!: () => void;
  readonly okIsLink!: boolean;
  readonly to!: string;

  override activate() {
    super.activate();
  }

  modalClickHandler = (event: Event) => {
    const target = event.target as HTMLElement;
    if (target.classList.contains("modal")) {
      this.handleClose ? this.handleClose() : undefined;
    }
    return undefined;
  };
}
</script>
