<script setup>
import { application} from './stores/application.js'

import PersonalInfo from './components/PersonalInfo.vue';
import Employment from './components/Employment.vue';

async function submitApplication() {
  const response = await fetch('/submit', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(application)
  })

  const result = await response.json()
  console.log(result)
}
</script>

<template>
  <PersonalInfo />
  <Employment />
  <button
  class="btn btn-primary"
  @click="submitApplication"
  >
  Submit Application
  </button>
</template>

<style scoped>
</style>
