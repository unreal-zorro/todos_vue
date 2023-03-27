<template>
  <div>
    <h1 class="text-center mt-3">Просмотр заметки!</h1>

    <hr class="border border-dark border-2 opacity-50" />

    <Note
      v-if="note"
      :_id="note._id"
      :title="note.title"
      :todos="note.todos"
      :completed="completed"
      :handleDelete="handleDelete"
    >
    </Note>

    <div v-else>
      <h5 class="mb-2 text-center text-danger">
        Данной заметки не существует!!!
      </h5>
    </div>

    <Modal
      :show="modalDialog.show"
      :title="modalDialog.title"
      :text="modalDialog.text"
      :textOkButton="modalDialog.textOkButton"
      :textCancelButton="modalDialog.textCancelButton"
      :handleClose="modalDialog.handleClose"
      :handleSave="modalDialog.handleSave"
      :okIsLink="modalDialog.okIsLink"
      :to="modalDialog.to"
    ></Modal>
  </div>
</template>

<script lang="ts">
import { Options } from "vue-class-component";
import Note from "../../components/note/note.component.vue";
import Modal from "../../components/modal/modal.component.vue";
import BaseComponent from "../../components/base/base.component";
import { NoteDTO } from "../../models/DTOEntities/noteDTO/noteDTO";
import { ModalDialogModel } from "../../models/viewModel/modalDialog/modalDialog.model";
import { NoteService } from "../../services/noteService/note.service";
import { NoteRepository } from "../../repositories/noteRepository/note.repository";

@Options({
  components: { Modal, Note },
  props: {}
})
export default class NotePage extends BaseComponent {
  note: NoteDTO | void = void 0;
  completed = false;
  modalDialog: ModalDialogModel = new ModalDialogModel();
  handleDelete!: () => void;

  private readonly noteService: NoteService = new NoteService(
    new NoteRepository()
  );

  override activate() {
    super.activate();
    this.note = void 0;
    this.completed = false;
    this.modalDialog = new ModalDialogModel();
  }

  override mount() {
    super.mount();
    this.getNote().then();
    this.modalDialog.handleClose = () => {
      this.modalDialog.show = false;
      this.$forceUpdate();
      return void 0;
    };

    this.handleDelete = () => {
      try {
        if (this.note) {
          this.modalDialog = {
            ...this.modalDialog,
            show: true,
            title: "Подтвердите удаление заметки",
            text: "Вы точно хотите удалить данную заметку?",
            textOkButton: "Удалить",
            textCancelButton: "Нет, не удалять",
            handleSave: () => {
              this.note
                ? this.noteService.deleteNote(this.note?._id).then()
                : undefined;
              this.note = void 0;
              this.$forceUpdate();
              return void 0;
            },
            okIsLink: true,
            to: "/notes"
          };
          this.$forceUpdate();
        }
      } catch (e) {
        console.error(e);
      }
    };
  }

  async getNote(): Promise<void> {
    const idEditMatch = window.location.pathname.match(/\/notes\//);

    if (idEditMatch) {
      const _id = window.location.pathname.slice(7);
      this.requestNote(_id).then();
    }
  }

  async requestNote(_id?: string): Promise<void> {
    try {
      if (_id !== null && _id !== undefined) {
        this.note = await this.noteService?.getNoteById(_id);
        this.completed =
          this.note && this.note?.todos
            ? this.note?.todos?.reduce(
                (complete: boolean, todo: { checked: boolean }) =>
                  complete && todo.checked,
                true
              )
            : false;
      }
      this.$forceUpdate();
    } catch (e) {
      console.error(e);
    }
  }
}
</script>
