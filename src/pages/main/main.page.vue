<template>
  <div>
    <h1 class="mt-3 text-center">Главная страница</h1>

    <h3 v-if="numberOfNotes === 0" class="text-center mt-2 text-danger">
      Заметок пока нет!!!
    </h3>

    <div v-else>
      <h3 class="text-center mt-2 text-warning">
        Всего заметок:{{ " " }}
        <span class="fw-bold fs-3 text-success">{{ numberOfNotes }}</span>
      </h3>
    </div>
  </div>
</template>

<script lang="ts">
import { Options } from "vue-class-component";
import BaseComponent from "../../components/base/base.component";
import { NoteDTO } from "../../models/DTOEntities/noteDTO/noteDTO";
import { NoteService } from "../../services/noteService/note.service";
import { NoteRepository } from "../../repositories/noteRepository/note.repository";

@Options({
  props: {}
})
export default class MainPage extends BaseComponent {
  notes: NoteDTO[] | void = [];
  numberOfNotes = 0;

  private readonly noteService: NoteService = new NoteService(
    new NoteRepository()
  );

  override activate() {
    super.activate();
    // this.add().then();
    this.requestNumberOfNotes().then();
  }

  async add() {
    await localStorage.setItem(
      "notes",
      `[
         {
           "_id":"1",
           "title":"Изучить HTML",
           "todos":[
             {
               "_id":"1",
               "checked":true,
               "text":"Изучить основные теги"
             },
             {
               "_id":"2",
               "checked":false,
               "text":"Изучить атрибуты тегов"
             }
           ]
         },
         {
           "_id":"2",
           "title":"Изучить CSS",
           "todos":[
             {
               "_id":"3",
               "checked":true,
               "text":"Изучить селекторы"
             },
             {
               "_id":"4",
               "checked":true,
               "text":"Изучить блочную модель"
             },
             {
               "_id":"5",
               "checked":true,
               "text":"Изучить основные стили"
             }
           ]
         }
       ]`
    );
  }

  async requestNumberOfNotes(): Promise<void> {
    try {
      this.notes = await this.noteService?.getNotes();
      if (this.notes) {
        this.numberOfNotes = this.notes.length;
      }
      this.$forceUpdate();
    } catch (e) {
      console.error(e);
    }
  }
}
</script>
