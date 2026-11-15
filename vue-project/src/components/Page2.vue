<script setup>
import { reactive, onMounted } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const form = reactive({
  position: '',
  desiredSalary: '',
  salaryPeriod: 'Hourly',
  startDate: '',
  employmentTypes: [],
  workdays: [],
  weeklyHours: '',
  workNights: '',
  availabilityDetails: ''
})

const positions = [
  'Customer Service Associate',
  'Cashier',
  'Sales Associate',
  'Administrative Assistant',
  'Other'
]

const employmentTypes = ['Full-time', 'Part-time']

const days = [
  'Monday', 'Tuesday', 'Wednesday',
  'Thursday', 'Friday', 'Saturday', 'Sunday'
]

onMounted(() => {
  const saved = sessionStorage.getItem('page2')

  if (saved) {
    try {
      Object.assign(form, JSON.parse(saved))
    } catch (error) {
      console.error('Could not restore Page 2:', error)
    }
  }
})

function saveForm() {
  sessionStorage.setItem('page2', JSON.stringify(form))
}

function previousPage() {
  saveForm()
  router.push('/page1')
}

function nextPage() {
  saveForm()
  router.push('/page3')
}
</script>

<template>
  <div class="application-page">
    <header class="site-header">
      <div class="header-content">
        <span class="brand">UNFinished Business</span>
        <span class="header-title">Employment Application</span>
      </div>
    </header>

    <main class="application-container">
      <div class="application-card">

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

        <h1>Position & Availability</h1>

        <p class="description">
          Tell us what position you're interested in
          and when you are available to work.
        </p>

        <form @submit.prevent="nextPage">
          <p class="required-note">* Required fields</p>

          <div class="form-row">
            <div class="form-group">
              <label for="position">
                Position Applied For <span>*</span>
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
                Date Available to Start <span>*</span>
              </label>

              <input
                id="startDate"
                v-model="form.startDate"
                type="date"
                required
              />
            </div>
          </div>

          <div class="form-row">
            <div class="form-group">
              <label for="salary">
                Desired Salary
              </label>

              <input
                id="salary"
                v-model="form.desiredSalary"
                type="number"
                min="0"
                step="0.01"
                placeholder="Enter amount"
              />
            </div>

            <div class="form-group">
              <label for="salaryPeriod">
                Salary Type
              </label>

              <select
                id="salaryPeriod"
                v-model="form.salaryPeriod"
              >
                <option>Hourly</option>
                <option>Weekly</option>
                <option>Annually</option>
              </select>
            </div>
          </div>

          <fieldset class="form-section">
            <legend>Employment Desired <span>*</span></legend>

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

          <fieldset class="form-section">
            <legend>
              Days Available to Work <span>*</span>
            </legend>

            <div class="checkbox-group">
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

          <div class="form-row">
            <div class="form-group">
              <label for="weeklyHours">
                Hours Available Per Week <span>*</span>
              </label>

              <input
                id="weeklyHours"
                v-model="form.weeklyHours"
                type="number"
                min="1"
                max="168"
                required
                placeholder="e.g. 40"
              />
            </div>

            <fieldset class="form-section night-section">
              <legend>
                Can You Work Nights? <span>*</span>
              </legend>

              <div class="radio-group">
                <label>
                  <input
                    v-model="form.workNights"
                    type="radio"
                    value="Yes"
                    required
                  />
                  Yes
                </label>

                <label>
                  <input
                    v-model="form.workNights"
                    type="radio"
                    value="No"
                  />
                  No
                </label>
              </div>
            </fieldset>
          </div>

          <div class="form-group">
            <label for="details">
              Availability Details (optional)
            </label>

            <textarea
              id="details"
              v-model="form.availabilityDetails"
              rows="4"
              placeholder="List any scheduling restrictions or additional availability information."
            ></textarea>
          </div>

          <p
            v-if="
              form.employmentTypes.length === 0 ||
              form.workdays.length === 0
            "
            class="validation-note"
          >
            Select at least one employment type and workday.
          </p>

          <div class="form-navigation">
            <button
              type="button"
              class="back-button"
              @click="previousPage"
            >
              Back
            </button>

            <button
              type="submit"
              class="next-button"
              :disabled="
                form.employmentTypes.length === 0 ||
                form.workdays.length === 0
              "
            >
              Next: Education & Experience →
            </button>
          </div>
        </form>
      </div>
    </main>

    <footer class="site-footer">
      UNFinished Business is an equal-opportunity employer.
    </footer>
  </div>
</template>

<style scoped>
@import '../assets/application-form.css';
</style>
