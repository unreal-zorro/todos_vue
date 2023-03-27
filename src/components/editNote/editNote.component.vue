<template>
  <div>
    <div
      v-if="(EditMatch && note) || NewMatch"
      class="card mb-3"
      :class="completed ? 'bg-warning-subtle' : 'bg-light'"
    >
      <div class="card-body">
        <label class="w-100 text-center mb-2 h5" htmlFor="noteTitle">
          Заголовок заметки:
        </label>

        <div class="card mb-2 w-100">
          <div
            contentEditable="true"
            class="form-control text-center"
            id="noteTitle"
            @input="handleChangeTitle($event)"
            @blur="handleBlurTitle($event)"
            suppressContentEditableWarning="true"
          >
            {{ note?.title }}
          </div>
        </div>

        <hr class="border border-danger border-2 opacity-75" />

        <div
          v-if="note && note?.todos && note?.todos?.length"
          class="d-flex flex-column"
        >
          <div
            v-for="todo of note?.todos"
            :key="todo._id"
            class="card mb-2 w-100"
            :class="todo.checked ? 'bg-success bg-opacity-25' : ''"
          >
            <div
              class="card-text d-flex justify-content-center align-items-center m-1 ms-3 me-3"
            >
              <input
                class="form-check me-3"
                type="checkbox"
                :checked="todo.checked"
                @change="handleCheckedToDo(todo._id)"
              />
              <div
                contentEditable="true"
                class="form-control text-break"
                @input="handleChangeToDoText(todo._id, $event)"
                @blur="handleBlurToDoText(todo._id, $event)"
                suppressContentEditableWarning="true"
              >
                {{ todo.text }}
              </div>
              <input
                class="btn-close ms-3"
                type="button"
                @click="handleDeleteToDo(todo._id)"
              />
            </div>
          </div>
        </div>

        <div v-else>
          <h5 class="mb-2 text-center text-success">
            Задач пока нет. Добавьте первую задачу.
          </h5>
        </div>

        <div
          class="d-flex w-100 justify-content-around align-items-center flex-wrap"
        >
          <button class="btn btn-primary m-2" @click="handleAddToDo">
            Добавить задачу
          </button>

          <button
            class="btn btn-success m-2"
            @click="handleUndo()"
            :disabled="undoSteps <= 0"
          >
            <div class="bi-arrow-left-circle">
              <span>&nbsp;</span>
              <span>Отменить {{ undoSteps }}</span>
            </div>
          </button>

          <button
            class="btn btn-warning m-2"
            @click="handleRedo()"
            :disabled="redoSteps <= 0"
          >
            <div class="bi-arrow-right-circle">
              <span>&nbsp;</span>
              <span>Повторить {{ redoSteps }}</span>
            </div>
          </button>
        </div>

        <hr class="border border-danger border-2 opacity-75" />

        <div
          class="d-flex flex-wrap justify-content-between align-items-center flex-row"
        >
          <button class="btn btn-secondary flex-fill m-2" @click="handleSave()">
            Сохранить изменения
          </button>
          <button class="btn btn-danger flex-fill m-2" @click="handleCancel()">
            Отменить изменения
          </button>
        </div>
      </div>
    </div>

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
import Modal from "../modal/modal.component.vue";
import { NoteDTO } from "../../models/DTOEntities/noteDTO/noteDTO";
import { TodoDTO } from "../../models/DTOEntities/todoDTO/todoDTO";
import { ModalDialogModel } from "../../models/viewModel/modalDialog/modalDialog.model";
import { NoteRepository } from "../../repositories/noteRepository/note.repository";
import { NoteService } from "../../services/noteService/note.service";
import { UndoRedoService } from "../../services/undoRedoService/undoRedo.service";
import BaseComponent from "../base/base.component";

@Options({
  components: { Modal },
  props: {}
})
export default class EditNote extends BaseComponent {
  note!: NoteDTO | void;
  modalDialog!: ModalDialogModel;
  NewMatch!: string;
  EditMatch!: string;
  undoSteps!: number;
  redoSteps!: number;
  maxOperations = 5;
  completed!: 0 | boolean | undefined;

  changeCompleted = (note: NoteDTO | void): 0 | boolean | undefined => {
    return (
      note?.todos?.length &&
      note?.todos?.reduce(
        (checked: boolean, todo) => checked && todo.checked,
        true
      )
    );
  };

  private readonly noteService: NoteService = new NoteService(
    new NoteRepository()
  );

  private readonly undoRedoService: UndoRedoService<NoteDTO | void> =
    new UndoRedoService<NoteDTO | void>(this.maxOperations);

  override activate() {
    super.activate();

    this.note = void 0;
    this.modalDialog = new ModalDialogModel();
    this.NewMatch =
      (window.location.pathname.match(/\/new/) as unknown as string) || "";
    this.EditMatch =
      (window.location.pathname.match(/\/edit\//) as unknown as string) || "";
    this.undoSteps = 0;
    this.redoSteps = 0;
    this.maxOperations = 5;
    this.completed = false;

    this.getNote().then();
    this.modalDialog.handleClose = () => {
      this.modalDialog.show = false;
      this.$forceUpdate();
      return void 0;
    };
  }

  async getNote(): Promise<void> {
    let _id = "";
    if (this.EditMatch) {
      _id = window.location.pathname.slice(6);
    }
    this.requestNote(_id).then();
  }

  async saveNote(): Promise<void> {
    if (this.note) {
      if (this.NewMatch) {
        this.noteService.addNote(this.note).then();
      } else if (this.EditMatch) {
        this.noteService.editNote(this.note).then();
      }
    }
  }

  async requestNote(_id?: string): Promise<void> {
    try {
      if (_id === "") {
        this.note = await this.noteService?.getNewNote();
      } else if (_id !== null && _id !== undefined) {
        this.note = await this.noteService?.getNoteById(_id);
      }

      this.completed = this.changeCompleted(this.note);

      if (!this.undoRedoService.length()) {
        this.undoRedoService.add(this.note);
        this.undoSteps = 0;
        this.redoSteps = 0;
      }

      this.$forceUpdate();
    } catch (e) {
      console.error(e);
    }
  }

  handleAddToDo(): void {
    const newToDo = new TodoDTO();
    newToDo._id = Date.now().toString();
    this.note?.todos.push(newToDo);
    this.completed = this.changeCompleted(this.note);

    const { undoSteps, redoSteps } = { ...this.undoRedoService.add(this.note) };
    this.undoSteps = undoSteps;
    this.redoSteps = redoSteps;

    this.$forceUpdate();
  }

  handleDeleteToDo(_id: string): void {
    const todoIndex = this.note?.todos.findIndex(todo => _id === todo._id) ?? 0;
    this.note?.todos.splice(todoIndex, 1);
    this.completed = this.changeCompleted(this.note);

    const { undoSteps, redoSteps } = { ...this.undoRedoService.add(this.note) };
    this.undoSteps = undoSteps;
    this.redoSteps = redoSteps;

    this.$forceUpdate();
  }

  handleCheckedToDo(_id: string): void {
    const newToDos = this.note?.todos.map(todo => {
      if (_id === todo._id) {
        todo.checked = !todo.checked;
      }
      return todo;
    });

    if (newToDos) {
      this.note?.todos.splice(0, newToDos.length, ...newToDos);
      this.completed = this.changeCompleted(this.note);

      const { undoSteps, redoSteps } = {
        ...this.undoRedoService.add(this.note)
      };
      this.undoSteps = undoSteps;
      this.redoSteps = redoSteps;
    }

    this.$forceUpdate();
  }

  handleChangeToDoText(_id: string, event: Event): void {
    const textField = event.target as HTMLElement;

    const newToDos = this.note?.todos.map(todo => {
      if (_id === todo._id) {
        todo.text = textField?.innerText;
      }
      return todo;
    });

    if (newToDos) {
      const note = this.note;
      note?.todos.splice(0, newToDos.length, ...newToDos);

      const { undoSteps, redoSteps } = {
        ...this.undoRedoService.add(this.note)
      };
      this.undoSteps = undoSteps;
      this.redoSteps = redoSteps;
    }
  }

  handleBlurToDoText(_id: string, event: Event): void {
    const textField = event.target as HTMLElement;

    const newToDos = this.note?.todos.map(todo => {
      if (_id === todo._id) {
        todo.text = textField?.innerText;
      }
      return todo;
    });

    if (newToDos) {
      this.note?.todos.splice(0, newToDos.length, ...newToDos);
    }
    this.$forceUpdate();
  }

  handleChangeTitle(event: Event): void {
    const textField = event.target as HTMLElement;

    if (this.note) {
      const note = this.note;
      note.title = textField.innerText;

      const { undoSteps, redoSteps } = {
        ...this.undoRedoService.add(note)
      };
      this.undoSteps = undoSteps;
      this.redoSteps = redoSteps;
    }
  }

  handleBlurTitle(event: Event): void {
    const textField = event.target as HTMLElement;
    if (this.note) {
      this.note.title = textField.innerText;
    }
    this.$forceUpdate();
  }

  handleSave(): void {
    try {
      this.modalDialog = {
        ...this.modalDialog,
        show: true,
        title: "Подтвердите сохранение изменений",
        text: "Вы точно хотите сохранить изменения в данной заметке?",
        textOkButton: "Сохранить",
        textCancelButton: "Нет, не сохранять",
        handleSave: () => {
          this.saveNote().then();
          this.modalDialog.handleClose();
          this.$forceUpdate();
          return void 0;
        },
        okIsLink: true,
        to: "/notes"
      };
      this.$forceUpdate();
    } catch (e) {
      console.error(e);
    }
  }

  handleCancel(): void {
    try {
      this.modalDialog = {
        ...this.modalDialog,
        show: true,
        title: "Подтвердите отмену изменений",
        text: "Вы точно хотите отменить изменения в данной заметке?",
        textOkButton: "Отменить",
        textCancelButton: "Нет, не отменять",
        handleSave: () => {
          this.getNote().then();
          this.modalDialog.handleClose();
          this.$forceUpdate();
          return void 0;
        },
        okIsLink: false,
        to: ""
      };
      this.$forceUpdate();
    } catch (e) {
      console.error(e);
    }
  }

  async handleUndo(): Promise<void> {
    const { undoSteps, redoSteps, state } = { ...this.undoRedoService.undo() };
    this.undoSteps = undoSteps;
    this.redoSteps = redoSteps;
    this.note = state;
    this.completed = this.changeCompleted(this.note);

    this.$forceUpdate();
  }

  async handleRedo(): Promise<void> {
    const { undoSteps, redoSteps, state } = { ...this.undoRedoService.redo() };
    this.undoSteps = undoSteps;
    this.redoSteps = redoSteps;
    this.note = state;
    this.completed = this.changeCompleted(this.note);

    this.$forceUpdate();
  }
}
</script>
