/**
 * @jest-environment jsdom
 */

import { mount } from "@vue/test-utils";
import Navbar from "./navbar.component.vue";

describe("Navbar", () => {
  it("should render Navbar component", async () => {
    const wrapper = mount(Navbar, {});
    expect(wrapper.html()).toContain("Заметки");
  });
});
