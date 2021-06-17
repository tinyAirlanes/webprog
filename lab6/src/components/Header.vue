<template>
  <div class="header">
    <div class="user_name">
      {{ me.username }}
    </div>
    <div class="create_room">
      <button
        type="button"
        class="btn button"
        @click="showModal"
        style="width: 55px"
      >
        <span class="button__line button__line--top"></span>
        <span class="button__line button__line--right"></span>
        <span class="button__line button__line--bottom"></span>
        <span class="button__line button__line--left"></span>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 50 50">
          <path
            d="M 7 4 C 4.243 4 2 6.243 2 9 L 2 33 C 2 35.757 4.243 38 7 38 L 11.140625 38 C 11.479625 40.895 10.625328 42.858578 8.4863281 44.142578 C 8.1013281 44.373578 7.9171094 44.834578 8.0371094 45.267578 C 8.1561094 45.700578 8.55 46 9 46 C 11.56 46 17.707594 45.205 20.683594 38 L 28.179688 38 C 28.295687 37.311 28.470266 36.644 28.697266 36 L 20 36 C 19.581 36 19.205547 36.261297 19.060547 36.654297 C 17.419547 41.130297 14.418937 42.90975 11.960938 43.59375 C 13.141937 41.84475 13.485375 39.578313 12.984375 36.820312 C 12.897375 36.345312 12.483 36 12 36 L 7 36 C 5.346 36 4 34.654 4 33 L 4 9 C 4 7.346 5.346 6 7 6 L 43 6 C 44.654 6 46 7.346 46 9 L 46 29.617188 C 46.718 30.033188 47.386 30.522266 48 31.072266 L 48 9 C 48 6.243 45.757 4 43 4 L 7 4 z M 40 30.011719 C 37.43675 30.011719 34.874187 30.985188 32.929688 32.929688 C 29.040688 36.818687 29.040688 43.181312 32.929688 47.070312 C 36.818687 50.959313 43.181312 50.959312 47.070312 47.070312 C 50.959312 43.181313 50.959313 36.818688 47.070312 32.929688 C 45.125813 30.985187 42.56325 30.011719 40 30.011719 z M 40 32.009766 C 42.050625 32.009766 44.10075 32.78825 45.65625 34.34375 C 48.76725 37.45475 48.76725 42.54525 45.65625 45.65625 C 42.54425 48.76725 37.45475 48.76725 34.34375 45.65625 C 31.23275 42.54425 31.23275 37.45475 34.34375 34.34375 C 35.89975 32.78825 37.949375 32.009766 40 32.009766 z M 40 34.060547 C 39.434 34.060547 39.009766 34.484781 39.009766 35.050781 L 39.009766 39.009766 L 35.050781 39.009766 C 34.484781 39.009766 34.060547 39.434 34.060547 40 C 34.060547 40.566 34.484781 40.990234 35.050781 40.990234 L 39.009766 40.990234 L 39.009766 44.949219 C 39.009766 45.515219 39.434 45.939453 40 45.939453 C 40.283 45.939453 40.566031 45.79725 40.707031 45.65625 C 40.849031 45.51525 40.990234 45.232219 40.990234 44.949219 L 40.990234 40.990234 L 44.949219 40.990234 C 45.232219 40.990234 45.51525 40.848031 45.65625 40.707031 C 45.79825 40.566031 45.939453 40.283 45.939453 40 C 45.939453 39.434 45.515219 39.009766 44.949219 39.009766 L 40.990234 39.009766 L 40.990234 35.050781 C 40.990234 34.485781 40.566 34.060547 40 34.060547 z"
          ></path>
        </svg>
      </button>
      <ModalCreateRoom v-show="isModalVisible" @close="closeModal" />
    </div>
    <div class="right_btn">
      <div class="link_logout">
        <a href="/login" class="button logout" @click.prevent="LogOut">
          <span>
            <svg
              version="1.0"
              xmlns="http://www.w3.org/2000/svg"
              width="512.000000pt"
              height="512.000000pt"
              viewBox="0 0 512.000000 512.000000"
              preserveAspectRatio="xMidYMid meet"
            >
              <g
                transform="translate(0.000000,512.000000) scale(0.100000,-0.100000)"
                fill="#000000"
                stroke="none"
              >
                <path
                  d="M482 5090 c-178 -47 -332 -171 -411 -331 -76 -154 -71 2 -71 -2199 0
-1696 2 -1985 15 -2045 49 -232 236 -425 471 -485 74 -19 115 -20 1094 -20
l1016 0 51 25 c72 36 106 90 111 175 4 81 -23 140 -87 185 l-43 30 -1021 5
-1022 5 -40 22 c-50 27 -80 58 -100 105 -13 33 -15 251 -15 1998 0 1747 2
1965 15 1998 20 47 50 78 100 105 l40 22 1022 5 1021 5 43 30 c64 45 91 104
87 185 -5 85 -39 139 -111 175 l-51 25 -1020 -1 c-972 0 -1025 -1 -1094 -19z"
                />
                <path
                  d="M3556 4040 c-135 -43 -196 -206 -118 -317 15 -21 232 -240 482 -488
250 -247 457 -453 458 -457 2 -5 -563 -8 -1255 -8 l-1259 0 -44 -22 c-55 -29
-95 -79 -112 -140 -24 -91 24 -190 112 -235 l44 -23 1259 0 c692 0 1257 -3
1255 -8 -1 -4 -208 -210 -458 -457 -250 -248 -467 -467 -482 -488 -121 -172
85 -399 275 -300 40 20 1363 1327 1385 1368 22 40 22 150 0 190 -22 42 -1345
1348 -1386 1369 -40 21 -117 29 -156 16z"
                />
              </g>
            </svg> </span
        ></a>
      </div>
    </div>
  </div>
</template>

<script>
import ModalCreateRoom from "./room_components/header_components/ModalCreateRoom.vue";
import { onLogout } from "./../vue-apollo";
import { USER_INFO } from "@/graphql/graphql.js";
export default {
  name: "Header",
  components: {
    ModalCreateRoom,
  },
  data() {
    return {
      isModalVisible: false,
      me: {},
    };
  },
  async created() {
    const me = await this.$apollo.query({
      fetchPolicy: "no-cache",
      query: USER_INFO,
    });
    this.me = me.data.me;
  },
  methods: {
    showModal() {
      this.isModalVisible = true;
    },
    closeModal() {
      this.isModalVisible = false;
    },
    async LogOut() {
      await onLogout(this.$apollo.provider.defaultClient);
      //await this.$apollo.provider.defaultClient.resetStore();
      this.$router.push("/login");
    },
  },
};
</script>

<style>
.link_logout {
  display: flex;
}
.user_name {
  padding: 5px;
  padding-top: 7px;
  width: 20%;
  overflow: hidden;
  text-overflow: ellipsis;
}
.button {
  position: relative;
  color: #f4d8f7;
  overflow: hidden;
  padding: 5px;
  border: 0px solid;
  border-radius: 1rem;
  font: unset;
}
.button.logout {
  padding-top: 8px;
  margin-left: 5px;
}
.button.logout svg {
  width: 40px;
  height: 40px;
}

.left_logo {
  display: flex;
}
.header {
  padding: 5px;
  text-align: center;
  background: #565555;
  color: #d8cbc4;
  font-size: 30px;
  display: flex;
  height: 50px;
  justify-content: space-between;
}
.right_btn {
  display: flex;
  justify-content: center;
}
.left_logo img {
  width: 30px;
}
.right_btn a {
  text-decoration: none;
}
.create_room button {
  background: transparent;
  margin-right: 5px;
}
</style>