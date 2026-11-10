
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
    availableStartDate: '',
    fullTime: false
  },

  education: [],
  references: [],
  criminalHistory: [],

  acknowledgment: false
})
