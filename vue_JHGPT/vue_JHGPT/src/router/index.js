import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/HomeView.vue";
import LoginForm from "@/components/LoginForm.vue";
import User from "../views/UserView.vue";
import UserList from "@/components/user/UserList.vue";
import UserRegist from "@/components/user/UserRegist.vue";
import UserDetail from "@/components/user/UserDetail.vue";
import Video from "../views/VideoView.vue";
import VideoList from "@/components/video/VideoList.vue";

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/login",
    name: "Login",
    component: LoginForm,
  },
  {
    path: "/user",
    component: User,
    children: [
      {
        path: "regist",
        name: "Regist",
        component: UserRegist,
      },
      {
        path: "",
        name: "List",
        component: UserList,
      },
      {
        path: ":id",
        name: "Detail",
        component: UserDetail,
      },
    ],
  },
  {
    path: "/video",
    component: Video,
    children: [
      {
        path: "",
        name: "List",
        component: VideoList,
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

export default router;
