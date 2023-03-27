/**
 * @jest-environment jsdom
 */

import { mount } from "@vue/test-utils";
import EditNote from "./editNote.page.vue";

describe("New note page", () => {
  it("should render New note page component", async () => {
    const wrapper = mount(EditNote, {});
    expect(wrapper.html()).toContain("Изменение заметки!");
    expect(wrapper.html()).toContain("Данной заметки не существует!!!");
  });
});
