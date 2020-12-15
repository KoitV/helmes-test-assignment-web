<template>
  <v-app>
    <v-main>
      <v-container style="max-width: 400px;">
        <router-view/>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import {VApp, VMain, VContainer} from "vuetify/lib";

export default {
  name: "App",
  components: {
    VApp,
    VMain,
    VContainer
  }
}
</script>

<style lang="scss" scoped>
@import url("https://fonts.googleapis.com/css?family=Roboto:100,300,400,500,700,900");
@import url("https://cdn.jsdelivr.net/npm/@mdi/font@4.x/css/materialdesignicons.min.css");
</style>