<template>
  <div class="mess_wrap" :class="user_id === author.id ? 'own_message' : ''">
    <div class="message">
      <div class="author">{{ author.username }}</div>
      <div class="text">
        {{ mess }}
        <div class="time">{{ messTime }}</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ChatElement",
  props: ["mess", "author", "messTime", "user_id"],
};
</script>

<style scoped>
.message .author {
  font-size: large;
  color: #491c75;
}
.message .time {
  font-size: small;
  opacity: 0.6;
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
  background-color: rgb(163, 149, 163);
  margin-bottom: 5px;
  border-radius: 1em;
  overflow-wrap: anywhere;
  width: 200px;
  padding: 10px;
  background: linear-gradient(#e7d0e7, #c9cbeb);
  box-shadow: 0 0 10px rgb(0 0 0 / 15%);
}
.mess_wrap.own_message .message {
  background-color: lavender;
  margin-right: 1px;
}
</style>
