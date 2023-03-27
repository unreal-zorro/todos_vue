/**
 * @jest-environment jsdom
 */

import { mount } from "@vue/test-utils";
import NoteListPage from "./noteList.page.vue";

describe("Note list page", () => {
  it("should render Note list page component", async () => {
    const wrapper = mount(NoteListPage, {});
    expect(wrapper.html()).toContain("Список заметок!");
    expect(wrapper.html()).toContain(
      "Заметок пока нет. Добавьте первую заметку."
    );
    expect(wrapper.html()).toContain("Добавить заметку");
  });
});
