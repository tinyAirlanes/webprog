<template>
  <div class="room_lists">
    <div class="room_h2"></div>
    <div class="room_list">
      <div v-for="room in rooms" :key="room.id">
        <div
          class="room_list_element"
          @click="JoinRoom(room.id)"
          v-bind:class="{ your_room: user_id === room.owner.id }"
        >
          <div class="info">
            <span>{{ room.name }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { JOIN_ROOM } from "@/graphql/graphql.js";

export default {
  name: "RoomList",
  props: ["rooms", "user_id"],
  data() {
    return {
      active: false,
    };
  },
  methods: {
    async JoinRoom(room_id) {
      const room_info = await this.$apollo.mutate({
        mutation: JOIN_ROOM,
        variables: {
          id: room_id,
        },
      });
      this.$emit("room-clicked", {
        data: room_info.data,
      });
    },
  },
};
</script>

<style scoped>
.room_list {
  overflow-y: auto;
  height: 95%;
  position: absolute;
  width: 30%;
}
.room_lists {
  width: 30%;
}
.room_lists h2 {
  padding-top: 0px;
  margin-top: 0px;
}
.room_list::-webkit-scrollbar {
  width: 10px;
}
.room_list::-webkit-scrollbar-track {
  border: 7px solid #232943;
  box-shadow: inset 0 0 2.5px 2px rgba(0, 0, 0, 0);
}
.room_list::-webkit-scrollbar-thumb {
  background: rgb(125 90 90);
  border-radius: 3px;
}

.room_list_element {
  width: inherit;
  overflow: hidden;
  padding: 3px;
  display: flex;
  justify-content: space-between;
  margin: 5px 2px;
  box-shadow: rgba(50, 50, 93, 0.25) 0px 50px 100px -20px,
    rgba(0, 0, 0, 0.3) 0px 30px 60px -30px,
    rgba(10, 37, 64, 0.35) 0px -2px 6px 0px inset;
  border-radius: 1em;
}

.room_list_element.your_room {
  box-shadow: rgb(89 54 28) 0px 50px 100px -20px,
    rgb(33 13 4) 0px 30px 60px -30px, rgb(72 40 0 / 94%) 0px -2px 6px 0px inset;
}
.room_list_element:hover,
.info.true {
  border: 1px solid;
}
.room_list_element img {
  width: 40px;
  height: 40px;
  border-radius: 2em;
}
.room_list_element .info span {
  padding-left: 10px;
  font-size: x-large;
  padding-top: 3px;
  overflow: hidden;
  text-overflow: ellipsis;
  width: 100%;
}

.room_list_element .info {
  display: flex;
  justify-content: space-between;
  width: 100%;
}
</style>