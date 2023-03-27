/**
 * @jest-environment jsdom
 */

import { mount } from "@vue/test-utils";
import NewNote from "./newNote.page.vue";

describe("New note page", () => {
  it("should render New note page component", async () => {
    const wrapper = mount(NewNote, {});
    expect(wrapper.html()).toContain("Создание заметки!");
    expect(wrapper.html()).toContain("Данной заметки не существует!!!");
  });
});
