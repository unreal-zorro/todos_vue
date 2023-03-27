/**
 * @jest-environment jsdom
 */

import { mount } from "@vue/test-utils";
import Modal from "./modal.component.vue";
import { ModalDialogModel } from "../../models/viewModel/modalDialog/modalDialog.model";

const modalDialog = new ModalDialogModel();

modalDialog.show = true;
modalDialog.title = "Подтвердите отмену изменений";
modalDialog.text = "Вы точно хотите отменить изменения в данной заметке?";
modalDialog.textOkButton = "Отменить";
modalDialog.textCancelButton = "Нет, не отменять";
modalDialog.handleSave = () => undefined;
modalDialog.okIsLink = false;
modalDialog.to = "";

describe("Modal", () => {
  it("should render Modal component", async () => {
    const wrapper = mount(Modal, {
      props: {
        show: modalDialog.show,
        title: modalDialog.title,
        text: modalDialog.text,
        textOkButton: modalDialog.textOkButton,
        textCancelButton: modalDialog.textCancelButton,
        handleClose: modalDialog.handleClose,
        handleSave: modalDialog.handleSave,
        okIsLink: modalDialog.okIsLink,
        to: modalDialog.to
      }
    });
    expect(wrapper.html()).toContain(modalDialog.title);
  });
});
