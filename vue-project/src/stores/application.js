
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

  education: [],
  references: [],
  criminalHistory: [],

  acknowledgment: false
})
