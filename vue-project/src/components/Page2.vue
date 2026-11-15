
<script setup>
import { reactive, onMounted } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const form = reactive({
  position: '',
  startDate: '',
  employmentTypes: [],
  workdays: [],
  availabilityDetails: ''
})

const positions = [
  'Customer Service Associate',
  'Cashier',
  'Sales Associate',
  'Administrative Assistant',
  'Other'
]

const employmentTypes = [
  'Full-time',
  'Part-time',
  'Temporary'
]

const days = [
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
  'Sunday'
]

// Restore previously entered information
onMounted(() => {
  const saved = sessionStorage.getItem('page2')

  if (saved) {
    try {
      Object.assign(form, JSON.parse(saved))
    } catch (error) {
      console.error('Unable to restore Page 2:', error)
    }
  }
})

function saveForm() {
  sessionStorage.setItem('page2', JSON.stringify(form))
}

function nextPage() {
  saveForm()
  router.push('/page3')
}

function previousPage() {
  saveForm()
  router.push('/page1')
}
</script>

<template>
  <div class="application-page">

    <!-- HEADER -->
    <header class="site-header">
      <div class="header-content">
        <span class="brand">UNFinished Business</span>
        <span class="header-title">Employment Application</span>
      </div>
    </header>

    <!-- APPLICATION CARD -->
    <main class="application-container">
      <div class="application-card">

        <!-- PROGRESS -->
        <div class="progress-section">
          <p class="step-label">
            Step 2 of 5 — Position & Availability
          </p>

          <div class="progress-track">
            <div
              v-for="step in 5"
              :key="step"
              class="progress-segment"
              :class="{ active: step <= 2 }"
            ></div>
          </div>
        </div>


        <!-- TITLE -->
        <h1>Position & Availability</h1>
        <p class="description">
          Tell us what position you're interested in
          and when you can work.
        </p>

        <form @submit.prevent="nextPage">

          <!-- REQUIRED FIELDS -->
          <p class="required-note">* Required fields</p>

          <div class="form-row">
            <div class="form-group">
              <label for="position">
                Position Applying For <span>*</span>
              </label>

              <select
                id="position"
                v-model="form.position"
                required
              >
                <option value="" disabled>
                  Select a position
                </option>
                <option
                  v-for="position in positions"
                  :key="position"
                  :value="position"
                >
                  {{ position }}
                </option>
              </select>
            </div>

            <div class="form-group">
              <label for="startDate">
                Availability Start Date <span>*</span>
              </label>

              <input
                id="startDate"
                v-model="form.startDate"
                type="date"
                required
              />

              <p class="field-hint">
                MM/DD/YYYY - Type or use the calendar.
              </p>
            </div>
          </div>

          <!-- EMPLOYMENT TYPE -->
          <fieldset class="form-section">
            <legend>
              Desired Employment Type
            </legend>

            <p class="field-hint">Select all that apply.</p>

            <div class="checkbox-group">
              <label
                v-for="type in employmentTypes"
                :key="type"
                class="checkbox-label"
              >
                <input
                  v-model="form.employmentTypes"
                  type="checkbox"
                  :value="type"
                />
                {{ type }}
              </label>
            </div>
          </fieldset>

          <!-- WORKDAYS -->
          <fieldset class="form-section">
            <legend>Available Workdays</legend>

            <p class="field-hint">
              Select all days you are available.
            </p>

            <div class="checkbox-group workdays">
              <label
                v-for="day in days"
                :key="day"
                class="checkbox-label"
              >
                <input
                  v-model="form.workdays"
                  type="checkbox"
                  :value="day"
                />
                {{ day }}
              </label>
            </div>
          </fieldset>

          <!-- AVAILABILITY DETAILS -->
          <div class="form-section">
            <label for="availabilityDetails">
              Availability Details (optional)
            </label>

            <p class="field-hint">
              Tell us about any preferred hours or
              scheduling restrictions.
            </p>

            <textarea
              id="availabilityDetails"
              v-model="form.availabilityDetails"
              rows="4"
              placeholder="I prefer daytime hours and can begin at 8:00 AM. I'm unavailable after 5:00 PM on Wednesdays."
            ></textarea>
          </div>

          <!-- NAVIGATION -->
          <div class="form-navigation">
            <button
              type="button"
              class="back-button"
              @click="previousPage"
            >
              Back
            </button>

            <button type="submit" class="next-button">
              Next: Education & Experience
              <span aria-hidden="true">➜</span>
            </button>
          </div>

        </form>
      </div>
    </main>

    <!-- FOOTER -->
    <footer class="site-footer">
      UNFinished Business is an equal-opportunity employer.
    </footer>

  </div>
</template>

<style scoped>
.application-page {
  min-height: 100vh;
  background-color: #f3f5f7;
  color: #243449;
  font-family: Arial, Helvetica, sans-serif;
}

/* HEADER */
.site-header {
  background: white;
  border-bottom: 1px solid #e5e9ef;
  padding: 22px 0;
}

.header-content {
  max-width: 1200px;
  margin: auto;
  padding: 0 30px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.brand {
  color: #24476d;
  font-size: 18px;
  font-weight: 500;
}

.header-title {
  font-size: 12px;
  font-weight: 600;
}

/* CARD */
.application-container {
  display: flex;
  justify-content: center;
  padding: 48px 20px 24px;
}

.application-card {
  background: white;
  width: 100%;
  max-width: 750px;
  padding: 40px;
  border-radius: 8px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.025);
}

/* PROGRESS */
.progress-section {
  margin-bottom: 30px;
}

.step-label {
  font-size: 12px;
  color: #24476d;
  font-weight: bold;
  margin-bottom: 8px;
}

.progress-track {
  display: flex;
  gap: 8px;
}

.progress-segment {
  flex: 1;
  height: 4px;
  background: #e9edf2;
  border-radius: 3px;
}

.progress-segment.active {
  background: #24476d;
}

/* TITLES */
h1 {
  font-size: 27px;
  font-weight: 500;
  margin: 0 0 8px;
}

.description {
  font-size: 14px;
  color: #7d8795;
  margin-bottom: 12px;
}

.required-note {
  font-size: 11px;
  color: #8c95a3;
  margin-bottom: 18px;
}

/* FORM */
.form-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 18px;
}

.form-group {
  margin-bottom: 22px;
  min-width: 0;
}

label,
legend {
  display: block;
  font-size: 12px;
  font-weight: 600;
  margin-bottom: 7px;
}

label span {
  color: #bd4a4a;
}

select,
input[type="date"],
textarea {
  width: 100%;
  border: 1px solid #d4dce6;
  border-radius: 5px;
  padding: 11px 12px;
  font-size: 13px;
  color: #344256;
  background: white;
  box-sizing: border-box;
}

select:focus,
input:focus,
textarea:focus {
  outline: none;
  border-color: #507ba9;
  box-shadow: 0 0 0 2px rgba(80, 123, 169, 0.15);
}

.field-hint {
  color: #8b96a5;
  font-size: 11px;
  margin: 5px 0 10px;
}

.form-section {
  margin: 18px 0 24px;
  padding: 0;
  border: 0;
  min-width: 0;
}

legend {
  padding: 0;
}

.checkbox-group {
  display: flex;
  flex-wrap: wrap;
  gap: 14px;
}

.checkbox-label {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  font-size: 12px;
  font-weight: normal;
  margin: 0;
  cursor: pointer;
}

.checkbox-label input {
  accent-color: #24476d;
  margin: 0;
}

.workdays {
  gap: 12px;
}

textarea {
  resize: vertical;
  min-height: 90px;
}

/* NAVIGATION */
.form-navigation {
  border-top: 1px solid #e9edf2;
  padding-top: 24px;
  margin-top: 28px;
  display: flex;
  justify-content: space-between;
  gap: 12px;
}

.back-button,
.next-button {
  padding: 12px 18px;
  border-radius: 5px;
  font-size: 12px;
  font-weight: 600;
  cursor: pointer;
}

.back-button {
  background: white;
  color: #24476d;
  border: 1px solid #d4dce6;
}

.next-button {
  background: #19385f;
  color: white;
  border: none;
}

.next-button:hover {
  background: #2d527e;
}

/* FOOTER */
.site-footer {
  text-align: center;
  color: #8b96a5;
  font-size: 11px;
  padding: 12px 20px 28px;
}

/* MOBILE */
@media (max-width: 600px) {
  .application-card {
    padding: 24px 18px;
  }

  .application-container {
    padding: 20px 12px;
  }

  .form-row {
    grid-template-columns: 1fr;
    gap: 0;
  }

  .header-content {
    padding: 0 16px;
  }

  .checkbox-group {
    gap: 12px;
  }

  .next-button {
    max-width: 70%;
  }
}
</style>
