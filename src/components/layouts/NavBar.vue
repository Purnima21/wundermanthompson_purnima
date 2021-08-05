<template>
  <nav class="nav-vue navbar navbar-expand-lg navbar-light bg-light">
    <router-link
      class="navbar-brand"
      to="/"
      exact
    >
     Assignement
    </router-link>
    <button
      class="navbar-toggler"
      type="button"
      data-toggle="collapse"
      data-target="#navbarSupportedContent"
      aria-controls="navbarSupportedContent"
      aria-expanded="false"
      aria-label="Toggle navigation"
    >
      <span class="navbar-toggler-icon"></span>
    </button>
  </nav>
</template>

<script>
export default {

}
</script>

<style scoped>
.nav-vue {
  background: #42b883 !important;
  color: #fff !important;
  -webkit-box-shadow: 3px -2px 15px -4px #000000;
  box-shadow: 3px -2px 15px -4px #000000;
}

.nav-vue .nav-link {
  color: rgb(221, 221, 221) !important;
}

.nav-vue .nav-link.active {
  color: #fff !important;
}
</style>