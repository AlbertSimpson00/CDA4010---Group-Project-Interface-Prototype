import { reactive } from 'vue'

export const application = reactive({

  // PAGE 1: Personal Information
  personalInfo: {
    firstName: '',
    lastName: '',
    streetAddress: '',
    apartment: '',
    city: '',
    state: '',
    zipCode: '',
    email: '',
    phone: ''
  },

  // PAGE 2: Position & Availability
  employment: {
    position: '',
    otherPosition: '',
    desiredSalary: '',
    salaryPeriod: 'Hourly',
    startDate: '',
    employmentTypes: [],
    workdays: [],
    weeklyHours: '',
    workNights: '',
    availabilityDetails: ''
  },

  // PAGE 3: Education
  education: [
    {
      schoolName: '',
      educationLevel: '',
      graduationDate: '',
      fieldOfStudy: '',
      currentlyAttending: false
    }
  ],

  // PAGE 3: Work Experience
  workExperience: [
    {
      employerName: '',
      jobTitle: '',
      startDate: '',
      endDate: '',
      currentlyWorking: false,
      jobDuties: '',
      reasonForLeaving: ''
    }
  ],

  noPreviousExperience: false,
  additionalSkills: '',

  // PAGE 4: References
  references: [],

  // PAGE 4: Other Requirements
  workAuthorized: '',
  over18: '',

  // PAGE 4: Driving Information
  drivingRequired: false,
  driversLicense: '',
  licenseState: '',
  licenseExpiration: '',
  drivingDuties: '',
  additionalInformation: '',

  // PAGE 5: Review & Submit
  resumeFile: null,
  resumeFileName: '',
  signature: '',
  signatureDate: '',
  acknowledgment: false

  // Remove previously saved page data
  sessionStorage.removeItem('page2')
  sessionStorage.removeItem('page4')
  sessionStorage.removeItem('page4DrivingRequired')
})

