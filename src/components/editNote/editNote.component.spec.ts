/**
 * @jest-environment jsdom
 */

import { mount } from "@vue/test-utils";
import EditNote from "./editNote.component.vue";

describe("EditNote", () => {
  it("should render EditNote component", async () => {
    const wrapper = mount(EditNote, {});
    expect(wrapper.html()).toContain("Данной заметки не существует!!!");
  });
});
