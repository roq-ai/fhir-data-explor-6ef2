import * as yup from 'yup';

export const medicationValidationSchema = yup.object().shape({
  name: yup.string().required(),
  dosage: yup.string().required(),
  instructions: yup.string().required(),
  dispensing_details: yup.string().required(),
  patient_id: yup.string().nullable().required(),
  user_id: yup.string().nullable().required(),
});
