import * as yup from 'yup';

export const encounterValidationSchema = yup.object().shape({
  date: yup.date().required(),
  type: yup.string().required(),
  description: yup.string().required(),
  patient_id: yup.string().nullable().required(),
  user_id: yup.string().nullable().required(),
});
