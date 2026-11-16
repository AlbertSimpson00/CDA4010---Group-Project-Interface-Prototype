<script setup>
import { useRouter } from 'vue-router'

const router = useRouter()

function goHome() {
  router.push('/')
}
</script>

<template>
  <div class="success-page">
    <div class="success-card">

      <div class="success-icon">
        ✓
      </div>

      <h1>Application Submitted!</h1>

      <p class="success-message">
        Thank you for applying to UNFinished Business!
        Your application has been successfully submitted.
      </p>

      <div class="info-box">
        <h3>What Happens Next?</h3>
        <p>
          Our hiring team will review your application.
          If your qualifications match our needs,
          we may contact you regarding the next steps.
        </p>
      </div>

      <p class="thank-you">
        We appreciate your interest in joining our team!
      </p>

      <button class="home-button" @click="goHome">
        Return to Home
      </button>

    </div>
  </div>
</template>

<style scoped>
.success-page {
  min-height: 100vh;
  background: #f3f5f7;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 24px;
  box-sizing: border-box;
}

.success-card {
  width: 100%;
  max-width: 580px;
  background: white;
  padding: 48px 40px;
  border-radius: 10px;
  text-align: center;
  box-shadow: 0 4px 18px rgba(0, 0, 0, 0.06);
}

.success-icon {
  width: 76px;
  height: 76px;
  margin: 0 auto 24px;
  border-radius: 50%;
  background: #e7f5ed;
  color: #24935a;
  font-size: 44px;
  font-weight: bold;
  display: flex;
  align-items: center;
  justify-content: center;
}

h1 {
  font-size: 28px;
  color: #24476d;
  margin-bottom: 16px;
}

.success-message {
  font-size: 15px;
  line-height: 1.7;
  color: #566273;
  margin-bottom: 28px;
}

.info-box {
  background: #f7f9fc;
  border: 1px solid #dee5ed;
  border-radius: 6px;
  padding: 22px;
  margin-bottom: 24px;
  text-align: left;
}

.info-box h3 {
  font-size: 15px;
  color: #24476d;
  margin: 0 0 10px;
}

.info-box p {
  font-size: 13px;
  color: #566273;
  line-height: 1.7;
  margin: 0;
}

.thank-you {
  font-size: 13px;
  color: #7d8795;
  margin-bottom: 24px;
}

.home-button {
  background: #24476d;
  color: white;
  border: none;
  padding: 14px 28px;
  border-radius: 5px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
}

.home-button:hover {
  background: #193653;
}

@media (max-width: 600px) {
  .success-card {
    padding: 32px 22px;
  }

  h1 {
    font-size: 24px;
  }
}
</style>