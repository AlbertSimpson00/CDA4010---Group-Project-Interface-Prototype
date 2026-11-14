<script setup>
import { application } from '../stores/application.js'
import { useRouter } from 'vue-router'

const router = useRouter()

function previousPage() {
  router.push('/page4')
}

function uploadResume(event) {
  const file = event.target.files[0]

  if (file) {
    application.resumeFile = file
    application.resumeFileName = file.name
  }
}

// Submit the application (still working on this)
function submitApplication() {
  if (!application.acknowledgment) {
    alert('Please agree to the application acknowledgment first.')
    return
  }

  console.log('Application submitted:', application)

  alert('Application information saved! Submission is still being worked on.')
}
</script>

<template>
  <div class="page">

    <!-- Header -->
    <header class="top-header">
      <span>UNFinished Business</span>
      <small>Employment Application</small>
    </header>

    <!-- Main Form -->
    <main class="form-container">

      <div class="step-text">
        Step 5 of 5 — Review &amp; Acknowledgment
      </div>

      <!-- Progress Bar -->
      <div class="progress-bar">
        <div class="active"></div>
        <div class="active"></div>
        <div class="active"></div>
        <div class="active"></div>
        <div class="active"></div>
      </div>

      <h2>Application Review &amp; Acknowledgment</h2>

      <p class="subtitle">
        Almost done! Please review the information below before submitting your application.
      </p>

      <p class="required-text">* Required fields</p>

      <form @submit.prevent="submitApplication">

        <!-- RESUME UPLOAD -->
        <section class="form-section">

          <h3>Resume Upload</h3>

          <p class="section-description">
            Please upload a PDF copy of your resume.
          </p>

          <div class="form-group">
            <label for="resume">Upload Resume *</label>

            <input
              id="resume"
              type="file"
              accept=".pdf,application/pdf"
              required
              @change="uploadResume"
            >

            <small v-if="application.resumeFileName" class="file-name">
              Selected file: {{ application.resumeFileName }}
            </small>
          </div>

        </section>

        <!-- APPLICATION REVIEW -->
        <section class="form-section">

          <h3>Application Information</h3>

          <p class="section-description">
            Make sure your information is correct before continuing.
          </p>

          <div class="review-box">

            <p>
              <strong>Name:</strong>
              {{ application.personalInfo.firstName }}
              {{ application.personalInfo.lastName }}
            </p>

            <p>
              <strong>Email:</strong>
              {{ application.personalInfo.email }}
            </p>

            <p>
              <strong>Phone:</strong>
              {{ application.personalInfo.phone }}
            </p>

            <p>
              <strong>Position:</strong>
              {{ application.employment.position || 'Not entered yet' }}
            </p>

          </div>

          <small class="help-text">
            This is just a quick review of some of your information.
          </small>

        </section>

        <!-- ACKNOWLEDGMENT -->
        <section class="form-section">

          <h3>Application Acknowledgment and Waiver</h3>

          <p class="section-description">
            By submitting my application to UNFinished Business, I agree to the following:
          </p>

          <div class="waiver-box">

            <p>
              <strong>1. Employment</strong>
              Submitting this application does not mean I will get hired.
              If I am hired, my employment can end at any time, with or without
              notice, unless a different written agreement is signed by the company.
            </p>

            <p>
              <strong>2. Correct Information</strong>
              I confirm that the information I gave is true and complete.
              I understand that false or missing information may cause my application
              to be rejected. I also give the company permission to contact my schools,
              past employers, and references.
            </p>

            <p>
              <strong>3. Drug and Alcohol Testing</strong>
              I understand that UNFinished Business may require drug and alcohol
              testing before and during employment. I agree to follow the company's
              testing policy.
            </p>

            <p>
              <strong>4. Background Reports</strong>
              I understand that the company may request a background report
              when reviewing my application. This report could include information
              about my history and reputation. I can request more information about
              the report in writing.
            </p>

            <p>
              <strong>5. Probation Period</strong>
              I understand that the first 60 days of employment will be a
              probation period. During this time, my employment may end at any time,
              following the at-will employment terms above.
            </p>

          </div>

          <div class="check-group">
            <input
              id="acknowledgment"
              type="checkbox"
              v-model="application.acknowledgment"
              required
            >

            <label for="acknowledgment">
              I have read and agree to the application acknowledgment and waiver above. *
            </label>
          </div>

        </section>

        <!-- SIGNATURE -->
        <section class="form-section">

          <h3>Applicant Signature</h3>

          <p class="section-description">
            Please type your name below to sign the application.
          </p>

          <div class="form-grid">

            <div class="form-group">
              <label for="signature">Full Name *</label>

              <input
                id="signature"
                type="text"
                v-model="application.signature"
                placeholder="Type your full name"
                required
              >
            </div>

            <div class="form-group">
              <label for="signatureDate">Date *</label>

              <input
                id="signatureDate"
                type="date"
                v-model="application.signatureDate"
                required
              >
            </div>

          </div>

          <p class="signature-note">
            Typing your name above will act as your electronic signature.
          </p>

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

          <button type="submit" class="next-button">
            Submit Application →
          </button>

        </div>

      </form>

      <p class="unfinished-note">
        * Some application features are still being developed.
      </p>

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
  width: 650px;
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

h3 {
  font-size: 15px;
  margin-bottom: 12px;
}

.subtitle {
  font-size: 12px;
  color: #667085;
}

.required-text {
  font-size: 10px;
  color: #667085;
  margin-bottom: 20px;
}

.form-section {
  border-bottom: 1px solid #e5e7eb;
  padding-bottom: 20px;
  margin-bottom: 22px;
}

.section-description {
  font-size: 11px;
  color: #667085;
  margin-bottom: 15px;
}

.form-group {
  display: flex;
  flex-direction: column;
  margin-bottom: 13px;
}

.form-group label {
  font-size: 11px;
  font-weight: bold;
  margin-bottom: 5px;
}

.form-group input {
  height: 34px;
  border: 1px solid #cbd5e1;
  border-radius: 4px;
  padding: 7px;
  font-size: 11px;
  background: white;
}

.form-group input[type="file"] {
  height: auto;
  padding: 8px;
  background: #f9fafb;
}

.form-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 13px;
}

.file-name {
  font-size: 10px;
  margin-top: 6px;
  color: #1c3b63;
}

.review-box {
  background: #f8f9fa;
  border: 1px solid #dfe3e8;
  padding: 12px;
  border-radius: 4px;
  font-size: 11px;
  margin-top: 10px;
}

.review-box p {
  margin: 5px 0 10px;
}

.help-text {
  font-size: 10px;
  color: #667085;
  display: block;
  margin-top: 8px;
}

.waiver-box {
  border: 1px solid #d5dce5;
  background: #fafafa;
  padding: 13px;
  max-height: 330px;
  overflow-y: auto;
  font-size: 11px;
  line-height: 1.55;
  margin-bottom: 15px;
}

.waiver-box p {
  margin-bottom: 16px;
}

.check-group {
  display: flex;
  align-items: flex-start;
  gap: 8px;
  margin-top: 14px;
}

.check-group input {
  margin-top: 2px;
}

.check-group label {
  font-size: 11px;
}

.signature-note {
  font-size: 10px;
  color: #777;
  margin-top: 5px;
}

.form-footer {
  display: flex;
  justify-content: space-between;
  border-top: 1px solid #e5e7eb;
  padding-top: 17px;
  margin-top: 20px;
}

.back-button {
  background: white;
  border: 1px solid #cbd5e1;
  border-radius: 4px;
  padding: 9px 16px;
  font-size: 11px;
  cursor: pointer;
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

.unfinished-note {
  font-size: 10px;
  color: #999;
  text-align: center;
  margin-top: 18px;
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
}
</style>
