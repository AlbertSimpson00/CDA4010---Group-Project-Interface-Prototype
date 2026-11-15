<script setup>
import { reactive, onMounted } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const form = reactive({
  references: [
    { name: '', relationship: '', phone: '', email: '' },
    { name: '', relationship: '', phone: '', email: '' }
  ],
  workAuthorized: '',
  over18: '',
  reliableCommute: '',
  essentialDuties: '',
  additionalInformation: ''
})

onMounted(() => {
  const saved = sessionStorage.getItem('page5')

  if (saved) {
    try {
      const data = JSON.parse(saved)
      Object.assign(form, data)
    } catch (error) {
      console.error('Could not restore Page 5:', error)
    }
  }
})

function saveForm() {
  sessionStorage.setItem('page5', JSON.stringify(form))
}

function previousPage() {
  saveForm()
  router.push('/page4')
}

function nextPage() {
  saveForm()
  router.push('/page6')
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
          Please provide your references and answer
          the following employment-related questions.
        </p>

        <form @submit.prevent="nextPage">
          <p class="required-note">* Required fields</p>

          <h2>Professional References</h2>
          <p class="field-hint">
            Please provide two professional references.
          </p>

          <div
            v-for="(reference, index) in form.references"
            :key="index"
            class="reference-section"
          >
            <h3>Reference {{ index + 1 }}</h3>

            <div class="form-group">
              <label :for="'name-' + index">
                Full Name <span>*</span>
              </label>
              <input
                :id="'name-' + index"
                v-model="reference.name"
                type="text"
                autocomplete="off"
                required
                placeholder="Full name"
              />
            </div>

            <div class="form-row">
              <div class="form-group">
                <label :for="'relationship-' + index">
                  Relationship <span>*</span>
                </label>
                <input
                  :id="'relationship-' + index"
                  v-model="reference.relationship"
                  type="text"
                  required
                  placeholder="Supervisor"
                />
              </div>

              <div class="form-group">
                <label :for="'phone-' + index">
                  Phone Number <span>*</span>
                </label>
                <input
                  :id="'phone-' + index"
                  v-model="reference.phone"
                  type="tel"
                  required
                  placeholder="(555) 123-4567"
                />
              </div>
            </div>

            <div class="form-group">
              <label :for="'email-' + index">
                Email Address (optional)
              </label>
              <input
                :id="'email-' + index"
                v-model="reference.email"
                type="email"
                placeholder="reference@example.com"
              />
            </div>
          </div>

          <hr />

          <h2>Other Requirements</h2>

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
                /> Yes
              </label>
              <label>
                <input
                  v-model="form.workAuthorized"
                  type="radio"
                  value="No"
                /> No
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
                /> Yes
              </label>
              <label>
                <input
                  v-model="form.over18"
                  type="radio"
                  value="No"
                /> No
              </label>
            </div>
          </fieldset>

          <fieldset class="question">
            <legend>
              Can you reliably commute to your
              assigned work location?
            </legend>
            <div class="radio-group">
              <label>
                <input
                  v-model="form.reliableCommute"
                  type="radio"
                  value="Yes"
                /> Yes
              </label>
              <label>
                <input
                  v-model="form.reliableCommute"
                  type="radio"
                  value="No"
                /> No
              </label>
            </div>
          </fieldset>

          <fieldset class="question">
            <legend>
              Can you perform the essential duties
              of the position, with or without
              reasonable accommodation?
            </legend>
            <div class="radio-group">
              <label>
                <input
                  v-model="form.essentialDuties"
                  type="radio"
                  value="Yes"
                /> Yes
              </label>
              <label>
                <input
                  v-model="form.essentialDuties"
                  type="radio"
                  value="No"
                /> No
              </label>
            </div>
          </fieldset>

          <div class="form-group">
            <label for="additionalInformation">
              Additional Information (optional)
            </label>
            <textarea
              id="additionalInformation"
              v-model="form.additionalInformation"
              rows="4"
              placeholder="Anything else you would like us to know?"
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

            <button type="submit" class="next-button">
              Next: Review Application
              <span aria-hidden="true">➜</span>
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
.application-page {
  min-height: 100vh;
  background: #f3f5f7;
  color: #243449;
  font-family: Arial, Helvetica, sans-serif;
}

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
}

.header-title {
  font-size: 12px;
  font-weight: 600;
}

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
  box-shadow: 0 2px 12px rgba(0,0,0,0.025);
  box-sizing: border-box;
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
  margin-bottom: 30px;
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

h1 {
  font-size: 27px;
  font-weight: 500;
  margin-bottom: 8px;
}

h2 {
  font-size: 17px;
  font-weight: 600;
  margin: 24px 0 12px;
}

h3 {
  font-size: 14px;
  font-weight: 600;
  color: #24476d;
  margin-bottom: 16px;
}

.description {
  font-size: 14px;
  color: #7d8795;
}

.required-note,
.field-hint {
  font-size: 11px;
  color: #8b96a5;
}

.required-note {
  margin: 16px 0 22px;
}

.reference-section {
  padding: 20px 0;
  border-bottom: 1px solid #e9edf2;
}

.form-group {
  margin-bottom: 18px;
  min-width: 0;
}

.form-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 18px;
}

.form-group label,
.question legend {
  display: block;
  font-size: 12px;
  font-weight: 600;
  margin-bottom: 8px;
}

.form-group label span,
.question legend span {
  color: #bd4a4a;
}

input[type="text"],
input[type="tel"],
input[type="email"],
textarea {
  width: 100%;
  padding: 11px 12px;
  border: 1px solid #d4dce6;
  border-radius: 5px;
  font-size: 13px;
  box-sizing: border-box;
  background: white;
  color: #344256;
}

input:focus,
textarea:focus {
  outline: none;
  border-color: #507ba9;
  box-shadow: 0 0 0 2px rgba(80,123,169,0.15);
}

.question {
  border: 0;
  padding: 0;
  margin: 20px 0;
}

.question legend {
  float: none;
  width: 100%;
}

.radio-group {
  display: flex;
  gap: 24px;
  margin-top: 10px;
}

.radio-group label {
  font-size: 13px;
  display: flex;
  align-items: center;
  gap: 7px;
  cursor: pointer;
}

input[type="radio"] {
  accent-color: #24476d;
}

hr {
  border: 0;
  border-top: 1px solid #e9edf2;
  margin: 24px 0;
}

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

.site-footer {
  text-align: center;
  color: #8b96a5;
  font-size: 11px;
  padding: 12px 20px 28px;
}

@media (max-width: 600px) {
  .application-container {
    padding: 20px 12px;
  }

  .application-card {
    padding: 24px 18px;
  }

  .form-row {
    grid-template-columns: 1fr;
    gap: 0;
  }

  .header-content {
    padding: 0 16px;
  }
}
</style>
