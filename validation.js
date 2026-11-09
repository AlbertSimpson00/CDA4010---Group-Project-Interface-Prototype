const REQUIRED_FIELDS = {
    firstName: 'First Name',
    lastName: 'Last Name',
    email: 'Email',
    phone: 'Phone Number',
    address: 'Address',
    city: 'City',
    state: 'State',
    zipCode: 'Zip Code',
    ssn: 'Social Security Number',
    dateAvailable: 'Date Available',
    over18: 'Are you at least 18?',
    signature: 'Signature',
    signatureDate: 'Signature Date'
};

const isBlank = (v) => v === undefined || v === null || String(v).trim() === '';

const digitsOnly = (v) => String(v).replace(/\D/g, '');