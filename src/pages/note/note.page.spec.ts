/**
 * @jest-environment jsdom
 */

import { mount } from "@vue/test-utils";
import NotePage from "./note.page.vue";

describe("Note page", () => {
  it("should render Note page component", async () => {
    const wrapper = mount(NotePage, {});
    expect(wrapper.html()).toContain("Просмотр заметки!");
    expect(wrapper.html()).toContain("Данной заметки не существует!!!");
  });
});
