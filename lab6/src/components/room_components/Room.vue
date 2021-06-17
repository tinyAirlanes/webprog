<template>
  <div class="room">
    <div class="room_header">
      <span class="room_header_info">
        <span @click="$emit('room-left')" class="left_room-icon"
          ><svg
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
                d="M2058 4727 c-31 -13 -74 -38 -95 -55 -77 -62 -1882 -1878 -1907
-1920 -38 -61 -60 -154 -52 -225 14 -132 -40 -73 1014 -1129 795 -796 975
-971 1020 -994 78 -39 202 -46 285 -14 89 34 153 90 191 169 28 60 31 75 31
161 0 165 16 144 -562 729 -274 278 -534 536 -579 575 -45 40 -118 91 -167
116 l-86 45 1837 5 1837 5 57 23 c81 33 160 108 200 190 30 60 33 75 33 152
-1 70 -5 95 -27 142 -35 76 -99 143 -173 181 l-60 32 -1855 5 -1855 5 95 50
95 49 576 576 c665 664 634 624 634 795 0 89 -3 106 -28 156 -15 31 -50 78
-77 103 -72 68 -126 89 -235 93 -77 3 -98 0 -147 -20z"
              />
            </g></svg
        ></span>
        <span class="room_name_wrap">
          <span class="room_name">{{ current_room_name }}</span>
        </span>
      </span>
      <header class="dropdown_header" v-if="display_owner_buttons">
        <nav class="header__nav">
          <ul class="header__navbar">
            <li class="header__item">
              <transition name="slide-fade">
                <!-- Header Navigation Menu Icons -->
                <button
                  class="header--button"
                  v-if="show"
                  key="on"
                  @click="show = false"
                >
                  <svg viewBox="0 0 24 24" class="header--icon">
                    <title>Close</title>
                    <path d="M0 0h24v24H0V0z" fill="none" />
                    <path
                      fill="currentColor"
                      d="M18.3 5.71c-.39-.39-1.02-.39-1.41 0L12 10.59 7.11 5.7c-.39-.39-1.02-.39-1.41 0-.39.39-.39 1.02 0 1.41L10.59 12 5.7 16.89c-.39.39-.39 1.02 0 1.41.39.39 1.02.39 1.41 0L12 13.41l4.89 4.89c.39.39 1.02.39 1.41 0 .39-.39.39-1.02 0-1.41L13.41 12l4.89-4.89c.38-.38.38-1.02 0-1.4z"
                    />
                  </svg>
                </button>
                <button
                  class="header--button"
                  v-else
                  key="off"
                  @click="show = true"
                >
                  <svg viewBox="0 0 24 24" class="header--icon">
                    <path
                      fill="currentColor"
                      d="M6,8c1.1,0 2,-0.9 2,-2s-0.9,-2 -2,-2 -2,0.9 -2,2 0.9,2 2,2zM12,20c1.1,0 2,-0.9 2,-2s-0.9,-2 -2,-2 -2,0.9 -2,2 0.9,2 2,2zM6,20c1.1,0 2,-0.9 2,-2s-0.9,-2 -2,-2 -2,0.9 -2,2 0.9,2 2,2zM6,14c1.1,0 2,-0.9 2,-2s-0.9,-2 -2,-2 -2,0.9 -2,2 0.9,2 2,2zM12,14c1.1,0 2,-0.9 2,-2s-0.9,-2 -2,-2 -2,0.9 -2,2 0.9,2 2,2zM16,6c0,1.1 0.9,2 2,2s2,-0.9 2,-2 -0.9,-2 -2,-2 -2,0.9 -2,2zM12,8c1.1,0 2,-0.9 2,-2s-0.9,-2 -2,-2 -2,0.9 -2,2 0.9,2 2,2zM18,14c1.1,0 2,-0.9 2,-2s-0.9,-2 -2,-2 -2,0.9 -2,2 0.9,2 2,2zM18,20c1.1,0 2,-0.9 2,-2s-0.9,-2 -2,-2 -2,0.9 -2,2 0.9,2 2,2z"
                    />
                  </svg>
                </button>
              </transition>
              <transition name="dropdown">
                <div
                  class="dropdown__menu"
                  v-bind:class="{ active: show }"
                  v-if="show"
                >
                  <ul class="dropdown__menu-nav">
                    <li class="dropdown__menu-item">
                      <div class="dropdown__menu-text" @click="RenameRoom">
                        Rename room
                      </div>
                    </li>
                    <li class="dropdown__menu-item">
                      <div
                        class="dropdown__menu-text"
                        @click="$emit('room-deleted')"
                      >
                        Delete room
                      </div>
                    </li>
                  </ul>
                </div>
              </transition>
            </li>
          </ul>
        </nav>
      </header>
    </div>
    <div class="messages">
      <div v-for="mess in messages" :key="mess.id">
        <div
          class="mess_wrap"
          :class="user_id === mess.author.id ? 'own_message' : ''"
        >
          <div class="message">
            <div class="author">{{ mess.author.username }}</div>
            <div class="text">
              {{ mess.text }}
              <div class="time">
                {{
                  (() => {
                    norm_date = new Date(mess.timestamp);
                    return (
                      norm_date.getHours() +
                      ":" +
                      norm_date.getMinutes() +
                      " " +
                      norm_date.getDate() +
                      "-" +
                      (norm_date.getMonth() + 1)
                    );
                  })()
                }}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="wrap_input_mess">
      <div class="input_mess">
        <form class="send_mess" @submit.prevent="SendMessage">
          <input
            type="text"
            class="form_control"
            v-model="message_text"
            placeholder="Write a message..."
          />
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import {
  CREATE_MESSAGE,
  SUB_MESSAGE_CREATED,
  USER_INFO,
} from "@/graphql/graphql.js";

export default {
  name: "Room",
  props: ["messages", "user_id", "current_room_name", "display_owner_buttons"],
  data() {
    return {
      message_text: "",
      me: {},
      show: false,
    };
  },
  apollo: {
    me: {
      fetchPolicy: "no-cache",
      query: USER_INFO,
    },
    $subscribe: {
      create_rooms: {
        query: SUB_MESSAGE_CREATED,
        result({ data }) {
          this.messages.push(data.messageCreated);
        },
      },
    },
  },
  methods: {
    async SendMessage() {
      if (this.message_text) {
        await this.$apollo.mutate({
          mutation: CREATE_MESSAGE,
          variables: {
            message: this.message_text,
          },
        });
        this.message_text = "";
      }
    },
    RenameRoom() {
      this.show = false;
      this.$emit("room-rename");
    },
  },
};
</script>

<style scoped>
.room {
  width: 70%;
}
.room_header {
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
}
.room_name_wrap {
  display: flex;
  text-overflow: ellipsis;
  overflow: hidden;
}
.room_header_info {
  display: flex;
  width: 70%;
}
.room_name {
  margin-left: 15px;
  font-size: 30px;
  width: inherit;
  text-overflow: ellipsis;
  overflow: hidden;
}
.messages {
  overflow-y: auto;
  height: 85%;
}
.messages::-webkit-scrollbar {
  width: 10px;
}
.messages::-webkit-scrollbar-track {
  border: 7px solid #232943;
  box-shadow: inset 0 0 2.5px 2px rgba(0, 0, 0, 0);
}
.messages::-webkit-scrollbar-thumb {
  background: linear-gradient(#e66465, #9198e5);
  border-radius: 3px;
}
.send_btn {
  border-radius: 0.5em;
}
.send_btn img {
  width: 30px;
  height: 30px;
}
.send_mess {
  display: flex;
  width: inherit;
}
.input_mess {
  width: inherit;
}
input.form_control {
  border: 2px solid #94674c;
  width: inherit;
  padding: 10px;
  border-radius: 0.5em;
}
.wrap_input_mess {
  width: 100%;
}

.dropdown_header {
  width: 30px;
  height: 30px;
}

.messages::-webkit-scrollbar {
  width: 10px;
}
.messages::-webkit-scrollbar-track {
  border: 7px solid #232943;
  box-shadow: inset 0 0 2.5px 2px rgba(0, 0, 0, 0);
}
.messages::-webkit-scrollbar-thumb {
  background: rgb(125 90 90);
  border-radius: 3px;
}

.dropdown__menu {
  right: 0;
  z-index: 10;
  margin-top: 1rem;
  overflow-y: auto;
  position: absolute;
  border-radius: 12px;
  background-color: white;
  border: 1px solid;
  background-clip: padding-box;
  margin-right: 10px;
}
.dropdown__menu-nav {
  padding: 0;
  width: 150px;
}
.dropdown__menu-link {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  text-decoration: none;
  color: rgba(0, 0, 0, 0.6);
  padding: 0.5em;
  margin-top: 0.2rem;
  margin-bottom: 0.2rem;
  border-radius: 0 50px 50px 0;
}
.dropdown__menu-item:hover {
  color: #525a56;
}
.dropdown__menu-svg {
  width: 1.5rem;
  height: 1.5rem;
}
.dropdown__menu-text {
  font-weight: 300;
  margin: 10px;
  font-size: larger;
}
.dropdown__menu-item {
  list-style-type: none;
}

.header__nav {
  position: relative;
}
.header__navbar {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  margin: 0;
}
.header__item {
  padding: 1rem;
  list-style-type: none;
}
.header--icon {
  width: 1.65rem;
  height: 1.65rem;
  margin-right: 10px;
}
.header--button {
  top: 0;
  right: 0;
  position: absolute;
  margin: 0;
  padding: 0;
  color: gray;
  cursor: pointer;
  border: 1px solid transparent;
  background-color: transparent;
}
.header--button:focus {
  outline: 0;
}
.left_room-icon svg {
  height: 30px;
  width: 30px;
  display: inline;
}

.message .author {
  font-size: x-large;
  color: #94674c;
}
.message .time {
  font-size: small;
  opacity: 0.6;
  text-align: end;
}
.mess_wrap {
  width: inherit;
  display: grid;
  justify-content: left;
  margin-left: 10px;
}
.mess_wrap.own_message {
  justify-content: right;
  text-align: end;
  margin-right: 10px;
}
.mess_wrap .message {
  background-color: rgb(58, 56, 56);
  margin-bottom: 5px;
  border-radius: 0.3em;
  color: white;
  overflow-wrap: anywhere;
  width: 200px;
  padding: 10px;
  box-shadow: 0 0 10px rgb(0 0 0 / 15%);
}
.mess_wrap.own_message .message {
  background-color: rgb(58, 56, 56);
  color: white;
  margin-right: 1px;
}
</style>