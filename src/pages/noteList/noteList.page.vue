<template>
  <div>
    <h1 class="text-center mt-3">Список заметок!</h1>

    <hr class="border border-dark border-2 opacity-50" />

    <h2 v-if="!(notes && notes?.length)" class="mb-4 text-center text-warning">
      Заметок пока нет. Добавьте первую заметку.
    </h2>

    <div class="d-flex w-100 justify-content-center">
      <router-link
        to="/new"
        class="btn btn-success mb-3 text-decoration-none text-white"
      >
        Добавить заметку
      </router-link>
    </div>

    <div v-if="notes && notes?.length">
      <Note
        v-for="(note, index) of notes"
        :key="note._id"
        :_id="note._id"
        :title="note.title"
        :todos="note.todos"
        :completed="note.todos.length && completed ? completed[index] : false"
        :handleDelete="handleDelete(note._id)"
        :isOpen="true"
        :to="'/notes'"
      ></Note>

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
export default class NoteListPage extends BaseComponent {
  notes: NoteDTO[] | void = [];
  completed: boolean[] | undefined = [];
  modalDialog: ModalDialogModel = new ModalDialogModel();

  private readonly noteService: NoteService = new NoteService(
    new NoteRepository()
  );

  override activate() {
    super.activate();
    this.notes = [];
    this.completed = [];
    this.modalDialog = new ModalDialogModel();
  }

  override mount() {
    super.mount();
    this.requestNotes().then();
    this.modalDialog.handleClose = () => {
      this.modalDialog.show = false;
      this.$forceUpdate();
      return void 0;
    };
  }

  async requestNotes(): Promise<void> {
    try {
      this.notes = await this.noteService?.getNotes();
      this.completed = this.notes?.map(note =>
        note.todos?.reduce(
          (complete: boolean, todo) => complete && todo.checked,
          true
        )
      );
      this.$forceUpdate();
    } catch (e) {
      console.error(e);
    }
  }

  handleDelete = (_id: string) => () => {
    try {
      if (this.notes) {
        this.modalDialog = {
          ...this.modalDialog,
          show: true,
          title: "Подтвердите удаление заметки",
          text: "Вы точно хотите удалить данную заметку?",
          textOkButton: "Удалить",
          textCancelButton: "Нет, не удалять",
          handleSave: () => {
            const noteIndex = this.notes
              ? this.notes?.findIndex(note => _id === note._id)
              : 0;
            this.notes?.splice(noteIndex, 1);
            this.noteService.deleteNote(_id).then();
            this.modalDialog.show = false;
            // this.$forceUpdate();
            return void 0;
          },
          okIsLink: false,
          to: ""
        };
      }
      // this.$forceUpdate();
    } catch (e) {
      console.error(e);
    }
  };
}
</script>
