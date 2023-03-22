import { ClassComponentHooks, Options, Vue } from "vue-class-component";

@Options({
  props: {}
})
export default class BaseComponent extends Vue implements ClassComponentHooks {
  // view = this.$el;

  created(): void {
    this.activate && this.activate();
  }

  mounted(): void {
    this.mount();
    // setTimeout(() => {
    //   const div = document.createElement("div");
    //   div.textContent = "Представление не определено";
    //   div.style.color = "red";
    //   this.$el.replaceWith(div);
    //   this.$forceUpdate();
    // }, 1000);
    try {
      if (!this.$el) {
        const text = "Представление не определено";
        const div = document.createElement("div");
        div.textContent = text;
        this.$el.replaceWith(div);
        // return this.$el;
      }
    } catch (e) {
      const text = `В этом компоненте произошла ошибка: ${e}`;
      const div = document.createElement("div");
      div.textContent = text;
      div.style.color = "red";
      this.$el.replaceWith(div);
      // return this.view;
    }
  }

  updated(): boolean {
    return this.update();
  }

  unmounted(): void {
    this.dispose();
  }

  activate(): void {
    return undefined;
  }

  mount(): void {
    return undefined;
  }

  update() {
    return false;
  }

  dispose(): void {
    return undefined;
  }

  render() {
    // try {
    //   if (!this.view) {
    //     const text = "Представление не определено";
    //     const div = document.createElement("div");
    //     div.textContent = text;
    //     this.view.replaceWith(div);
    //     return this.view;
    //   }
    // } catch (e) {
    //   const text = `В этом компоненте произошла ошибка: ${e}`;
    //   const div = document.createElement("div");
    //   div.textContent = text;
    //   div.style.color = "red";
    //   this.view.replaceWith(div);
    //   return this.view;
    // }
  }
}
