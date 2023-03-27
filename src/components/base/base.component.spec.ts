/**
 * @jest-environment jsdom
 */

import BaseComponent from "./base.component";
import { mount } from "@vue/test-utils";

test("renders base component", () => {
  const wrapper = mount(BaseComponent, {});
  expect(wrapper).toBeTruthy();
});
