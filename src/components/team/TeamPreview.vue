<template>
  <div class="header">
    <h1>{{ teamName }}</h1>
    <b-img :src="`${teamLogo}`"></b-img>
  </div>
</template>

<script>
export default {
  props: {
    teamName: {
      type: String,
      required: true,
    },
    teamLogo: {
      type: String,
      required: true,
    },
  },
};
</script>

<style>
.header {
  padding: 60px;
  text-align: center;
  background: #1abc9c;
  color: white;
  font-size: 30px;
}
</style>
