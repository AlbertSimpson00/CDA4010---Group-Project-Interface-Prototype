<script setup>
import { application } from '../stores/application.js'
</script>

<template>
  <div class="container mt-4">
    <h3>Employment Information</h3>

    <input
      v-model="application.employment.position"
      class="form-control mb-3"
      placeholder="Position Applied For"
    />

    <label>
      <input
        type="checkbox"
        v-model="application.employment.fullTime"
      />
      Available Full-Time
    </label>
  </div>
</template>