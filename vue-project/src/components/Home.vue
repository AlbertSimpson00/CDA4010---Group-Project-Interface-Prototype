<script setup>
import { useRouter } from 'vue-router'

const router = useRouter()

function startApplication() {
  router.push('/page1')
}
</script>

<template>
  <div class="home-page">

    <!-- HEADER -->
    <header class="site-header">
      <div class="header-content">
        <span class="brand">UNFinished Business</span>
        <span class="header-title">Team H Employment Application</span>
      </div>
    </header>

    <!-- MAIN CONTENT -->
    <main class="home-container">
      <div class="home-card">

        <div class="welcome-icon" aria-hidden="true">
          &#128188;
        </div>

        <h1>Join Our Team</h1>

        <p class="welcome-text">
          Welcome to the UNFinished Business employment
          application. We're excited about your interest
          in joining our team.
        </p>

        <div class="divider"></div>

        <!-- START BUTTON -->
        <button
          type="button"
          class="start-button"
          @click="startApplication"
        >
          Start Application
          <span aria-hidden="true">&rarr;</span>
        </button>

        <p class="help-text">
          Please have your employment and education
          information ready before beginning.
        </p>

        <!-- REMOVED QUESTIONS DROPDOWN -->
        <details class="removed-section">
        <summary class="removed-title">
            Questions Removed or Modified From the Original Application
        </summary>

        <div class="removed-content">
            <p class="removed-description">
                We redesigned the original employment application
                to remove or modify questions that could raise
                privacy, discrimination, or job-relevance concerns.
            </p>

            <div class="removed-item">
                <h3>Medical Conditions & Health Insurance</h3>
                <p>
                    Removed from the pre-employment application
                    because disability-related questions are
                    generally restricted under the Americans
                    with Disabilities Act (ADA) before a
                    conditional job offer.
                </p>
            </div>

            <div class="removed-item">
                <h3>Social Security Number</h3>
                <p>
                    Removed from the initial application to
                    protect sensitive personal information.
                    It should be collected securely during
                    onboarding when necessary.
                </p>
            </div>

            <div class="removed-item">
                <h3>Race & Gender</h3>
                <p>
                    Removed because Title VII of the Civil Rights Act protects
                    applicants against discrimination based on
                    race and sex. Voluntary demographic information,
                    if collected, should be kept separate from
                    hiring decisions.
                </p>
            </div>

            <div class="removed-item">
                <h3>Criminal Conviction History</h3>
                <p>
                    Removed from the initial application.
                    Any criminal background screening should
                    follow applicable laws and use an
                    appropriate screening process.
                </p>
            </div>

            <div class="removed-item">
                <h3>Driver's License Number</h3>
                <p>
                    Removed from the initial application to
                    avoid collecting unnecessary personal
                    information. It can be requested later
                    if driving is an essential job duty.
                </p>
            </div>

            <div class="removed-item">
                <h3>Military Discharge Details</h3>
                <p>
                    Replaced with an opportunity to describe
                    relevant military experience and skills.
                    This allows applicants to highlight
                    qualifications without disclosing
                    unnecessary discharge details.
                </p>
            </div>

            <div class="removed-item">
                <h3>Marital Status</h3>
                <p>
                    Removed because marital status is generally unrelated to
                    an applicant's qualifications or ability
                    to perform the job. Asking about it may
                    introduce discrimination concerns.
                </p>
            </div>

            <div class="removed-item">
                <h3>Children & Child-Related Absences</h3>
                <p>
                    Removed because questions about having children or missing
                    work due to a child's illness are not relevant
                    to evaluating job qualifications and may
                    encourage discriminatory assumptions.
                </p>
            </div>

            <div class="removed-item">
                <h3>Health Insurance History</h3>
                <p>
                    Removed because health insurance history
                    is not relevant to evaluating an applicant's
                    qualifications and raises unnecessary
                    privacy concerns.
                </p>
            </div>
        </div>
        </details>

      </div>
    </main>

    <!-- FOOTER -->
    <footer class="site-footer">
    <p class="developer-credit">Developed by Nick Gati, Gavin Pascual, Lee Simpson</p>
    <p class="footer-description">
        UNFinished Business is an equal-opportunity employer.
    </p>
    </footer>

  </div>
</template>

<style scoped>
.home-page {
  min-height: 100vh;
  background-color: #f3f5f7;
  color: #243449;
  font-family: Arial, Helvetica, sans-serif;
  display: flex;
  flex-direction: column;
}

.removed-section {
  margin-top: 30px;
  padding: 16px 20px;
  border: 1px solid #dee5ed;
  border-radius: 6px;
  background: #f7f9fc;
}

.removed-title {
  display: flex;
  align-items: center;
  justify-content: space-between;
  cursor: pointer;
  color: #24476d;
  font-size: 15px;
  font-weight: 600;
  list-style: none;
}

.removed-title::-webkit-details-marker {
  display: none;
}

.removed-title::after {
  content: "▼";
  font-size: 12px;
  margin-left: 12px;
  transition: transform 0.2s ease;
}

.removed-section[open] .removed-title::after {
  transform: rotate(180deg);
}

.removed-content {
  margin-top: 20px;
  border-top: 1px solid #dee5ed;
  padding-top: 15px;
}

.removed-item {
  padding: 12px 0;
  border-bottom: 1px solid #e9edf2;
}

.removed-item:last-child {
  border-bottom: none;
}

.removed-item h3 {
  font-size: 14px;
  font-weight: 600;
  color: #24476d;
  margin: 0 0 8px;
}

.removed-item p {
  font-size: 13px;
  line-height: 1.7;
  color: #566273;
  margin: 0;
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

/* MAIN */
.home-container {
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 48px 20px;
}

.home-card {
  background: white;
  width: 100%;
  max-width: 600px;
  padding: 48px;
  border-radius: 8px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.025);
  text-align: center;
  box-sizing: border-box;
}

/* WELCOME */
.welcome-icon {
  width: 68px;
  height: 68px;
  background: #eaf0f7;
  color: #24476d;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 30px;
  margin: 0 auto 24px;
}

h1 {
  font-size: 30px;
  font-weight: 500;
  margin-bottom: 14px;
}

.welcome-text {
  font-size: 14px;
  color: #7d8795;
  line-height: 1.7;
  margin-bottom: 24px;
}

.divider {
  height: 1px;
  background: #e9edf2;
  margin-bottom: 28px;
}

/* FEATURES */
.features {
  text-align: left;
  margin-bottom: 32px;
}

.feature {
  display: flex;
  align-items: flex-start;
  gap: 16px;
  margin-bottom: 24px;
}

.feature-icon {
  background: #eaf0f7;
  color: #24476d;
  width: 40px;
  height: 40px;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  font-size: 20px;
}

.feature h3 {
  font-size: 14px;
  font-weight: 600;
  margin: 0 0 6px;
}

.feature p {
  color: #7d8795;
  font-size: 12px;
  line-height: 1.6;
  margin: 0;
}

/* BUTTON */
.start-button {
  width: 100%;
  background: #19385f;
  color: white;
  border: none;
  padding: 15px 20px;
  border-radius: 5px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
}

.start-button:hover {
  background: #2d527e;
}

.start-button:focus-visible {
  outline: 3px solid #507ba9;
  outline-offset: 3px;
}

.help-text {
  font-size: 11px;
  color: #8b96a5;
  margin: 18px 0 0;
}

/* FOOTER */
.site-footer {
  text-align: center;
  padding: 20px;
  background-color: #f3f5f7;
}

.developer-credit {
  color: #24476d;
  font-size: 14px;
  font-weight: 500;
  margin: 0 0 8px;
}

.footer-description {
  color: #8b96a5;
  font-size: 11px;
  margin: 0;
}

/* MOBILE */
@media (max-width: 600px) {
  .home-container {
    padding: 24px 12px;
  }

  .home-card {
    padding: 32px 22px;
  }

  h1 {
    font-size: 26px;
  }

  .header-content {
    padding: 0 16px;
  }

  .brand {
    font-size: 15px;
  }

  .header-title {
    font-size: 10px;
  }
}
</style>
