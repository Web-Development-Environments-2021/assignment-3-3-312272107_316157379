<template>
  <div>
    <b-card  style="max-width: 40rem;">
      <b-card-body>
        <b-card-title>
            Additional Details
        </b-card-title>
        <b-list-group flush>
          <b-list-group-item>Common Name: {{commonName}}</b-list-group-item>
          <b-list-group-item>Nationality: {{birthCountry}}</b-list-group-item>
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
      type: Number,
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
        type: Number,
    },
    weight: {
      type: Number,
    },
  },
};
</script>

<style></style>
