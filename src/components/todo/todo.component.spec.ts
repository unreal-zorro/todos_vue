/**
 * @jest-environment jsdom
 */

import { mount } from "@vue/test-utils";
import Todo from "./todo.component.vue";
import { TodoDTO } from "../../models/DTOEntities/todoDTO/todoDTO";

const todo: TodoDTO = new TodoDTO();
todo._id = "1";
todo.checked = true;
todo.text = "Изучить основные теги";

const handleChecked = jest.fn();
// const handleChecked = () => void 0;

describe("Todo", () => {
  beforeEach(() => {
    const todo: TodoDTO = new TodoDTO();
    todo._id = "1";
    todo.checked = true;
    todo.text = "Изучить основные теги";
  });

  it("should render checked Todo component", async () => {
    const wrapper = mount(Todo, {
      props: {
        checked: todo.checked,
        text: todo.text,
        onChecked: handleChecked
      }
    });

    expect(wrapper.html()).toContain(todo.text);
  });
});
