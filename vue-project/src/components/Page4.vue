<script setup>
import { application } from '../stores/application.js'
import { useRouter } from 'vue-router'
import { reactive, onMounted, ref, nextTick } from 'vue'

const router = useRouter()
let nextReferenceId = 1


const errors = reactive({})
const touched = reactive({})
const fieldRefs = {}

function referenceKey(reference, field) {
  return `reference-${reference.id}-${field}`
}

function setFieldRef(key, element) {
  if (element) {
    fieldRefs[key] = element
  } else {
    delete fieldRefs[key]
  }
}

function getError(key) {
  if (key.startsWith('reference-')) {
    const reference = form.references.find(ref =>
      key.startsWith(`reference-${ref.id}-`)
    )

    if (!reference) return ''

    const field = key.slice(`reference-${reference.id}-`.length)
    const value = String(reference[field] ?? '').trim()

    const labels = {
      name: 'Full Name',
      title: 'Job Title',
      company: 'Company',
      phone: 'Phone Number'
    }

    if (labels[field] && !value) {
      return `${labels[field]} is required.`
    }

    if (field === 'phone' && value) {
      const digits = value.replace(/\D/g, '')

      if (digits.length !== 10) {
        return 'Enter a valid 10-digit phone number.'
      }
    }

    if (field === 'email' && value) {
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

      if (!emailPattern.test(value)) {
        return 'Enter a valid email address.'
      }
    }

    return ''
  }

  const labels = {
    workAuthorized: 'Work Authorization',
    over18: 'Age Confirmation',
    driversLicense: "Driver's License"
  }

  if (key === 'driversLicense' && !drivingRequired.value) {
    return ''
  }

  if (labels[key] && !String(form[key] ?? '').trim()) {
    return `${labels[key]} is required.`
  }

  return ''
}

function validateField(key) {
  touched[key] = true
  errors[key] = getError(key)
}

function updateField(key) {
  if (touched[key]) {
    errors[key] = getError(key)
  }
}

function resetValidation() {
  Object.keys(errors).forEach(key => delete errors[key])
  Object.keys(touched).forEach(key => delete touched[key])
  Object.keys(fieldRefs).forEach(key => delete fieldRefs[key])
}

async function validatePage() {
  const fields = []

  form.references.forEach(reference => {
    for (const field of [
      'name', 'title', 'company', 'phone', 'email'
    ]) {
      fields.push(referenceKey(reference, field))
    }
  })

  fields.push('workAuthorized', 'over18')

  if (drivingRequired.value) {
    fields.push('driversLicense')
  }

  fields.forEach(validateField)

  const firstInvalid = fields.find(key => errors[key])

  if (form.references.length === 0) {
    errors.references = 'Add at least one reference.'
  } else {
    delete errors.references
  }

  if (firstInvalid) {
    await nextTick()
    fieldRefs[firstInvalid]?.focus()
    return false
  }

  if (errors.references) {
    await nextTick()
    fieldRefs.addReference?.focus()
    return false
  }

  return true
}

function demoAutofill() {
  form.references = [
    {
      ...createReference(),
      name: 'Hal Jordan',
      title: 'Green Lantern',
      company: 'Green Lantern Corps',
      address: '123 Example Street, Jacksonville, FL',
      phone: '2025551045',
      email: 'hal.jordan@example.com'
    },
    {
      ...createReference(),
      name: 'Kilowag',
      title: 'Green Lantern Corps Instructor',
      company: 'Green Lantern Corps',
      address: '456 Sample Avenue, Jacksonville, FL',
      phone: '202-555-0188',
      email: 'kilowag@example.com'
    }
  ]

  form.workAuthorized = 'Yes'
  form.over18 = 'Yes'

  drivingRequired.value = true
  form.driversLicense = 'Yes'
  form.licenseState = 'Michigan'
  form.licenseExpiration = '2028-06-30'
  form.drivingDuties = 'Yes'

  form.additionalInformation =
    '	Experienced in protecting Earth and other inhabited planets from threats.'

    resetValidation()
}

function clearForm() {
  Object.assign(form, {
    references: [createReference()],
    workAuthorized: '',
    over18: '',
    driversLicense: '',
    licenseState: '',
    licenseExpiration: '',
    drivingDuties: '',
    additionalInformation: ''
  })

  drivingRequired.value = false

  sessionStorage.removeItem('page4')
  sessionStorage.removeItem('page4DrivingRequired')

  resetValidation()
}

function createReference() {
  return {
    id: nextReferenceId++,
    name: '',
    title: '',
    company: '',
    address: '',
    phone: '',
    email: ''
  }
}

const form = reactive({
  references: [createReference()],
  workAuthorized: '',
  over18: '',
  driversLicense: '',
  licenseState: '',
  licenseExpiration: '',
  drivingDuties: '',
  additionalInformation: ''
})

const drivingRequired = ref(false)

onMounted(() => {
  const saved = sessionStorage.getItem('page4')

  if (saved) {
    try {
      const data = JSON.parse(saved)
      Object.assign(form, data)

      // Give restored references unique IDs.
      form.references = form.references.map(reference => ({
        ...reference,
        id: nextReferenceId++
      }))
    } catch (error) {
      console.error('Could not restore Page 4:', error)
    }
  }

  const savedDriving = sessionStorage.getItem(
    'page4DrivingRequired'
  )

  if (savedDriving !== null) {
    drivingRequired.value = savedDriving === 'true'
  }
})

function addReference() {
  form.references.push(createReference())
  delete errors.references
}

function removeReference(index) {
  const reference = form.references[index]
  if (!reference) return

  const prefix = `reference-${reference.id}-`

  Object.keys(errors).forEach(key => {
    if (key.startsWith(prefix)) delete errors[key]
  })

  Object.keys(touched).forEach(key => {
    if (key.startsWith(prefix)) delete touched[key]
  })

  form.references.splice(index, 1)
}

function saveForm() {
    application.references = form.references.map(ref => ({ ...ref }))
    application.workAuthorized = form.workAuthorized
    application.over18 = form.over18
    application.drivingRequired = drivingRequired.value
    application.driversLicense = form.driversLicense
    application.licenseState = form.licenseState
    application.licenseExpiration = form.licenseExpiration
    application.drivingDuties = form.drivingDuties
    application.additionalInformation = form.additionalInformation  
  sessionStorage.setItem('page4', JSON.stringify(form))
  sessionStorage.setItem(
    'page4DrivingRequired',
    String(drivingRequired.value)
  )
}

function previousPage() {
  saveForm()
  router.push('/page3')
}

async function nextPage() {
  if (!(await validatePage())) return

  saveForm()
  router.push('/page5')
}
</script>

<template>
  <div class="application-page">
    <header class="site-header">
      <div class="header-content">
        <span class="brand">UNFinished Business</span>
        <span class="header-title">Team H Employment Application</span>
      </div>
    </header>

    <main class="application-container">
      <div class="application-card">

        <div class="progress-section">
          <p class="step-label">
            Step 4 of 5 — References & Other Requirements
          </p>

          <div class="progress-track">
            <div
              v-for="step in 5"
              :key="step"
              class="progress-segment"
              :class="{ active: step <= 4 }"
            ></div>
          </div>
        </div>

        <h1>References & Other Requirements</h1>

        <p class="description">
          Provide your references and answer a few
          employment-related questions.
        </p>

        <form @submit.prevent="nextPage" novalidate>
          <p class="required-note">* Required fields</p>

          <h2>References</h2>

          <p class="field-hint">
            Please provide your references other than
            relatives or previous employers.
            You may add additional references as needed.
            </p>

          <div
            v-for="(reference, index) in form.references"
            :key="reference.id"
            class="reference-section"
          >
            <div class="reference-header">
              <h3>Reference {{ index + 1 }}</h3>

              <button
                type="button"
                class="remove-button"
                @click="removeReference(index)"
              >
                Remove
              </button>
            </div>

            <div class="form-group">
              <label :for="'refName-' + reference.id">
                Full Name <span>*</span>
              </label>

              
                <input
                :id="'refName-' + reference.id"
                :ref="el => setFieldRef(referenceKey(reference, 'name'), el)"
                v-model="reference.name"
                type="text"
                required
                placeholder="Reference's full name"
                :aria-invalid="!!errors[referenceKey(reference, 'name')]"
                :aria-describedby="
                    errors[referenceKey(reference, 'name')]
                    ? 'refName-error-' + reference.id
                    : undefined
                "
                @blur="validateField(referenceKey(reference, 'name'))"
                @input="updateField(referenceKey(reference, 'name'))"
                />

                <p
                v-if="errors[referenceKey(reference, 'name')]"
                :id="'refName-error-' + reference.id"
                class="field-error"
                >
                {{ errors[referenceKey(reference, 'name')] }}
                </p>
            </div>

            <div class="form-row">
              <div class="form-group">
                <label :for="'refTitle-' + reference.id">
                  Job Title <span>*</span>
                </label>

                
                <input
                :id="'refTitle-' + reference.id"
                :ref="el => setFieldRef(referenceKey(reference, 'title'), el)"
                v-model="reference.title"
                type="text"
                required
                placeholder="Job title"
                :aria-invalid="!!errors[referenceKey(reference, 'title')]"
                :aria-describedby="
                    errors[referenceKey(reference, 'title')]
                    ? 'refTitle-error-' + reference.id
                    : undefined
                "
                @blur="validateField(referenceKey(reference, 'title'))"
                @input="updateField(referenceKey(reference, 'title'))"
                />

                <p
                v-if="errors[referenceKey(reference, 'title')]"
                :id="'refTitle-error-' + reference.id"
                class="field-error"
                >
                {{ errors[referenceKey(reference, 'title')] }}
                </p>
              </div>

              <div class="form-group">
                <label :for="'refCompany-' + reference.id">
                  Company <span>*</span>
                </label>

                
                <input
                :id="'refCompany-' + reference.id"
                :ref="el => setFieldRef(referenceKey(reference, 'company'), el)"
                v-model="reference.company"
                type="text"
                required
                placeholder="Company name"
                :aria-invalid="!!errors[referenceKey(reference, 'company')]"
                :aria-describedby="
                    errors[referenceKey(reference, 'company')]
                    ? 'refCompany-error-' + reference.id
                    : undefined
                "
                @blur="validateField(referenceKey(reference, 'company'))"
                @input="updateField(referenceKey(reference, 'company'))"
                />

                <p
                v-if="errors[referenceKey(reference, 'company')]"
                :id="'refCompany-error-' + reference.id"
                class="field-error"
                >
                {{ errors[referenceKey(reference, 'company')] }}
                </p>
              </div>
            </div>

            <div class="form-group">
              <label :for="'refAddress-' + reference.id">
                Address
              </label>

              <input
                :id="'refAddress-' + reference.id"
                v-model="reference.address"
                type="text"
                placeholder="Street, city, state, ZIP"
              />
            </div>

            <div class="form-row">
              <div class="form-group">
                <label :for="'refPhone-' + reference.id">
                  Phone Number <span>*</span>
                </label>

                
                <input
                :id="'refPhone-' + reference.id"
                :ref="el => setFieldRef(referenceKey(reference, 'phone'), el)"
                v-model="reference.phone"
                type="tel"
                required
                placeholder="(555) 123-4567"
                :aria-invalid="!!errors[referenceKey(reference, 'phone')]"
                :aria-describedby="
                    errors[referenceKey(reference, 'phone')]
                    ? 'refPhone-error-' + reference.id
                    : undefined
                "
                @blur="validateField(referenceKey(reference, 'phone'))"
                @input="updateField(referenceKey(reference, 'phone'))"
                />

                <p
                v-if="errors[referenceKey(reference, 'phone')]"
                :id="'refPhone-error-' + reference.id"
                class="field-error"
                >
                {{ errors[referenceKey(reference, 'phone')] }}
                </p>

              </div>

              <div class="form-group">
                <label :for="'refEmail-' + reference.id">
                  Email Address
                </label>

                
                <input
                :id="'refEmail-' + reference.id"
                :ref="el => setFieldRef(referenceKey(reference, 'email'), el)"
                v-model="reference.email"
                type="email"
                placeholder="reference@example.com"
                :aria-invalid="!!errors[referenceKey(reference, 'email')]"
                :aria-describedby="
                    errors[referenceKey(reference, 'email')]
                    ? 'refEmail-error-' + reference.id
                    : undefined
                "
                @blur="validateField(referenceKey(reference, 'email'))"
                @input="updateField(referenceKey(reference, 'email'))"
                />

                <p
                v-if="errors[referenceKey(reference, 'email')]"
                :id="'refEmail-error-' + reference.id"
                class="field-error"
                >
                {{ errors[referenceKey(reference, 'email')] }}
                </p>

              </div>
            </div>
          </div>

          <button
            :ref="el => setFieldRef('addReference', el)"
            type="button"
            class="add-button"
            @click="addReference"
            >
            + Add Reference
            </button>

            <p
            v-if="errors.references"
            id="references-error"
            class="field-error"
            role="alert"
            >
            {{ errors.references }}
            </p>


          <hr />

          <h2>Employment Requirements</h2>

          
            <fieldset class="question">
            <legend>
                Are you legally authorized to work in
                the United States? <span>*</span>
            </legend>

            <div class="radio-group">
                <label>
                <input
                    :ref="el => setFieldRef('workAuthorized', el)"
                    v-model="form.workAuthorized"
                    type="radio"
                    value="Yes"
                    :aria-invalid="!!errors.workAuthorized"
                    :aria-describedby="errors.workAuthorized ? 'workAuthorized-error' : undefined"
                    @change="validateField('workAuthorized')"
                />
                Yes
                </label>

                <label>
                <input
                    v-model="form.workAuthorized"
                    type="radio"
                    value="No"
                    :aria-invalid="!!errors.workAuthorized"
                    :aria-describedby="errors.workAuthorized ? 'workAuthorized-error' : undefined"
                    @change="validateField('workAuthorized')"
                />
                No
                </label>
            </div>

            <p
                v-if="errors.workAuthorized"
                id="workAuthorized-error"
                class="field-error"
            >
                {{ errors.workAuthorized }}
            </p>
            </fieldset>


          
            <fieldset class="question">
            <legend>
                Are you at least 18 years old? <span>*</span>
            </legend>

            <div class="radio-group">
                <label>
                <input
                    :ref="el => setFieldRef('over18', el)"
                    v-model="form.over18"
                    type="radio"
                    value="Yes"
                    :aria-invalid="!!errors.over18"
                    :aria-describedby="errors.over18 ? 'over18-error' : undefined"
                    @change="validateField('over18')"
                />
                Yes
                </label>

                <label>
                <input
                    v-model="form.over18"
                    type="radio"
                    value="No"
                    :aria-invalid="!!errors.over18"
                    :aria-describedby="errors.over18 ? 'over18-error' : undefined"
                    @change="validateField('over18')"
                />
                No
                </label>
            </div>

            <p
                v-if="errors.over18"
                id="over18-error"
                class="field-error"
            >
                {{ errors.over18 }}
            </p>
            </fieldset>


          <hr />

          <h2>Driving Requirements</h2>

          <p class="field-hint">
            Complete this section only if the position
            involves driving as part of your duties.
          </p>

          <label class="checkbox-label driving-toggle">
            <input
                v-model="drivingRequired"
                type="checkbox"
                @change="
                    delete errors.driversLicense;
                    delete touched.driversLicense
                "
            />
            This position requires driving
          </label>

          <template v-if="drivingRequired">

            
            <fieldset class="question">
            <legend>
                Do you have a valid driver's license?
                <span>*</span>
            </legend>

            <div class="radio-group">
                <label>
                <input
                    :ref="el => setFieldRef('driversLicense', el)"
                    v-model="form.driversLicense"
                    type="radio"
                    value="Yes"
                    :aria-invalid="!!errors.driversLicense"
                    :aria-describedby="errors.driversLicense ? 'driversLicense-error' : undefined"
                    @change="validateField('driversLicense')"
                />
                Yes
                </label>

                <label>
                <input
                    v-model="form.driversLicense"
                    type="radio"
                    value="No"
                    :aria-invalid="!!errors.driversLicense"
                    :aria-describedby="errors.driversLicense ? 'driversLicense-error' : undefined"
                    @change="validateField('driversLicense')"
                />
                No
                </label>
            </div>

            <p
                v-if="errors.driversLicense"
                id="driversLicense-error"
                class="field-error"
            >
                {{ errors.driversLicense }}
            </p>
            </fieldset>


            <div
              v-if="form.driversLicense === 'Yes'"
              class="form-row"
            >
              <div class="form-group">
                <label for="licenseState">
                  License State
                </label>

                <input
                  id="licenseState"
                  v-model="form.licenseState"
                  type="text"
                  placeholder="e.g. Florida"
                />
              </div>

              <div class="form-group">
                <label for="licenseExpiration">
                  License Expiration
                </label>

                <input
                  id="licenseExpiration"
                  v-model="form.licenseExpiration"
                  type="date"
                />
              </div>
            </div>

            <fieldset class="question">
              <legend>
                Are you willing to drive your personal
                vehicle as part of your duties?
              </legend>

              <div class="radio-group">
                <label>
                  <input
                    v-model="form.drivingDuties"
                    type="radio"
                    value="Yes"
                  />
                  Yes
                </label>

                <label>
                  <input
                    v-model="form.drivingDuties"
                    type="radio"
                    value="No"
                  />
                  No
                </label>
              </div>
            </fieldset>
          </template>

          <hr />

          <div class="form-group">
            <label for="additionalInformation">
              Additional Information (optional)
            </label>

            <textarea
              id="additionalInformation"
              v-model="form.additionalInformation"
              rows="4"
              placeholder="Include any other relevant information."
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

            <button
              type="submit"
              class="next-button"
            >
              Next: Review Application →
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
  margin: 6px 0 0;
  line-height: 1.5;
}

.form-group input[aria-invalid="true"] {
  border: 2px solid #b42318;
  background: #fff8f7;
}

.question:has(input[aria-invalid="true"]) {
  border-left: 3px solid #b42318;
  padding-left: 12px;
}

.form-group input:focus-visible,
.question input:focus-visible,
button:focus-visible {
  outline: 3px solid #2563eb;
  outline-offset: 2px;
}
</style>
