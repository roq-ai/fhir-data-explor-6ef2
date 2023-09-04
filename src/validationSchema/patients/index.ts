import * as yup from 'yup';

export const patientValidationSchema = yup.object().shape({
  first_name: yup.string().required(),
  last_name: yup.string().required(),
  dob: yup.date().required(),
  gender: yup.string().required(),
  address: yup.string().required(),
  phone: yup.string().required(),
  organization_id: yup.string().nullable().required(),
});
