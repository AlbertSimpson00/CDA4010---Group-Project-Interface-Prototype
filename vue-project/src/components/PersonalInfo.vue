<script setup>
import { application } from '../stores/application.js'
</script>

<template>
  <div class="container mt-4">
    <h3>Personal Information</h3>

    <input
      v-model="application.personalInfo.firstName"
      class="form-control mb-3"
      placeholder="First Name"
    />

    <input
      v-model="application.personalInfo.lastName"
      class="form-control mb-3"
      placeholder="Last Name"
    />
  </div>
</template>