<script setup>
import { reactive, onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
let nextReferenceId = 1

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
}

function removeReference(index) {
  form.references.splice(index, 1)
}

function saveForm() {
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

function nextPage() {
  saveForm()
  router.push('/page5')
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

        <form @submit.prevent="nextPage">
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
                v-model="reference.name"
                type="text"
                required
                placeholder="Reference's full name"
              />
            </div>

            <div class="form-row">
              <div class="form-group">
                <label :for="'refTitle-' + reference.id">
                  Job Title <span>*</span>
                </label>

                <input
                  :id="'refTitle-' + reference.id"
                  v-model="reference.title"
                  type="text"
                  required
                  placeholder="Job title"
                />
              </div>

              <div class="form-group">
                <label :for="'refCompany-' + reference.id">
                  Company <span>*</span>
                </label>

                <input
                  :id="'refCompany-' + reference.id"
                  v-model="reference.company"
                  type="text"
                  required
                  placeholder="Company name"
                />
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
                  v-model="reference.phone"
                  type="tel"
                  required
                  placeholder="(555) 123-4567"
                />
              </div>

              <div class="form-group">
                <label :for="'refEmail-' + reference.id">
                  Email Address
                </label>

                <input
                  :id="'refEmail-' + reference.id"
                  v-model="reference.email"
                  type="email"
                  placeholder="reference@example.com"
                />
              </div>
            </div>
          </div>

          <button
            type="button"
            class="add-button"
            @click="addReference"
          >
            + Add Reference
          </button>


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
                  v-model="form.workAuthorized"
                  type="radio"
                  value="Yes"
                  required
                />
                Yes
              </label>

              <label>
                <input
                  v-model="form.workAuthorized"
                  type="radio"
                  value="No"
                />
                No
              </label>
            </div>
          </fieldset>

          <fieldset class="question">
            <legend>
              Are you at least 18 years old? <span>*</span>
            </legend>

            <div class="radio-group">
              <label>
                <input
                  v-model="form.over18"
                  type="radio"
                  value="Yes"
                  required
                />
                Yes
              </label>

              <label>
                <input
                  v-model="form.over18"
                  type="radio"
                  value="No"
                />
                No
              </label>
            </div>
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
                    v-model="form.driversLicense"
                    type="radio"
                    value="Yes"
                    required
                  />
                  Yes
                </label>

                <label>
                  <input
                    v-model="form.driversLicense"
                    type="radio"
                    value="No"
                  />
                  No
                </label>
              </div>
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
</style>
