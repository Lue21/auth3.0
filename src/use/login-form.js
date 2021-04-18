const PASSWORD_MIN_LENGTH = 6;
const SUBMIT_COUNT_TRIES = 3;

import { computed, watch } from "vue";
import * as yup from "yup";
import { useField, useForm } from "vee-validate";
import { useRouter } from "vue-router";
import { useStore } from "vuex";

export function useLoginForm() {
  const store = useStore();
  const router = useRouter();

  const { handleSubmit, isSubmitting, submitCount } = useForm();

  const { value: email, errorMessage: eError, handleBlur: eBlur } = useField(
    "email",
    yup
      .string()
      .trim()
      .required()
      .email()
  );

  const { value: password, errorMessage: pError, handleBlur: pBlur } = useField(
    "password",
    yup
      .string()
      .trim()
      .required()
      .min(PASSWORD_MIN_LENGTH)
  );

  const isTooManyAttempts = computed(
    () => submitCount.value >= SUBMIT_COUNT_TRIES
  );

  watch(isTooManyAttempts, (val) => {
    if (val) {
      setTimeout(() => (submitCount.value = 0), 1500);
    }
  });

  const onSubmit = handleSubmit(async (values) => {
    console.log("Form:", values);
    await store.dispatch("auth/login", values);
    router.push("/");
  });

  const onRegister = handleSubmit(async (values) => {
    console.log("Form:", values);
    await store.dispatch("auth/register", values);
    router.push("/");
  });

  return {
    email,
    password,
    pError,
    eError,
    eBlur,
    pBlur,
    onSubmit,
    isSubmitting,
    submitCount,
    isTooManyAttempts,
    onRegister,
  };
}
