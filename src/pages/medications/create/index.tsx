import {
  FormControl,
  FormLabel,
  Input,
  Button,
  Text,
  Box,
  Spinner,
  FormErrorMessage,
  Switch,
  Flex,
} from '@chakra-ui/react';
import Breadcrumbs from 'components/breadcrumb';
import DatePicker from 'components/date-picker';
import { Error } from 'components/error';
import { FormWrapper } from 'components/form-wrapper';
import { NumberInput } from 'components/number-input';
import { SelectInput } from 'components/select-input';
import { AsyncSelect } from 'components/async-select';
import { TextInput } from 'components/text-input';
import AppLayout from 'layout/app-layout';
import { FormikHelpers, useFormik } from 'formik';
import { useRouter } from 'next/router';
import { FunctionComponent, useState } from 'react';
import * as yup from 'yup';
import { AccessOperationEnum, AccessServiceEnum, requireNextAuth, withAuthorization } from '@roq/nextjs';
import { compose } from 'lib/compose';

import { createMedication } from 'apiSdk/medications';
import { medicationValidationSchema } from 'validationSchema/medications';
import { PatientInterface } from 'interfaces/patient';
import { UserInterface } from 'interfaces/user';
import { getPatients } from 'apiSdk/patients';
import { getUsers } from 'apiSdk/users';
import { MedicationInterface } from 'interfaces/medication';

function MedicationCreatePage() {
  const router = useRouter();
  const [error, setError] = useState(null);

  const handleSubmit = async (values: MedicationInterface, { resetForm }: FormikHelpers<any>) => {
    setError(null);
    try {
      await createMedication(values);
      resetForm();
      router.push('/medications');
    } catch (error) {
      setError(error);
    }
  };

  const formik = useFormik<MedicationInterface>({
    initialValues: {
      name: '',
      dosage: '',
      instructions: '',
      dispensing_details: '',
      patient_id: (router.query.patient_id as string) ?? null,
      user_id: (router.query.user_id as string) ?? null,
    },
    validationSchema: medicationValidationSchema,
    onSubmit: handleSubmit,
    enableReinitialize: true,
    validateOnChange: false,
    validateOnBlur: false,
  });

  return (
    <AppLayout
      breadcrumbs={
        <Breadcrumbs
          items={[
            {
              label: 'Medications',
              link: '/medications',
            },
            {
              label: 'Create Medication',
              isCurrent: true,
            },
          ]}
        />
      }
    >
      <Box rounded="md">
        <Box mb={4}>
          <Text as="h1" fontSize={{ base: '1.5rem', md: '1.875rem' }} fontWeight="bold" color="base.content">
            Create Medication
          </Text>
        </Box>
        {error && (
          <Box mb={4}>
            <Error error={error} />
          </Box>
        )}
        <FormWrapper onSubmit={formik.handleSubmit}>
          <TextInput
            error={formik.errors.name}
            label={'Name'}
            props={{
              name: 'name',
              placeholder: 'Name',
              value: formik.values?.name,
              onChange: formik.handleChange,
            }}
          />

          <TextInput
            error={formik.errors.dosage}
            label={'Dosage'}
            props={{
              name: 'dosage',
              placeholder: 'Dosage',
              value: formik.values?.dosage,
              onChange: formik.handleChange,
            }}
          />

          <TextInput
            error={formik.errors.instructions}
            label={'Instructions'}
            props={{
              name: 'instructions',
              placeholder: 'Instructions',
              value: formik.values?.instructions,
              onChange: formik.handleChange,
            }}
          />

          <TextInput
            error={formik.errors.dispensing_details}
            label={'Dispensing Details'}
            props={{
              name: 'dispensing_details',
              placeholder: 'Dispensing Details',
              value: formik.values?.dispensing_details,
              onChange: formik.handleChange,
            }}
          />

          <AsyncSelect<PatientInterface>
            formik={formik}
            name={'patient_id'}
            label={'Select Patient'}
            placeholder={'Select Patient'}
            fetcher={getPatients}
            labelField={'first_name'}
          />
          <AsyncSelect<UserInterface>
            formik={formik}
            name={'user_id'}
            label={'Select User'}
            placeholder={'Select User'}
            fetcher={getUsers}
            labelField={'email'}
          />
          <Flex justifyContent={'flex-start'}>
            <Button
              isDisabled={formik?.isSubmitting}
              bg="state.info.main"
              color="base.100"
              type="submit"
              display="flex"
              height="2.5rem"
              padding="0rem 1rem"
              justifyContent="center"
              alignItems="center"
              gap="0.5rem"
              mr="4"
              _hover={{
                bg: 'state.info.main',
                color: 'base.100',
              }}
            >
              Submit
            </Button>
            <Button
              bg="neutral.transparent"
              color="neutral.main"
              type="button"
              display="flex"
              height="2.5rem"
              padding="0rem 1rem"
              justifyContent="center"
              alignItems="center"
              gap="0.5rem"
              mr="4"
              onClick={() => router.push('/medications')}
              _hover={{
                bg: 'neutral.transparent',
                color: 'neutral.main',
              }}
            >
              Cancel
            </Button>
          </Flex>
        </FormWrapper>
      </Box>
    </AppLayout>
  );
}

export default compose(
  requireNextAuth({
    redirectTo: '/',
  }),
  withAuthorization({
    service: AccessServiceEnum.PROJECT,
    entity: 'medication',
    operation: AccessOperationEnum.CREATE,
  }),
)(MedicationCreatePage);