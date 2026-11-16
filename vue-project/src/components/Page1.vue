<script setup>
import { application } from '../stores/application.js'
import { useRouter } from 'vue-router'

const router = useRouter()

function demoAutofill() {
  Object.assign(application.personalInfo, {
    firstName: 'John',
    lastName: 'Stewart',
    streetAddress: '2814 Beware Green Lanterns Light',
    apartment: 'Sector 2814',
    city: 'Detroit',
    state: 'Michigan',
    zipCode: '48201',
    phone: '3135550142',
    email: 'john.stewart@example.com'
  })
}

function nextPage() {
  router.push('/page2')
}
</script>
<template>
  <div class="page">

    <header class="top-header">
      <span>UNFinished Business</span>
      <small>Team H Employment Application</small>
    </header>

    <main class="form-container">

      <div class="step-text">Step 1 of 5 — Personal Information</div>

      <div class="progress-bar">
        <div class="active"></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>

      <h2>Personal Information</h2>
      <p class="subtitle">Tell us how we can contact you.</p>
      <p class="required-text">* Required fields</p>

      <form @submit.prevent="nextPage">

        <div class="form-grid">

          <div class="form-group">
            <label>First Name *</label>
            <input v-model="application.personalInfo.firstName" type="text" required>
          </div>

          <div class="form-group">
            <label>Last Name *</label>
            <input v-model="application.personalInfo.lastName" type="text" required>
          </div>

          <div class="form-group full-width">
            <label>Street Address *</label>
            <input v-model="application.personalInfo.streetAddress" type="text" required>
          </div>

          <div class="form-group">
            <label>Apartment/Unit <span>(optional)</span></label>
            <input v-model="application.personalInfo.apartment" type="text">
          </div>

          <div class="form-group">
            <label>City *</label>
            <input v-model="application.personalInfo.city" type="text" required>
          </div>
   
          <div class="form-group">
            <label for="state">State *</label>

            <select id="state" v-model="application.personalInfo.state" required>
              <option value="" disabled>Select State</option>
              <option value="AL">Alabama</option>
              <option value="AK">Alaska</option>
              <option value="AZ">Arizona</option>
              <option value="AR">Arkansas</option>
              <option value="CA">California</option>
              <option value="CO">Colorado</option>
              <option value="CT">Connecticut</option>
              <option value="DE">Delaware</option>
              <option value="DC">District of Columbia</option>
              <option value="FL">Florida</option>
              <option value="GA">Georgia</option>
              <option value="HI">Hawaii</option>
              <option value="ID">Idaho</option>
              <option value="IL">Illinois</option>
              <option value="IN">Indiana</option>
              <option value="IA">Iowa</option>
              <option value="KS">Kansas</option>
              <option value="KY">Kentucky</option>
              <option value="LA">Louisiana</option>
              <option value="ME">Maine</option>
              <option value="MD">Maryland</option>
              <option value="MA">Massachusetts</option>
              <option value="MI">Michigan</option>
              <option value="MN">Minnesota</option>
              <option value="MS">Mississippi</option>
              <option value="MO">Missouri</option>
              <option value="MT">Montana</option>
              <option value="NE">Nebraska</option>
              <option value="NV">Nevada</option>
              <option value="NH">New Hampshire</option>
              <option value="NJ">New Jersey</option>
              <option value="NM">New Mexico</option>
              <option value="NY">New York</option>
              <option value="NC">North Carolina</option>
              <option value="ND">North Dakota</option>
              <option value="OH">Ohio</option>
              <option value="OK">Oklahoma</option>
              <option value="OR">Oregon</option>
              <option value="PA">Pennsylvania</option>
              <option value="RI">Rhode Island</option>
              <option value="SC">South Carolina</option>
              <option value="SD">South Dakota</option>
              <option value="TN">Tennessee</option>
              <option value="TX">Texas</option>
              <option value="UT">Utah</option>
              <option value="VT">Vermont</option>
              <option value="VA">Virginia</option>
              <option value="WA">Washington</option>
              <option value="WV">West Virginia</option>
              <option value="WI">Wisconsin</option>
              <option value="WY">Wyoming</option>
            </select>
          </div>

          <div class="form-group">
            <label>ZIP Code *</label>
            <input v-model="application.personalInfo.zipCode" type="text" required>
          </div>

          <div class="form-group">
            <label>Phone Number *</label>
            <input v-model="application.personalInfo.phone" type="tel" required>
          </div>

          <div class="form-group">
            <label>Email Address *</label>
            <input v-model="application.personalInfo.email" type="email" required>
          </div>

        </div>

        
        <div class="form-footer">
          <button
            type="button"
            class="demo-button"
            @click="demoAutofill"
          >
            Demo Autofill
          </button>

          <button type="submit" class="next-button">
            Next: Position &amp; Availability →
          </button>
        </div>


      </form>
    </main>

    <footer>
      UNFinished Business is an equal opportunity employer.
    </footer>

  </div>
</template>

<style scoped>
* {
  box-sizing: border-box;
}

.page {
  min-height: 100vh;
  background: #f3f4f6;
  color: #344054;
  font-family: Arial, sans-serif;
}

.top-header {
  height: 65px;
  background: white;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 6%;
  border-bottom: 1px solid #e5e7eb;
  color: #1c3b63;
  font-size: 14px;
}

.top-header small {
  font-size: 11px;
}

.form-container {
  background: white;
  width: 448px;
  max-width: calc(100% - 30px);
  margin: 26px auto 0;
  padding: 24px 25px;
  border: 1px solid #e2e6ec;
  border-radius: 8px;
}

.step-text {
  font-size: 10px;
  font-weight: bold;
  color: #1c3b63;
  margin-bottom: 8px;
}

.progress-bar {
  display: flex;
  gap: 4px;
  margin-bottom: 17px;
}

.progress-bar div {
  height: 3px;
  background: #e5eaf0;
  flex: 1;
}

.progress-bar .active {
  background: #1c3b63;
}

h2 {
  font-size: 18px;
  font-weight: normal;
  margin: 0 0 4px;
}

.subtitle {
  font-size: 11px;
  color: #667085;
  margin: 0 0 5px;
}

.required-text {
  font-size: 9px;
  color: #667085;
  margin: 0 0 17px;
}

.form-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px;
}

.form-group {
  display: flex;
  flex-direction: column;
  min-width: 0;
}

.full-width {
  grid-column: span 2;
}

.form-group label {
  font-size: 9px;
  font-weight: bold;
  margin-bottom: 4px;
}

.form-group label span {
  font-weight: normal;
  color: #667085;
}

.form-group input,
.form-group select {
  width: 100%;
  height: 27px;
  border: 1px solid #cbd5e1;
  border-radius: 4px;
  padding: 4px 8px;
  font-size: 10px;
  color: #344054;
  background: white;
}

.form-group input:focus,
.form-group select:focus {
  outline: none;
  border-color: #3678d4;
  box-shadow: 0 0 3px rgba(54, 120, 212, 0.4);
}

.form-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 24px;
  margin-top: 30px;
}

.demo-button {
  margin-right: auto;
}

@media (max-width: 600px) {
  .form-footer {
    flex-direction: column;
    gap: 16px;
  }

  .form-footer button {
    width: 100%;
    min-height: 44px;
  }
}

.next-button {
  background: #1c3b63;
  color: white;
  border: none;
  border-radius: 4px;
  padding: 9px 13px;
  font-size: 9px;
  font-weight: bold;
  cursor: pointer;
}

.next-button:hover {
  background: #294f7c;
}

.demo-button {
  padding: 11px 16px;
  background: #eaf0f7;
  color: #24476d;
  border: 1px solid #cbd5e1;
  border-radius: 5px;
  font-size: 12px;
  font-weight: 600;
  cursor: pointer;
}

.demo-button:hover {
  background: #dbe7f3;
}

footer {
  text-align: center;
  font-size: 9px;
  color: #667085;
  margin: 16px 0;
}

@media (max-width: 500px) {
  .top-header {
    padding: 0 15px;
  }

  .form-container {
    margin: 15px auto;
    padding: 20px;
  }

  .form-grid {
    grid-template-columns: 1fr;
  }

  .full-width {
    grid-column: span 1;
  }
}
</style>
