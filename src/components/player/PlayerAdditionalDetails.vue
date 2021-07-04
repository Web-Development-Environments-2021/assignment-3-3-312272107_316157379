<template>
  <div>
    <b-card  style="max-width: 80rem;">
      <b-card-body>
        <b-card-title>
            <h1>More Info</h1>
        </b-card-title>
        <b-list-group flush>
          <b-list-group-item>Common Name: {{commonName}}</b-list-group-item>
          <b-list-group-item>Country of Birth: {{birthCountry}}</b-list-group-item>
          <b-list-group-item>Date of Birth: {{dateOfBirth}}</b-list-group-item>
          <b-list-group-item v-if="height!=null">Height {{height}}</b-list-group-item>
          <b-list-group-item v-if="weight!=null">Weight {{weight}}</b-list-group-item>
        </b-list-group>
      </b-card-body>
    </b-card> 
  </div>
</template>

<script>
export default {
  props: {
    commonName: {
      type: String,
      required: true
    },
    birthCountry: {
      type: String,
      required: true,
    },
    dateOfBirth: {
      type: String,
      require: true,
    },
    height: {
        type: String,
    },
    weight: {
      type: String,
    },
  },
};
</script>

<style></style>
