
<script setup>
import { application } from '../stores/application.js'
</script>

<template>
  <div>
    <h1>Personal Information</h1>
    <p>Tell us how we can contact you.</p>

    <input
      type="text"
      placeholder="First Name"
      v-model="application.personalInfo.firstName"
    />

    <input
      type="text"
      placeholder="Last Name"
      v-model="application.personalInfo.lastName"
    />
  </div>
</template>
