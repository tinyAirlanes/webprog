<template>
  <div>
    <Header />
    <ModalChangeRoomName
      v-show="isModalVisible"
      @close="closeModal"
      :current_room_name="current_room_name"
    />
    <div class="rooms_block">
      <div class="rooms">
        <RoomList
          v-if="display_list"
          @room-clicked="RoomInfoProps"
          v-bind:rooms="rooms"
          :user_id="me.id"
        />
        <Room
          v-bind:messages="messages"
          v-if="display_room"
          :user_id="me.id"
          :current_room_name="current_room_name"
          :display_owner_buttons="display_owner_buttons"
          @room-left="LeftRoom"
          @room-deleted="DeleteRoom"
          @room-rename="showModal"
        />
        <RoomInfo
          v-bind:members="members"
          v-bind:owner="owner"
          v-if="display_room"
          :user_id="me.id"
        />
        <div class="no_room" v-if="!display_room">
          <span>Select a room to start messaging</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import RoomList from "@/components/room_components/RoomList";
import Room from "@/components/room_components/Room";
import RoomInfo from "@/components/room_components/RoomInfo";
import ModalChangeRoomName from "@/components/ModalChangeRoomName";
import Header from "@/components/Header.vue";
import {
  LEAVE_ROOM,
  USER_INFO,
  DELETE_ROOM,
  GET_ROOMS,
  SUB_ROOM_CREATED,
  SUB_ROOM_DELETED,
  SUB_MEMBER_JOINED,
  SUB_ROOM_UPDATED,
  SUB_MEMBER_LEFT,
} from "@/graphql/graphql.js";

export default {
  name: "Rooms",
  data() {
    return {
      messages: [],
      members: [],
      rooms: [],
      owner: "",
      me: {},
      display_room: false,
      display_list: true,
      display_owner_buttons: false,
      isModalVisible: false,
      current_room_name: "",
    };
  },
  apollo: {
    $subscribe: {
      create_rooms: {
        query: SUB_ROOM_CREATED,
        result({ data }) {
          this.rooms.push(data.roomCreated);
        },
      },
      delete_room: {
        query: SUB_ROOM_DELETED,
        async result({ data }) {
          let right_index = -1;
          this.rooms.forEach((item, index) =>
            item.id === data.roomDeleted.id ? (right_index = index) : ""
          );
          this.rooms.splice(right_index, 1);
          const me = await this.$apollo.query({
            fetchPolicy: "no-cache",
            query: USER_INFO,
          });
          if (!me.data.me.currentRoom) {
            this.display_room = false;
            this.display_list = true;
          }
        },
      },
      rename_room: {
        query: SUB_ROOM_UPDATED,
        result({ data }) {
          if (data.roomUpdated.owner.id === this.me.id) {
            this.current_room_name = data.roomUpdated.name;
          }
          const new_rooms = this.rooms.map((item) => {
            item.id === data.roomUpdated.id ? (item = data.roomUpdated) : item;
            return item;
          });
          this.rooms = new_rooms;
        },
      },
      joined_room: {
        query: SUB_MEMBER_JOINED,
        result({ data }) {
          this.members.push(data.memberJoined);
        },
      },
      left_room: {
        query: SUB_MEMBER_LEFT,
        result({ data }) {
          let right_index = -1;
          this.members.forEach((item, index) =>
            item.id === data.memberLeft.id ? (right_index = index) : ""
          );
          this.members.splice(right_index, 1);
        },
      },
    },
  },
  components: {
    RoomList,
    Room,
    RoomInfo,
    ModalChangeRoomName,
    Header,
  },
  async created() {
    const me = await this.$apollo.query({
      fetchPolicy: "no-cache",
      query: USER_INFO,
    });
    if (me.data.me.currentRoom) {
      await this.OpenRoom(me);
    }
    const rooms = await this.$apollo.query({
      query: GET_ROOMS,
    });
    this.rooms = rooms.data.rooms;
    this.me = me.data.me;
  },
  methods: {
    async showModal() {
      const me = await this.$apollo.query({
        fetchPolicy: "no-cache",
        query: USER_INFO,
      });
      this.current_room_name = me.data.me.currentRoom.name;
      this.isModalVisible = true;
    },
    closeModal() {
      this.isModalVisible = false;
    },
    async LeftRoom() {
      await this.$apollo.mutate({
        mutation: LEAVE_ROOM,
      });
      this.display_room = false;
      this.display_list = true;
      this.display_owner_buttons = false;
    },
    async DeleteRoom() {
      const user_info = await this.$apollo.query({
        fetchPolicy: "no-cache",
        query: USER_INFO,
      });
      await this.$apollo.mutate({
        mutation: DELETE_ROOM,
        variables: {
          id: user_info.data.me.currentRoom.id,
        },
      });
      this.display_room = false;
      this.display_list = true;
      this.display_owner_buttons = false;
    },
    async OpenRoom(data) {
      const user_info = await this.$apollo.query({
        fetchPolicy: "no-cache",
        query: USER_INFO,
      });
      this.ChangeData(user_info, data.data.me.currentRoom);
    },
    async RoomInfoProps(data) {
      const user_info = await this.$apollo.query({
        fetchPolicy: "no-cache",
        query: USER_INFO,
      });
      this.ChangeData(user_info, data.data.joinRoom);
    },
    ChangeData(user_info, info) {
      this.current_room_name = info.name;
      this.messages = info.lastMessages;
      this.members = info.members;
      this.owner = info.owner;
      if (user_info.data.me.id === this.owner.id) {
        this.display_owner_buttons = true;
      }
      this.display_room = true;
      this.display_list = false;
    },
  },
};
</script>

<style>
.outer {
  padding: 2px;
  border-radius: 1em;
  width: 60%;
  opacity: 0.95;
  box-shadow: 0 0 10px rgb(0 0 0 / 50%);
  margin-bottom: 10px;
}
.outer:hover {
  opacity: 1;
}

.text-container {
  padding: 5px 10px;
  min-width: 0;
  font-size: 2rem;
  color: #708090;
  white-space: nowrap;
  overflow: visible;
  position: relative;
  border: 1px solid #708090;
  border-radius: 5px;
  margin-bottom: 5px;
}

.text-container span {
  display: inline-block;
}

.link_logout,
.create_room {
  display: flex;
}
.no_room {
  margin: auto;
  font-size: xxx-large;
  width: 60%;
}

.rooms_block {
  margin: 0;
  margin-top: 0px;
  margin-right: 0px;
  position: absolute;
  top: 50%;
  left: 50%;
  /* background-color: white; */
  padding: 20px;
  padding-top: 20px;
  padding-top: 30px;
  width: 90%;
  height: 80%;
  border-radius: 2em;
  margin-right: -50%;
  transform: translate(-50%, -50%);
  margin-top: 40px;
  overflow: hidden;
}
.rooms {
  display: inline-flex;
  /* background-color: white; */
  height: 100%;
  width: 100%;
}
</style>