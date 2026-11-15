
import { reactive } from 'vue'

export const application = reactive({

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

  employment: {
    position: '',
    otherPosition: '',
    employmentType: '',
    availableStartDate: '',
    availableDays: [],
    preferredShifts: [],
    additionalNotes: '',
    fullTime: false
  },

  education: [
    {
      schoolName: '',
      educationLevel: '',
      graduationDate: '',
      fieldOfStudy: '',
      currentlyAttending: false
    }
  ],

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
  references: [],
  criminalHistory: [],
  resumeFile: null,
  resumeFileName: '',
  signature: '',
  signatureDate: '',
  acknowledgment: false

})
