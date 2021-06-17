<template>
  <div>
    <div class="no_page_404">
      No page 404
      <div class="link">
        <span>
          Already with us?
          <router-link to="/login">Sign in</router-link>
        </span>
        <br />
        <span>
          New to us?
          <router-link to="/registration">Sign up</router-link>
        </span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "PageNotFound",
};
</script>

<style scoped>
.no_page_404 {
  text-align: center;
  padding-bottom: 10px;
  font-size: 20px;
  bottom: 45%;
  position: absolute;
  width: 100%;
  font-size: xxx-large;
}
.link {
  border-top: solid rgb(233, 233, 233);
  padding: 5px;
  font-size: 30px;
}

.link span a {
  text-decoration: none;
}
</style>
