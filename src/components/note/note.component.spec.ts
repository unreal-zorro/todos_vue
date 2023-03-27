/**
 * @jest-environment jsdom
 */

import { mount } from "@vue/test-utils";
import Note from "./note.component.vue";
import { TodoDTO } from "../../models/DTOEntities/todoDTO/todoDTO";
import { NoteDTO } from "../../models/DTOEntities/noteDTO/noteDTO";

const todo1: TodoDTO = new TodoDTO();
todo1._id = "1";
todo1.checked = true;
todo1.text = "Изучить основные теги";

const todo2: TodoDTO = new TodoDTO();
todo2._id = "2";
todo2.checked = false;
todo2.text = "Изучить атрибуты тегов";

const todo3: TodoDTO = new TodoDTO();
todo3._id = "3";
todo3.checked = true;
todo3.text = "Изучить семантические теги";

const todo4: TodoDTO = new TodoDTO();
todo4._id = "4";
todo4.checked = true;
todo4.text = "Изучить мета теги";

const todo5: TodoDTO = new TodoDTO();
todo5._id = "5";
todo5.checked = false;
todo5.text = "Изучить структуру HTML документа";

const note: NoteDTO = new NoteDTO();
note._id = "1";
note.title = "Изучить HTML";
note.todos = [todo1, todo2, todo3, todo4, todo5];

const handleDelete = jest.fn();

describe("Note", () => {
  beforeEach(() => {
    const todo: TodoDTO = new TodoDTO();
    todo._id = "1";
    todo.checked = true;
    todo.text = "Изучить основные теги";
  });

  it("should render Note component", async () => {
    const wrapper = mount(Note, {
      props: {
        _id: note._id,
        title: note.title,
        todos: note.todos,
        completed: false,
        onDelete: handleDelete,
        isOpen: false,
        to: "/notes"
      }
    });
    expect(wrapper.html()).toContain(note.title);
  });
});
