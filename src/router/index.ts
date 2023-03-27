import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import MainPage from "../pages/main/main.page.vue";
import NoteListPage from "../pages/noteList/noteList.page.vue";
import NotePage from "../pages/note/note.page.vue";
import NewNotePage from "../pages/newNote/newNote.page.vue";
import EditNotePage from "../pages/editNote/editNote.page.vue";

const routes: Array<RouteRecordRaw> = [
  { path: "/", name: "home", component: MainPage },
  { path: "/notes", name: "notes", component: NoteListPage },
  { path: "/notes/:id", name: "note", component: NotePage },
  { path: "/new", name: "new", component: NewNotePage },
  { path: "/edit/:id", name: "edit", component: EditNotePage }
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
  linkExactActiveClass: "active"
});

export default router;
