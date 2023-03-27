/**
 * @jest-environment jsdom
 */

import { mount } from "@vue/test-utils";
import MainLayout from "./main.layout.vue";

describe("Main Layout page", () => {
  it("should render Main Layout component", async () => {
    const wrapper = mount(MainLayout, {});
    expect(wrapper.html()).toContain(/Все заметки/i);
  });
});
