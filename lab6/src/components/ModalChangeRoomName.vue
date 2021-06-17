<template>
  <transition name="modal-fade">
    <div class="modal-backdrop">
      <div
        class="modal"
        role="dialog"
        aria-labelledby="modalTitle"
        aria-describedby="modalDescription"
      >
        <header class="modal-header" id="modalTitle">
          <slot name="header">
            Rename room
            <button
              type="button"
              class="btn-close"
              @click="close"
              aria-label="Close modal"
            >
              x
            </button>
          </slot>
        </header>
        <section class="modal-body" id="modalDescription">
          <slot name="body">
            <input
              class="chat_name_input"
              type="text"
              placeholder="New room name"
              v-model="current"
          /></slot>
          <div class="error" v-if="error">Empty string</div>
          <div class="error" v-if="error_name">
            Room with such name is
            <p>already exists</p>
          </div>
          <button
            type="button"
            class="btn-green"
            @click="RenameChat"
            aria-label="Rename chat"
          >
            Rename
          </button>
        </section>
      </div>
    </div>
  </transition>
</template>
<script>
import { UPDATE_ROOM, USER_INFO } from "@/graphql/graphql.js";
export default {
  name: "ModalRenameChat",
  props: ["current_room_name"],
  data() {
    return {
      rooms: [],
      error: false,
      current: "",
      error_name: false,
    };
  },
  created() {
    this.current = this.current_room_name;
  },
  watch: {
    current: function () {
      this.error_name = false;
      this.error = false;
    },
    current_room_name: function () {
      this.error_name = false;
      this.current = this.current_room_name;
    },
  },
  methods: {
    async close() {
      this.error = false;
      this.current = this.current_room_name;
      this.error_name = false;
      this.$emit("close");
    },
    async RenameChat() {
      if (this.current) {
        this.error_name = false;
        this.error = false;
        const user_info = await this.$apollo.query({
          fetchPolicy: "no-cache",
          query: USER_INFO,
        });
        try {
          await this.$apollo.mutate({
            mutation: UPDATE_ROOM,
            variables: {
              id: user_info.data.me.currentRoom.id,
              name: this.current,
            },
          });
          this.current = "";
          this.close();
        } catch (err) {
          this.error_name = true;
        }
      } else {
        this.error = true;
        this.error_name = false;
      }
    },
  },
};
</script>

<style scoped>
.error {
  font-size: 15px;
  text-align: left;
}
.modal-backdrop {
  z-index: 1;
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.3);
  display: flex;
  justify-content: center;
  align-items: center;
}

.modal {
  background: #ffffff;
  overflow-x: auto;
  display: flex;
  flex-direction: column;
}

#modalTitle span {
  font-size: revert;
}
#modalTitle {
  display: flex;
  justify-content: space-between;
}

.modal-header,
.modal-footer {
  padding: 15px;
}

.modal-header {
  border-bottom: 1px solid #eeeeee;
  color: #615061;
  justify-content: space-between;
  display: inline-flex;
  font-size: x-large;
}

.modal-footer {
  border-top: 1px solid #eeeeee;
  justify-content: flex-end;
  display: flex;
}

.modal-body {
  position: relative;
  padding: 20px 10px;
}

.btn-close {
  border: none;
  font-size: 20px;
  padding: 10px;
  padding-top: 0;
  cursor: pointer;
  font-weight: bold;
  color: #615061;
  background: transparent;
}

.btn-green {
  outline: none;
  padding: 0.3em 1.2em;
  border: 0.16em solid rgba(255, 255, 255, 0);
  margin-top: 15px;
  text-decoration: none;
  font-weight: 300;
  text-shadow: 0 0.04em 0.04em rgba(0, 0, 0, 0.35);
  text-align: center;
  font-size: large;
  width: 95%;
  color: white;
  background: rgb(43, 43, 43);
  opacity: 0.9;
}

.btn-green:hover {
  opacity: 1;
}
.chat_name_input {
  width: 90%;
  padding: 6px;
  border-color: rgb(216, 216, 216);
  border-radius: 0.1rem;
}
.chat_name_input:hover {
  box-shadow: 0 0 15px 4px rgba(0, 0, 0, 0.06);
}
.chat_name_input:active,
.chat_name_input:focus {
  box-shadow: 0 0 15px 4px rgb(218, 215, 221);
  border-color: white;
}
</style>