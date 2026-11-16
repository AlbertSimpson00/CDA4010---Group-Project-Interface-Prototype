<script setup>
import { application } from '../stores/application.js'
import { useRouter } from 'vue-router'
import { reactive, onMounted, nextTick } from 'vue'

const router = useRouter()

function demoAutofill() {
  Object.assign(form, {
    position: 'Customer Service Associate',
    desiredSalary: '30',
    salaryPeriod: 'Hourly',
    startDate: '2026-12-01',
    employmentTypes: ['Full-time'],
    workdays: [
      'Monday', 'Tuesday', 'Wednesday',
      'Thursday', 'Friday'
    ],
    weeklyHours: '40',
    workNights: 'Yes',
    availabilityDetails: 'Available for emergency assignments and overnight shifts.'
  })
  Object.keys(touched).forEach(name => {
    if (touched[name]) {
      errors[name] = getError(name)
    }
  })
}

function clearForm() {
  Object.assign(form, {
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

  // Remove saved Page 2 data
  sessionStorage.removeItem('page2Form')

  // Clear validation errors
  Object.keys(errors).forEach(key => {
    delete errors[key]
  })

  Object.keys(touched).forEach(key => {
    delete touched[key]
  })
}

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

const errors = reactive({})
const touched = reactive({})
const fieldRefs = {}

const requiredFields = [
  'position',
  'startDate',
  'employmentTypes',
  'workdays',
  'weeklyHours',
  'workNights'
]

const labels = {
  position: 'Position Applied For',
  startDate: 'Date Available to Start',
  employmentTypes: 'Employment Desired',
  workdays: 'Days Available to Work',
  weeklyHours: 'Hours Available Per Week',
  workNights: 'Can You Work Nights?'
}

function setFieldRef(name, element) {
  if (element) fieldRefs[name] = element
}

function getError(name) {
  const value = form[name]

  if (name === 'employmentTypes' || name === 'workdays') {
    if (!value.length) {
      return `Select at least one option for ${labels[name]}.`
    }
    return ''
  }

  if (requiredFields.includes(name) && !String(value ?? '').trim()) {
    return `${labels[name]} is required.`
  }

  if (name === 'desiredSalary' && value !== '') {
    if (!Number.isFinite(Number(value)) || Number(value) <= 0) {
      return 'Enter a salary greater than zero.'
    }
  }

  if (name === 'weeklyHours' && value !== '') {
    const hours = Number(value)

    if (!Number.isInteger(hours) || hours < 1 || hours > 168) {
      return 'Enter a whole number between 1 and 168.'
    }
  }

  if (name === 'startDate' && value) {
    const today = new Date()
    const localToday =
      `${today.getFullYear()}-` +
      `${String(today.getMonth() + 1).padStart(2, '0')}-` +
      `${String(today.getDate()).padStart(2, '0')}`

    if (value < localToday) {
      return 'Select today or a future start date.'
    }
  }

  return ''
}

function validateField(name) {
  touched[name] = true
  errors[name] = getError(name)
}

function updateField(name) {
  if (touched[name]) {
    errors[name] = getError(name)
  }
}

async function validatePage() {
  const fields = [...requiredFields, 'desiredSalary']

  fields.forEach(validateField)

  const firstInvalid = fields.find(name => errors[name])

  if (firstInvalid) {
    await nextTick()
    fieldRefs[firstInvalid]?.focus()
    return false
  }

  return true
}

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
  Object.assign(application.employment, form)
  sessionStorage.setItem('page2', JSON.stringify(form))
}

function previousPage() {
  saveForm()
  router.push('/page1')
}

async function nextPage() {
  if (!(await validatePage())) return

  saveForm()
  router.push('/page3')
}
</script>

<template>
  <div class="application-page">
    <header class="site-header">
      <div class="header-content">
        <span class="brand">UNFinished Business</span>
        <span class="header-title"> Team H Employment Application</span>
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

        <form @submit.prevent="nextPage" novalidate>
          <p class="required-note">* Required fields</p>

          <div class="form-row">
            <div class="form-group">
              <label for="position">
                Position Applied For <span>*</span>
              </label>

              <select
                id="position"
                :ref="el => setFieldRef('position', el)"
                v-model="form.position"
                required
                :aria-invalid="!!errors.position"
                :aria-describedby="errors.position ? 'position-error' : undefined"
                @blur="validateField('position')"
                @change="updateField('position')"
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

              <p v-if="errors.position" id="position-error" class="field-error">
                {{ errors.position }}
              </p>
            </div>

            <div class="form-group">
              <label for="startDate">
                Date Available to Start <span>*</span>
              </label>
 
              <input
                id="startDate"
                :ref="el => setFieldRef('startDate', el)"
                v-model="form.startDate"
                type="date"
                required
                :aria-invalid="!!errors.startDate"
                :aria-describedby="errors.startDate ? 'startDate-error' : undefined"
                @blur="validateField('startDate')"
                @change="updateField('startDate')"
              />

              <p v-if="errors.startDate" id="startDate-error" class="field-error">
                {{ errors.startDate }}
              </p>
            </div>
          </div>

          <div class="form-row">
            <div class="form-group">
              <label for="salary">
                Desired Salary
              </label>
              
              <input
                id="salary"
                :ref="el => setFieldRef('desiredSalary', el)"
                v-model="form.desiredSalary"
                type="number"
                min="0.01"
                step="0.01"
                placeholder="Enter amount"
                :aria-invalid="!!errors.desiredSalary"
                :aria-describedby="errors.desiredSalary ? 'salary-error' : undefined"
                @blur="validateField('desiredSalary')"
                @input="updateField('desiredSalary')"
              />

              <p v-if="errors.desiredSalary" id="salary-error" class="field-error">
                {{ errors.desiredSalary }}
              </p>

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

              <div
                class="checkbox-group"
                :aria-invalid="!!errors.employmentTypes"
                :aria-describedby="errors.employmentTypes ? 'employmentTypes-error' : undefined"
              >
                <label
                  v-for="(type, index) in employmentTypes"
                  :key="type"
                  class="checkbox-label"
                >
                  <input
                    :ref="el => {
                      if (index === 0) setFieldRef('employmentTypes', el)
                    }"
                    v-model="form.employmentTypes"
                    type="checkbox"
                    :value="type"
                    :aria-invalid="!!errors.employmentTypes"
                    :aria-describedby="errors.employmentTypes ? 'employmentTypes-error' : undefined"
                    @change="validateField('employmentTypes')"
                  />
                  {{ type }}
                </label>

              <p
                v-if="errors.employmentTypes"
                id="employmentTypes-error"
                class="field-error"
              >
                {{ errors.employmentTypes }}
              </p>
            </div>
          </fieldset>

          <fieldset class="form-section">
            <legend>
              Days Available to Work <span>*</span>
            </legend>

            <div
              class="checkbox-group"
              :aria-invalid="!!errors.workdays"
              :aria-describedby="errors.workdays ? 'workdays-error' : undefined"
            >
              <label
                v-for="(day, index) in days"
                :key="day"
                class="checkbox-label"
              >
                <input
                  :ref="el => {
                    if (index === 0) setFieldRef('workdays', el)
                  }"
                  v-model="form.workdays"
                  type="checkbox"
                  :value="day"
                  @change="validateField('workdays')"
                />
                {{ day }}
              </label>

            <p v-if="errors.workdays" id="workdays-error" class="field-error">
              {{ errors.workdays }}
            </p>

            </div>
          </fieldset>

          <div class="form-row">
            <div class="form-group">
              <label for="weeklyHours">
                Hours Available Per Week <span>*</span>
              </label>

              <input
                id="weeklyHours"
                :ref="el => setFieldRef('weeklyHours', el)"
                v-model="form.weeklyHours"
                type="number"
                min="1"
                max="168"
                step="1"
                required
                placeholder="e.g. 40"
                :aria-invalid="!!errors.weeklyHours"
                :aria-describedby="errors.weeklyHours ? 'weeklyHours-error' : undefined"
                @blur="validateField('weeklyHours')"
                @input="updateField('weeklyHours')"
              />

              <p v-if="errors.weeklyHours" id="weeklyHours-error" class="field-error">
                {{ errors.weeklyHours }}
              </p>
            </div>

            <fieldset class="form-section night-section">
              <legend>
                Can You Work Nights? <span>*</span>
              </legend>

              
              <div
                class="radio-group"
                :aria-invalid="!!errors.workNights"
                :aria-describedby="errors.workNights ? 'workNights-error' : undefined"
              >
                <label>
                  <input
                    :ref="el => setFieldRef('workNights', el)"
                    v-model="form.workNights"
                    type="radio"
                    value="Yes"
                    required
                    @change="validateField('workNights')"
                  />
                  Yes
                </label>

                <label>
                  <input
                    v-model="form.workNights"
                    type="radio"
                    value="No"
                    @change="validateField('workNights')"
                  />
                  No
                </label>

              <p v-if="errors.workNights" id="workNights-error" class="field-error">
                {{ errors.workNights }}
              </p>

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

          <div class="form-navigation">
            <button
              type="button"
              class="back-button"
              @click="previousPage"
            >
              Back
            </button>

            <button
              type="button"
              class="demo-button"
              @click="demoAutofill"
            >
              Autofill
            </button>

            <button
              type="button"
              class="clear-button"
              @click="clearForm"
            >
              Clear Form
            </button>

            <button type="submit" class="next-button">
              Next: Education &amp; Experience →
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


.field-error {
  color: #b42318;
  font-size: 13px;
  font-weight: 500;
  line-height: 1.5;
  margin: 6px 0 0;
}

.form-group input[aria-invalid="true"],
.form-group select[aria-invalid="true"] {
  border: 2px solid #b42318;
  background: #fff8f7;
}

.checkbox-group[aria-invalid="true"],
.radio-group[aria-invalid="true"] {
  border-left: 3px solid #b42318;
  padding-left: 12px;
}

.form-group input:focus-visible,
.form-group select:focus-visible,
.checkbox-group input:focus-visible,
.radio-group input:focus-visible {
  outline: 3px solid #2563eb;
  outline-offset: 2px;
}

</style>
