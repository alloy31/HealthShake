<template>
  <div class="trainer-detail">
    <h1>운영중인 피티 상세 페이지</h1>
    <!--트레이너 본인이 보는 피티 상세 페이지, 수정 기능 넣기--> 

    <div v-if="isTrainerLoaded && trainer!= null" class="trainer-info">
      <div class="profile">
        <div class="profile-section">
          <h2>프로필</h2>
          <img :src="trainer.profileImagePath" alt="Trainer Profile" class="trainer-profile-image">
          <p><strong>이름:</strong> {{ trainer.name }}</p>
          <p><strong>닉네임:</strong> {{ trainer.nickname }}</p>
          <p><strong>소개:</strong> {{ trainer.readme }}</p>
        </div>
        <div class="edit-button">
          <button @click="goToTrainerMypageUpdate" class="btn btn-primary">프로필 수정</button>
        </div>

        <hr>

        <div v-if="isVideoLoaded && videos != null" class="section video">
          <h2>비디오</h2>
           <div class="video-card">
            <table class="video-list">
              <colgroup>
                <col style="width: 20%" />
                <col style="width: 40%" />
                <col style="width: 10%" />
                <col style="width: 30%" />
              </colgroup>
              <thead>
                <tr>
                  <th>Category</th>
                  <th>소개글</th>
                  <th>조회수</th>
                  <th>URL</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="video in videos" :key="video.code">
                  <td>{{ video.title }}</td>
                  <td>{{ video.readme }}</td>
                  <td>{{ video.viewcnt }}</td>
                  <td>
                    <a :href="video.url" target="_blank" rel="noopener noreferrer">{{ video.url }}</a>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>        
        </div>

        <router-link :to="{ name: 'VideoRegist', params: { member_code: route.params.member_code } }">
        <button class="btn btn-primary">비디오 추가 등록</button>
      </router-link>

        <hr>

        <div v-if="isBoardLoaded && boards != null" class="section board">
          <h2>게시판</h2>
          <div class="board-card">
            <table class="board-list">
              <colgroup>
                <col style="width: 10%" />
                <col style="width: 25%" />
                <col style="width: 35%" />
                <col style="width: 30%" />
              </colgroup>
              <thead>
                <tr>
                  <th>번호</th>
                  <th>작성자</th>
                  <th>카테고리</th>
                  <th>내용</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="board in boards" :key="board.code">
                  <td>{{ board.code }}</td>
                  <td>{{ board.writercode }}</td>
                  <td>{{ board.title }}</td>
                  <td>{{ board.content}}</td>
                  <!-- <router-link :to="{ name: 'BoardUpdate', params: { board_code: board.code } }">
                    <button class="btn btn-primary">수정</button>
                  </router-link> -->
                </tr>
              </tbody>
            </table>
          </div>
          <div>
          </div>
        </div>
        <router-link :to="{ name: 'BoardRegist', params: { member_code: route.params.member_code } }">
          <button class="btn btn-primary">게시물 등록</button>
        </router-link>

        <hr>

        <div v-if="isReviewLoaded && reviews != null" class="section review">
          <h2>리뷰 리스트</h2>
          <div class="review-card">
          <table class="review-list">
            <colgroup>
              <col style="width: 5%" />
              <col style="width: 20%" />
              <col style="width: 60%" />
              <col style="width: 15%" />
            </colgroup>
            <thead>
              <tr>
                <th>번호</th>
                <th>작성자 아이디</th>
                <th>내용</th>
                <th>별점</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="review in reviews" :key="review.code">
                <td>{{ review.code }}</td>
                <td>{{ review.writer }}</td>
                <td>{{ review.content }}</td>
                <td>{{ review.rating }}</td>
              </tr>
            </tbody>
          </table>
          </div>
        </div>

        <hr>   
      </div>
    </div>

    <div v-else>
      데이터 로딩 중...
    </div>
  </div>
</template>

<script setup>
import { useMemberStore } from "@/stores/memberStore";
import { useVideoStore } from "@/stores/videoStore";
import { useBoardStore } from "@/stores/boardStore";
import { useReviewStore } from "@/stores/reviewStore";
import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";
import { computed } from "vue";
import router from "@/router";

const memberStore = useMemberStore();
const videoStore = useVideoStore();
const boardStore = useBoardStore();
const reviewStore = useReviewStore();
const route = useRoute();
const sessionMember = JSON.parse(sessionStorage.getItem('loginMember'));
const trainer = computed(() => memberStore.trainer);
const isTrainerLoaded = computed(() => trainer.value !== null);
const isVideoLoaded = computed(() => videoStore.videoList.length>0);
const isReviewLoaded = computed(() => reviewStore.reviewList.length>0);
const isBoardLoaded = computed(() => boardStore.boardList.length>0);
const reviews = computed(() => reviewStore.reviewList);
const boards = computed(() => boardStore.boardList);
const videos = computed(() => videoStore.videoList);

onMounted(async () => {
  try {
    const member_code = route.params.member_code;
    await memberStore.selectTrainerPromise(member_code);

    await videoStore.VideoListByTrainer(member_code);

    await boardStore.BoardListByMemberPromise(member_code);

    await reviewStore.ReviewListByTrainer(member_code);

    isTrainerLoaded.value = trainer.value !== null;
    isVideoLoaded.value = videos.value !== null;
    isReviewLoaded.value = reviews.value !== null;
    isBoardLoaded.value = boards.value !== null;



  } catch (error) {
    console.error("트레이너 정보를 불러오는 동안 오류가 발생했습니다:", error);
  }
});

const goToTrainerMypageUpdate = () => {
  const memberCode = sessionMember ? sessionMember.member_code : null;
  console.log('memberCode: ', memberCode);
  if (memberCode) {
    router.push({ name: 'trainerMypageUpdate', params: { member_code: memberCode } });
  } else {
    // Handle the case where member_code is not available
    console.error('Member code not available');
  }
};

//각각 리스트에 데이터 담기는지 확인
</script>

<style scoped>
/* 추가적인 스타일링을 위한 CSS 코드 */

.profile-section,
.video-card,
.board-card,
.review-card {
  border: 1px solid #ddd; /* Add border to each section */
  border-radius: 8px; /* Optional: Add border-radius for a rounded appearance */
  padding: 20px; /* Add padding for spacing */
  margin-bottom: 20px; /* Add margin for separation between sections */
}

.profile-section table,
.video-card table,
.board-card table,
.review-card table {
  width: 100%; /* Ensure tables take full width inside their parent div */
  border-collapse: collapse; /* Collapse table borders for a cleaner look */
}

.profile-section th,
.video-card th,
.board-card th,
.review-card th {
  background-color: peachpuff; /* Header background color */
  padding: 10px; /* Padding for table headers */
}
.profile-section td,
.video-card td,
.board-card td,
.review-card td {
  padding: 10px; /* Padding for table cells */
}

.trainer-detail {
  padding: 20px;
}

.section {
  padding: 20px;
  border-radius: 8px;
  margin-bottom: 20px;
}

.trainer-info {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.profile {
  background-color: #f9f9f9;
  padding: 20px;
  border-radius: 8px;
}

.profile-section {
  margin-bottom: 20px;
}

h2 {
  font-size: 1.2em;
  margin-bottom: 10px;
}

hr {
  border: none;
  border-top: 1px solid #ddd;
  margin: 20px 0;
}

.btn {
  padding: 8px 16px;
  font-size: 14px;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.btn-primary {
  background-color: lightsalmon;
  color: #fff;
  border: none;
}

.btn-primary:hover {
  background-color: salmon;
}

.profile {
  background-color: #f9f9f9;
}

.video {
  background-color: #e8f4f8;
}

.board {
  background-color: lavenderblush;
}

.review {
  background-color: oldlace;
}
</style>