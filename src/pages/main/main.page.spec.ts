/**
 * @jest-environment jsdom
 */

import { mount } from "@vue/test-utils";
import MainPage from "./main.page.vue";

describe("Main page", () => {
  it("should render Main page component", async () => {
    const wrapper = mount(MainPage, {});
    expect(wrapper.html()).toContain("Главная страница");
    expect(wrapper.html()).toContain("Заметок пока нет!!!");
  });
});
