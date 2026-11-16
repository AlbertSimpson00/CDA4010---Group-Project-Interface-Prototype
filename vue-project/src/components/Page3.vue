
<script setup>
import { application } from '../stores/application.js'
import { useRouter } from 'vue-router'
import { reactive, nextTick } from 'vue'

const router = useRouter()

const errors = reactive({})
const touched = reactive({})
const fieldRefs = {}

function fieldKey(section, index, field) {
  return `${section}-${index}-${field}`
}

function setFieldRef(key, element) {
  if (element) fieldRefs[key] = element
}

function getError(section, index, field) {
  const entry = section === 'education'
    ? application.education[index]
    : application.workExperience[index]

  if (!entry) return ''

  const value = String(entry[field] ?? '').trim()

  const labels = {
    schoolName: 'School or Institution Name',
    educationLevel: 'Education Level',
    employerName: 'Employer Name',
    jobTitle: 'Job Title',
    startDate: 'Start Date'
  }

  if (labels[field] && !value) {
    return `${labels[field]} is required.`
  }

  if (section === 'employment') {
    if (field === 'endDate' && !entry.currentlyWorking) {
      if (!value) return 'End Date is required.'
    }

    if (field === 'endDate' && value && entry.startDate) {
      if (value < entry.startDate) {
        return 'End Date cannot be before Start Date.'
      }
    }
  }

  return ''
}

function validateField(section, index, field) {
  const key = fieldKey(section, index, field)
  touched[key] = true
  errors[key] = getError(section, index, field)
}

function updateField(section, index, field) {
  const key = fieldKey(section, index, field)

  if (touched[key]) {
    errors[key] = getError(section, index, field)
  }
}

function resetValidation() {
  Object.keys(errors).forEach(key => delete errors[key])
  Object.keys(touched).forEach(key => delete touched[key])
  Object.keys(fieldRefs).forEach(key => delete fieldRefs[key])
}

async function validatePage() {
  resetValidation()

  const fields = []

  application.education.forEach((entry, index) => {
    fields.push(
      ['education', index, 'schoolName'],
      ['education', index, 'educationLevel']
    )
  })

  if (!application.noPreviousExperience) {
    application.workExperience.forEach((entry, index) => {
      fields.push(
        ['employment', index, 'employerName'],
        ['employment', index, 'jobTitle'],
        ['employment', index, 'startDate'],
        ['employment', index, 'endDate']
      )
    })
  }

  fields.forEach(([section, index, field]) => {
    validateField(section, index, field)
  })

  const firstInvalid = fields.find(([section, index, field]) =>
    errors[fieldKey(section, index, field)]
  )

  if (firstInvalid) {
    await nextTick()
    const key = fieldKey(...firstInvalid)
    fieldRefs[key]?.focus()
    return false
  }

  return true
}

function demoAutofill() {
  application.education.splice(
    0,
    application.education.length,
    {
      schoolName: 'Wayne State University',
      educationLevel: "Bachelor's Degree",
      graduationDate: '2005-05-01',
      fieldOfStudy: 'Architecture',
      currentlyAttending: false
    }
  )

  application.workExperience.splice(
    0,
    application.workExperience.length,
    {
      employerName: 'Green Lantern Corps',
      jobTitle: 'Sector 2814 Green Lantern',
      startDate: '2010-01-15',
      endDate: '2025-12-15',
      currentlyWorking: true,
      jobDuties: 'Available for emergency assignments and overnight shifts.',
      reasonForLeaving: 'Seeking additional opportunities on Earth.'
    }
  )

  application.noPreviousExperience = false
  application.additionalSkills =
    'Leadership, crisis management, military training, architecture, emergency response, teamwork, and advanced problem-solving.'

    resetValidation()
}

function clearForm() {
  application.education.splice(0)
  application.workExperience.splice(0)

  addEducation()
  addEmployment()

  application.noPreviousExperience = false
  application.additionalSkills = ''

  resetValidation()
}

//add another education entry
function addEducation() {
  application.education.push({
    schoolName: '',
    educationLevel: '',
    graduationDate: '',
    fieldOfStudy: '',
    currentlyAttending: false
  })
}

//add another employment entry
function addEmployment() {
  application.workExperience.push({
    employerName: '',
    jobTitle: '',
    startDate: '',
    endDate: '',
    currentlyWorking: false,
    jobDuties: '',
    reasonForLeaving: ''
  })
}

//Remove  education entry
function removeEducation(index) {
  application.education.splice(index, 1)
}

//remove employment entry
function removeEmployment(index) {
  application.workExperience.splice(index, 1)
}

// back to 2
function previousPage() {
  router.push('/page2')
}

// to Page 4
async function nextPage() {
  if (!(await validatePage())) return

  console.log('Education and Experience:', application)
  router.push('/page4')
}
</script>

<template>
  <div class="page">

    <!-- Header -->
    <header class="top-header">
      <span>UNFinished Business</span>
      <small>Team H Employment Application</small>
    </header>

    <main class="form-container">

      <div class="step-text">
        Step 3 of 5 — Education &amp; Experience
      </div>

      <!-- Progress Bar -->
      <div class="progress-bar">
        <div class="active"></div>
        <div class="active"></div>
        <div class="active"></div>
        <div></div>
        <div></div>
      </div>

      <h2>Education &amp; Experience</h2>

      <p class="subtitle">
        Tell us about your education, previous employment, and relevant skills.
      </p>

      <p class="required-text">* Required fields</p>

      <form @submit.prevent="nextPage" novalidate>

        <!-- EDUCATION -->
        <section class="form-section">

          <h3>Education</h3>

          <div
            v-for="(education, index) in application.education"
            :key="index"
            class="entry-section"
          >

            <div class="entry-heading">
              <strong>Education {{ index + 1 }}</strong>

              <button
                v-if="application.education.length > 1"
                type="button"
                class="remove-button"
                @click="removeEducation(index)"
              >
                Remove
              </button>
            </div>

            <div class="form-group">
              <label :for="'school-' + index">
                School or Institution Name *
              </label>

              
                <input
                :id="'school-' + index"
                :ref="el => setFieldRef(fieldKey('education', index, 'schoolName'), el)"
                v-model="education.schoolName"
                type="text"
                required
                :aria-invalid="!!errors[fieldKey('education', index, 'schoolName')]"
                :aria-describedby="
                    errors[fieldKey('education', index, 'schoolName')]
                    ? 'school-error-' + index
                    : undefined
                "
                @blur="validateField('education', index, 'schoolName')"
                @input="updateField('education', index, 'schoolName')"
                />

                <p
                v-if="errors[fieldKey('education', index, 'schoolName')]"
                :id="'school-error-' + index"
                class="field-error"
                >
                {{ errors[fieldKey('education', index, 'schoolName')] }}
                </p>
            </div>

            <div class="form-grid">

              <div class="form-group">
                <label :for="'level-' + index">
                  Education Level *
                </label>

                
                <select
                :id="'level-' + index"
                :ref="el => setFieldRef(fieldKey('education', index, 'educationLevel'), el)"
                v-model="education.educationLevel"
                required
                :aria-invalid="!!errors[fieldKey('education', index, 'educationLevel')]"
                :aria-describedby="
                    errors[fieldKey('education', index, 'educationLevel')]
                    ? 'level-error-' + index
                    : undefined
                "
                @blur="validateField('education', index, 'educationLevel')"
                @change="updateField('education', index, 'educationLevel')"
                >
                <option value="" disabled>Select Level</option>
                <option>High School</option>
                <option>GED</option>
                <option>Some College</option>
                <option>Associate Degree</option>
                <option>Bachelor's Degree</option>
                <option>Master's Degree</option>
                <option>Doctorate</option>
                <option>Other</option>
                </select>

                <p
                v-if="errors[fieldKey('education', index, 'educationLevel')]"
                :id="'level-error-' + index"
                class="field-error"
                >
                {{ errors[fieldKey('education', index, 'educationLevel')] }}
                </p>

              </div>

              <div class="form-group">
                <label :for="'graduation-' + index">
                  Graduation Date <span>(optional)</span>
                </label>

                <input
                  :id="'graduation-' + index"
                  v-model="education.graduationDate"
                  type="date"
                >
              </div>

            </div>

            <div class="form-group">
              <label :for="'study-' + index">
                Field of Study <span>(optional)</span>
              </label>

              <input
                :id="'study-' + index"
                v-model="education.fieldOfStudy"
                type="text"
                placeholder="Enter your field of study"
              >
            </div>

            <div class="check-group">
              <input
                :id="'attending-' + index"
                v-model="education.currentlyAttending"
                type="checkbox"
              >

              <label :for="'attending-' + index">
                Currently attending
              </label>
            </div>

          </div>

          <button
            type="button"
            class="add-button"
            @click="addEducation"
          >
            + Add Education
          </button>

        </section>

        <!-- WORK EXPERIENCE -->
        <section class="form-section">

          <h3>Work Experience</h3>

          <div class="check-group no-experience">
            <input
              id="noExperience"
              v-model="application.noPreviousExperience"
              type="checkbox"
            >

            <label for="noExperience">
              I have no previous work experience.
            </label>
          </div>

          <div
            v-if="!application.noPreviousExperience"
            v-for="(job, index) in application.workExperience"
            :key="index"
            class="entry-section"
          >

            <div class="entry-heading">
              <strong>Employment {{ index + 1 }}</strong>

              <button
                v-if="application.workExperience.length > 1"
                type="button"
                class="remove-button"
                @click="removeEmployment(index)"
              >
                Remove
              </button>
            </div>

            <div class="form-grid">

              <div class="form-group">
                <label :for="'employer-' + index">
                  Employer Name *
                </label>

                
                <input
                :id="'employer-' + index"
                :ref="el => setFieldRef(fieldKey('employment', index, 'employerName'), el)"
                v-model="job.employerName"
                type="text"
                required
                :aria-invalid="!!errors[fieldKey('employment', index, 'employerName')]"
                :aria-describedby="
                    errors[fieldKey('employment', index, 'employerName')]
                    ? 'employer-error-' + index
                    : undefined
                "
                @blur="validateField('employment', index, 'employerName')"
                @input="updateField('employment', index, 'employerName')"
                />

                <p
                v-if="errors[fieldKey('employment', index, 'employerName')]"
                :id="'employer-error-' + index"
                class="field-error"
                >
                {{ errors[fieldKey('employment', index, 'employerName')] }}
                </p>

              </div>

              <div class="form-group">
                <label :for="'job-title-' + index">
                  Job Title *
                </label>
                
                <input
                :id="'job-title-' + index"
                :ref="el => setFieldRef(fieldKey('employment', index, 'jobTitle'), el)"
                v-model="job.jobTitle"
                type="text"
                required
                :aria-invalid="!!errors[fieldKey('employment', index, 'jobTitle')]"
                :aria-describedby="
                    errors[fieldKey('employment', index, 'jobTitle')]
                    ? 'job-title-error-' + index
                    : undefined
                "
                @blur="validateField('employment', index, 'jobTitle')"
                @input="updateField('employment', index, 'jobTitle')"
                />

                <p
                v-if="errors[fieldKey('employment', index, 'jobTitle')]"
                :id="'job-title-error-' + index"
                class="field-error"
                >
                {{ errors[fieldKey('employment', index, 'jobTitle')] }}
                </p>

              </div>

              <div class="form-group">
                <label :for="'start-' + index">
                  Start Date *
                </label>

                
                <input
                :id="'start-' + index"
                :ref="el => setFieldRef(fieldKey('employment', index, 'startDate'), el)"
                v-model="job.startDate"
                type="date"
                required
                :aria-invalid="!!errors[fieldKey('employment', index, 'startDate')]"
                :aria-describedby="
                    errors[fieldKey('employment', index, 'startDate')]
                    ? 'start-error-' + index
                    : undefined
                "
                @blur="validateField('employment', index, 'startDate')"
                @change="updateField('employment', index, 'startDate')"
                />

                <p
                v-if="errors[fieldKey('employment', index, 'startDate')]"
                :id="'start-error-' + index"
                class="field-error"
                >
                {{ errors[fieldKey('employment', index, 'startDate')] }}
                </p>

              </div>

              <div class="form-group">
                <label :for="'end-' + index">
                  End Date
                </label>

                
                <input
                :id="'end-' + index"
                :ref="el => setFieldRef(fieldKey('employment', index, 'endDate'), el)"
                v-model="job.endDate"
                type="date"
                :disabled="job.currentlyWorking"
                :aria-invalid="!!errors[fieldKey('employment', index, 'endDate')]"
                :aria-describedby="
                    errors[fieldKey('employment', index, 'endDate')]
                    ? 'end-error-' + index
                    : undefined
                "
                @blur="validateField('employment', index, 'endDate')"
                @change="updateField('employment', index, 'endDate')"
                />

                <p
                v-if="errors[fieldKey('employment', index, 'endDate')]"
                :id="'end-error-' + index"
                class="field-error"
                >
                {{ errors[fieldKey('employment', index, 'endDate')] }}
                </p>
              </div>
            </div>

            <div class="check-group">
              <input
                type="checkbox"
                v-model="job.currentlyWorking"
                @change="
                    job.currentlyWorking ? job.endDate = '' : null;
                    validateField('employment', index, 'endDate')
                "
                />

              <label :for="'working-' + index">
                I currently work here.
              </label>
            </div>

            <div class="form-group">
              <label :for="'duties-' + index">
                Job Duties
              </label>

              <textarea
                :id="'duties-' + index"
                v-model="job.jobDuties"
                rows="4"
                placeholder="Describe your responsibilities..."
              ></textarea>
            </div>

            <div class="form-group">
              <label :for="'reason-' + index">
                Reason for Leaving
              </label>

              <textarea
                :id="'reason-' + index"
                v-model="job.reasonForLeaving"
                rows="2"
                :disabled="job.currentlyWorking"
                placeholder="Enter reason for leaving"
              ></textarea>
            </div>

          </div>

          <button
            v-if="!application.noPreviousExperience"
            type="button"
            class="add-button"
            @click="addEmployment"
          >
            + Add Employment
          </button>

        </section>

        <!-- ADDITIONAL SKILLS -->
        <section class="form-section">

          <h3>Additional Skills <span>(optional)</span></h3>

          <div class="form-group">
            <label for="skills">
              Skills, Certifications, or Relevant Experience
            </label>

            <textarea
              id="skills"
              v-model="application.additionalSkills"
              rows="5"
              placeholder="Enter any additional skills, certifications, or experience..."
            ></textarea>

            <small class="help-text">
              Include relevant skills gained through school, volunteering,
              or other activities.
            </small>
          </div>

        </section>

        <!-- NAVIGATION -->
        <div class="form-footer">

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
            Next: References and Other Requirements →
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
  width: 700px;
  max-width: calc(100% - 30px);
  margin: 26px auto;
  padding: 25px;
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
  margin-bottom: 18px;
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
  font-size: 20px;
  font-weight: normal;
  margin-bottom: 5px;
}

.subtitle {
  font-size: 12px;
  color: #667085;
  margin-bottom: 5px;
}

.required-text {
  font-size: 10px;
  color: #667085;
  margin-bottom: 20px;
}

.form-section {
  border-bottom: 1px solid #e5e7eb;
  padding-bottom: 22px;
  margin-bottom: 22px;
}

h3 {
  font-size: 15px;
  font-weight: bold;
  margin-bottom: 17px;
}

h3 span {
  font-size: 11px;
  font-weight: normal;
  color: #667085;
}

.entry-section {
  border-bottom: 1px dashed #d5dce5;
  padding-bottom: 18px;
  margin-bottom: 18px;
}

.entry-heading {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 12px;
  margin-bottom: 14px;
}

.form-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 13px;
}

.form-group {
  display: flex;
  flex-direction: column;
  margin-bottom: 13px;
  min-width: 0;
}

.form-group label {
  font-size: 11px;
  font-weight: bold;
  margin-bottom: 5px;
}

.form-group label span {
  font-weight: normal;
  color: #667085;
}

.form-group input,
.form-group select,
.form-group textarea {
  width: 100%;
  border: 1px solid #cbd5e1;
  border-radius: 4px;
  padding: 8px;
  font-size: 12px;
  font-family: Arial, sans-serif;
  color: #344054;
  background: white;
}

.form-group input,
.form-group select {
  height: 34px;
}

.form-group textarea {
  resize: vertical;
}

.form-group input:focus,
.form-group select:focus,
.form-group textarea:focus {
  outline: none;
  border-color: #3678d4;
  box-shadow: 0 0 3px rgba(54, 120, 212, 0.3);
}

.form-group input:disabled,
.form-group textarea:disabled {
  background: #f1f2f4;
  cursor: not-allowed;
}

.check-group {
  display: flex;
  align-items: center;
  gap: 7px;
  margin: 10px 0 15px;
}

.check-group input {
  cursor: pointer;
}

.check-group label {
  font-size: 11px;
  cursor: pointer;
}

.no-experience {
  margin-bottom: 20px;
}

.add-button {
  background: white;
  color: #1c3b63;
  border: 1px solid #cbd5e1;
  border-radius: 4px;
  padding: 8px 12px;
  font-size: 11px;
  cursor: pointer;
}

.add-button:hover {
  background: #f3f4f6;
}

.remove-button {
  background: none;
  color: #a33;
  border: none;
  font-size: 10px;
  cursor: pointer;
}

.help-text {
  color: #667085;
  font-size: 10px;
  margin-top: 6px;
}

.form-footer {
  display: flex;
  justify-content: space-between;
  border-top: 1px solid #e5e7eb;
  padding-top: 18px;
  margin-top: 25px;
}

.back-button {
  background: white;
  border: 1px solid #cbd5e1;
  border-radius: 4px;
  padding: 9px 16px;
  font-size: 11px;
  cursor: pointer;
  color: #344054;
}

.next-button {
  background: #1c3b63;
  color: white;
  border: none;
  border-radius: 4px;
  padding: 10px 14px;
  font-size: 10px;
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

.form-group input:focus-visible,
.form-group select:focus-visible,
button:focus-visible {
  outline: 3px solid #2563eb;
  outline-offset: 2px;
}

footer {
  text-align: center;
  font-size: 9px;
  color: #667085;
  padding-bottom: 18px;
}

@media (max-width: 550px) {
  .top-header {
    padding: 0 15px;
  }

  .form-container {
    padding: 18px;
  }

  .form-grid {
    grid-template-columns: 1fr;
  }

  .form-footer {
    gap: 10px;
  }

  .next-button {
    max-width: 70%;
  }
}
</style>
