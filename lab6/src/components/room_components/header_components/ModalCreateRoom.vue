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
            <span>Create room</span>
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
              placeholder="Room name"
              v-model="chat_name"
          /></slot>
          <div class="error" v-if="error">Empty string</div>
          <div class="error" v-if="error_name">
            Room name is
            <p>exists</p>
          </div>
          <button
            type="button"
            class="btn-green"
            @click="CreateChat"
            aria-label="Create chat"
          >
            Create
          </button>
        </section>
      </div>
    </div>
  </transition>
</template>
<script>
import { CREATE_ROOM } from "@/graphql/graphql.js";
export default {
  name: "ModalCreateChat",
  data() {
    return {
      error: false,
      chat_name: "",
      error_name: false,
      rooms: [],
    };
  },
  watch: {
    chat_name: function () {
      this.error_name = false;
      this.error = false;
    },
  },
  methods: {
    close() {
      this.$emit("close");
    },
    async CreateChat() {
      if (this.chat_name) {
        this.error_name = false;
        this.error = false;
        try {
          await this.$apollo.mutate({
            mutation: CREATE_ROOM,
            variables: {
              room_name: this.chat_name,
            },
          });
          this.chat_name = "";
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

#modalTitle span {
  font-size: revert;
}
#modalTitle {
  display: flex;
  justify-content: space-between;
}

.modal {
  background: #ffffff;
  overflow-x: auto;
  display: flex;
  flex-direction: column;
}

.modal-header,
.modal-footer {
  padding: 10px;
}

.modal-header {
  border-bottom: 1px solid #eeeeee;
  color: #615061;
}

.modal-footer {
  border-top: 1px solid #eeeeee;
  justify-content: flex-end;
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