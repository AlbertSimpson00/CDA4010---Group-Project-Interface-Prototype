
<script setup>
import { reactive } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const form = reactive({
  position: '',
  otherPosition: '',
  employmentType: '',
  startDate: '',
  availableDays: [],
  preferredShifts: [],
  additionalNotes: ''
})

const positions = [
  'Administrative Assistant',
  'Receptionist',
  'Security Guard',
  'Maintenance',
  'Other'
]

const days = [
  'Monday', 'Tuesday', 'Wednesday',
  'Thursday', 'Friday', 'Saturday', 'Sunday'
]

const shifts = [
  'Morning',
  'Afternoon',
  'Evening',
  'Overnight'
]

function nextPage() {
  // Save form data before navigating
  sessionStorage.setItem('page2', JSON.stringify(form))

  // Change this when Page3.vue is ready
  // router.push('/page3')

  console.log('Page 2 completed:', form)
}

function previousPage() {
  router.push('/')
}
</script>

<template>
  <main class="container py-5">
    <div class="card shadow-sm mx-auto application-card">
      <div class="card-body p-4 p-md-5">

        <h2>Position & Availability</h2>
        <p class="text-muted">
          Please provide your preferred position and availability.
        </p>

        <hr />

        <form @submit.prevent="nextPage">

          <!-- POSITION INFORMATION -->
          <h5 class="mt-4">Position Information</h5>

          <div class="mb-3">
            <label for="position" class="form-label">
              Position Applied For *
            </label>
            <select
              id="position"
              v-model="form.position"
              class="form-select"
              required
            >
              <option value="" disabled>Select a position</option>
              <option
                v-for="position in positions"
                :key="position"
                :value="position"
              >
                {{ position }}
              </option>
            </select>
          </div>

          <div v-if="form.position === 'Other'" class="mb-3">
            <label for="otherPosition" class="form-label">
              Please Specify *
            </label>
            <input
              id="otherPosition"
              v-model="form.otherPosition"
              type="text"
              class="form-control"
              required
            />
          </div>

          <div class="mb-3">
            <label for="employmentType" class="form-label">
              Employment Type *
            </label>
            <select
              id="employmentType"
              v-model="form.employmentType"
              class="form-select"
              required
            >
              <option value="" disabled>Select employment type</option>
              <option>Full-time</option>
              <option>Part-time</option>
              <option>Either</option>
            </select>
          </div>

          <div class="mb-4">
            <label for="startDate" class="form-label">
              Earliest Available Start Date
            </label>
            <input
              id="startDate"
              v-model="form.startDate"
              type="date"
              class="form-control"
            />
          </div>

          <!-- AVAILABILITY -->
          <h5>Work Availability</h5>
          <hr />

          <fieldset class="mb-4">
            <legend class="fs-6">
              Days Available to Work
            </legend>
            <p class="text-muted small">
              Select all that apply.
            </p>

            <div class="row">
              <div
                v-for="day in days"
                :key="day"
                class="col-6 col-md-4 mb-2"
              >
                <div class="form-check">
                  <input
                    :id="'day-' + day"
                    v-model="form.availableDays"
                    :value="day"
                    type="checkbox"
                    class="form-check-input"
                  />
                  <label
                    :for="'day-' + day"
                    class="form-check-label"
                  >
                    {{ day }}
                  </label>
                </div>
              </div>
            </div>
          </fieldset>

          <fieldset class="mb-4">
            <legend class="fs-6">
              Preferred Work Shifts
            </legend>

            <div class="row">
              <div
                v-for="shift in shifts"
                :key="shift"
                class="col-6 col-md-4 mb-2"
              >
                <div class="form-check">
                  <input
                    :id="'shift-' + shift"
                    v-model="form.preferredShifts"
                    :value="shift"
                    type="checkbox"
                    class="form-check-input"
                  />
                  <label
                    :for="'shift-' + shift"
                    class="form-check-label"
                  >
                    {{ shift }}
                  </label>
                </div>
              </div>
            </div>
          </fieldset>

          <div class="mb-4">
            <label for="notes" class="form-label">
              Additional Availability Information
            </label>
            <textarea
              id="notes"
              v-model="form.additionalNotes"
              class="form-control"
              rows="4"
              placeholder="List any scheduling restrictions..."
            ></textarea>
          </div>

          <!-- NAVIGATION -->
          <div class="d-flex justify-content-between mt-4">
            <button
              type="button"
              class="btn btn-outline-secondary"
              @click="previousPage"
            >
              Back
            </button>

            <button type="submit" class="btn btn-primary">
              Continue
            </button>
          </div>

        </form>
      </div>
    </div>
  </main>
</template>

<style scoped>
.application-card {
  max-width: 850px;
  border-radius: 12px;
}

.form-label {
  font-weight: 500;
}

.btn {
  min-width: 110px;
}
</style>
