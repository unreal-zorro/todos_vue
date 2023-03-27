<template>
  <div>
    <div
      class="card mb-3"
      :class="completed ? 'bg-warning-subtle' : 'bg-light'"
    >
      <div class="card-body">
        <h5 class="card-title text-center mb">{{ title }}</h5>

        <div class="d-flex flex-column">
          <div v-if="innerTodos && innerTodos?.length">
            <Todo
              v-for="todo of innerTodos"
              :key="todo._id"
              :checked="todo.checked"
              :text="todo.text"
              @onChecked="checkedHandler(todo)"
            ></Todo>
          </div>

          <div v-else>
            <hr class="border border-danger border-2 opacity-75" />

            <h5 class="mb-4 text-center text-success">
              Задач пока нет. Добавьте первую задачу.
            </h5>
          </div>
        </div>

        <h5 v-if="numberOfRestTodos" class="mb-4 text-center text-success">
          ... Ещё осталось задач: {{ numberOfRestTodos }}
        </h5>

        <div
          class="d-flex mt-2 flex-wrap justify-content-between align-items-center flex-row"
        >
          <router-link
            v-if="isOpen && to"
            :to="`${to}/${_id}`"
            class="btn btn-success text-decoration-none text-white flex-fill m-2"
          >
            Открыть
          </router-link>

          <router-link
            :to="`/edit/${_id}`"
            class="btn btn-secondary text-decoration-none text-white flex-fill m-2"
          >
            Изменить
          </router-link>

          <button class="btn btn-danger flex-fill m-2" @click="handleDelete">
            Удалить
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Options } from "vue-class-component";
import Todo from "../todo/todo.component.vue";
import { TodoDTO } from "../../models/DTOEntities/todoDTO/todoDTO";
import BaseComponent from "../base/base.component";

@Options({
  components: { Todo },
  props: {
    _id: { type: String, required: false },
    title: { type: String, required: false },
    todos: { type: Array, required: false },
    completed: { type: Boolean, required: false },
    handleDelete: { type: Function, required: false },
    isOpen: { type: Boolean, required: false },
    to: { type: String, required: false }
  }
})
export default class Note extends BaseComponent {
  readonly _id!: string;
  readonly title!: string;
  readonly todos!: TodoDTO[];
  readonly completed!: boolean;
  readonly handleDelete!: () => void;
  readonly isOpen!: boolean;
  readonly to!: string;

  innerTodos: TodoDTO[] | void = void 0;
  numberOfRestTodos = 0;

  override activate() {
    super.activate();
    this.innerTodos = void 0;
    this.numberOfRestTodos = 0;
  }

  override mount() {
    super.mount();
    if (this.todos && this.todos?.length) {
      this.innerTodos = this.todos;

      if (this.isOpen && this.todos?.length > 3) {
        this.numberOfRestTodos = this.todos?.length - 3;
        this.innerTodos?.splice(3, this.todos?.length - 3);
      }
    }

    this.$forceUpdate();
  }

  checkedHandler = (todo: TodoDTO) => () => !todo.checked;
}
</script>
