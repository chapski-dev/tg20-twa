import React from 'react'
import { ToastContentProps, ToastOptions, toast } from 'react-toastify'
import * as S from './Toast.style'

type CustomToastProps = ToastContentProps<{
  title: string;
  message?: string;
}>;

const CustomToast = (props: CustomToastProps) => {
  const { title, message } = props.data;
  return (
    <>
      <S.Title children={title} />
      <S.Message children={message} />
    </>
  )
}

type UtilProps = ToastOptions<unknown> & {
  title: string;
  message?: string;
}
export const showError = (props: UtilProps) => toast.error(CustomToast, {
  ...props,
  data: { title: props.title, message: props.message }
});

export const showSuccess = (props: UtilProps) => toast.success(CustomToast, {
  ...props,
  data: { title: props.title, message: props.message }
});