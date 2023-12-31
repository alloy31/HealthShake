import { createRouter, createWebHistory } from "vue-router";
import Login from "@/components/user/LoginForm.vue";
import Register from "@/components/user/RegistPage.vue";
import UserMypage from "@/components/mypage/UserMy.vue";
import TrainerRegist from "@/components/trainer/TrainerRegist.vue";
import UserRegist from "@/components/user/UserRegist.vue";
import BoardRegist from "@/components/board/BoardRegist.vue";
import ReviewRegist from "@/components/review/ReviewRegist.vue";
import TrainerMypage from "@/components/mypage/TrainerMy.vue";
import TrainerMypageUpdate from "@/components/mypage/TrainerMyUpdate.vue";
import UserMypageUpdate from "@/components/mypage/UserMyUpdate.vue";
import TrainerDetail from "@/components/trainer/TrainerDetail.vue";
import PtDetail from "@/components/trainer/PtDetail.vue";
import VideoRegist from "@/components/video/VideoRegist.vue";
import BoardList from "@/components/board/BoardList.vue";
import VideoList from "@/components/video/VideoList.vue";
import Home from "@/components/common/Home.vue";
import ReviewList from "@/components/review/ReviewList.vue";
import HomeUser from "@/components/common/HomeUser.vue";
import UserBuylist from "@/components/user/UserBuylist.vue";
import UpdateBoard from "@/components/board/BoardUpdate.vue";
import UpdateReview from "@/components/review/ReviewUpdate.vue";
import UpdateVideo from "@/components/video/VideoUpdate.vue";
import HomeCopy from "@/components/common/HomeCopy.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/homeCopy",
      name: "HomeCopy",
      component: HomeCopy,
    },
    {
      path: "/login",
      name: "Login",
      component: Login,
    },
    {
      path: "/register",
      name: "Register",
      component: Register,
    },
    {
      path: "/trainerRegist",
      name: "TrainerRegist",
      component: TrainerRegist,
    },
    {
      path: "/userRegist",
      name: "UserRegist",
      component: UserRegist,
    },
    {
      path: "/boardRegist/:member_code",
      name: "BoardRegist",
      component: BoardRegist,
    },
    {
      path: "/reviewRegist/:member_code",
      name: "ReviewRegist",
      component: ReviewRegist,
    },
    {
      path: "/trainerMypage/:member_code",
      name: "trainerMypage",
      component: TrainerMypage,
    },
    {
      path: "/trainerMypageUpdate/:member_code",
      name: "trainerMypageUpdate",
      component: TrainerMypageUpdate,
    },
    {
      path: "/userMypage/:member_code",
      name: "userMypage",
      component: UserMypage,
    },
    {
      path: "/userMypageUpdate/:member_code",
      name: "userMypageUpdate",
      component: UserMypageUpdate,
    },
    {
      path: "/trainerDetail/:member_code", // :member_code를 사용하여 동적인 세그먼트를 나타냄
      name: "TrainerDetail",
      component: TrainerDetail,
    },
    {
      path: "/ptDetail/:member_code",
      name: "PtDetail",
      component: PtDetail,
    },
    {
      path: "/videoRegist",
      name: "VideoRegist",
      component: VideoRegist,
    },
    {
      path: "/boardList",
      name: "BoardList",
      component: BoardList,
    },
    {
      path: "/videoList",
      name: "VideoList",
      component: VideoList,
    },
    {
      path: "/home",
      name: "Home",
      component: Home,
    },
    {
      path: "/",
      name: "Root",
      component: Home,
    },
    {
      path: "/reviewList",
      name: "ReviewList",
      component: ReviewList,
    },
    {
      path: "/homeUser",
      name: "HomeUser",
      component: HomeUser,
    },
    {
      path: "/userBuylist/:member_code",
      name: "UserBuylist",
      component: UserBuylist,
    },
    {
      path: "/updateVideo/:video_code",
      name: "UpdateVideo",
      component: UpdateVideo,
    },
    {
      path: "/updateReview/:review_code",
      name: "UpdateReview",
      component: UpdateReview,
    },
    {
      path: "/updateBoard/:board_code",
      name: "UpdateBoard",
      component: UpdateBoard,
    },
  ],
});

export default router;
