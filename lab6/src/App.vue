<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
export default {
  name: "App",
};
</script>

<style>
button,
input {
  outline: none !important;
}

* {
  font-family: "Nunito", sans-serif;
}
#app {
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  overflow: auto;
  background: rgb(233, 233, 233);
}

@import url("https://fonts.googleapis.com/css2?family=Nunito:wght@300&display=swap");

@keyframes gradient {
  0% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0% 50%;
  }
}
</style>
