"use client"

import { EMAIL_REGEX } from "@/app/constants/regex";
import { INVALID_EMAIL } from "@/app/constants/text";
import { TResponse } from "@/app/server-actions/createMessage";
import Check from "@/app/ui/icons/Check";
import { Input } from "@nextui-org/input";
import { Textarea } from "@nextui-org/input";
import { Button } from "@nextui-org/react";
import { useReducer, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";

export type TInputs = {
  firstName: string
  lastName: string
  email: string
  subject: string
  message: string
}

function reducer(state: TInputs, action: { type: string, value: string }): TInputs {
  switch (action.type) {
    case 'change_firstName': {
      return ({
        ...state,
        firstName: action.value
      })
    }
    case 'change_lastName': {
      return ({
        ...state,
        lastName: action.value
      })
    }
    case 'change_email': {
      return ({
        ...state,
        email: action.value
      })
    }
    case 'change_subject': {
      return ({
        ...state,
        subject: action.value
      })
    }
    case 'change_message': {
      return ({
        ...state,
        message: action.value
      })
    }
    default: {
      return state
    }
  }
}

export default function ContactMeForm({
  createMessage,
}: {
  createMessage: (formData: TInputs) => Promise<TResponse>,
}) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<TInputs>({
    mode: "onBlur",
  });

  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const [state, dispatch] = useReducer(reducer, {
    firstName: '',
    lastName: '',
    email: '',
    subject: '',
    message: '',
  });

  const onSubmit: SubmitHandler<TInputs> = async (data) => {
    setIsLoading(true);
    const res: TResponse = await createMessage(data);
    switch(res.status) {
      case 400: {
        if(res.error && typeof res.error === "object") {
          Object.entries(res.error).forEach(([k, v]) => {
            if(v.length) {
              setError(k as keyof TInputs, { type: 'custom', message: v.join('\n') })
            }
          })
        }
        return;
      }
      case 201: {
        setIsSuccess(true);
        return;
      }
    }
    setIsLoading(false);
  }

  return (
    <form
      aria-label="contact-me-form"
      className="w-full"
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className="sm:flex sm:flex-row">
        <Input
          isRequired
          label="First Name"
          size="sm"
          color={errors.firstName ? "danger" : "default"}
          value={state.firstName}
          onValueChange={(value) => dispatch({
            type: 'change_firstName',
            value
          })}
          className="w-full my-1 sm:my-0 sm:w-6/12 sm:mr-1"
          {...register("firstName", { required: true })}
        />
        <Input
          isRequired
          label="Last Name"
          size="sm"
          color={errors.lastName ? "danger" : "default"}
          value={state.lastName}
          onValueChange={(value) => dispatch({
            type: 'change_lastName',
            value
          })}
          className="w-full my-1 sm:my-0 sm:w-6/12 sm:ml-1"
          {...register("lastName", { required: true })}
        />
      </div>
      <Input
        isRequired
        type="email"
        label="Email"
        size="sm"
        color={errors.email ? "danger" : "default"}
        value={state.email}
        onValueChange={(value) => dispatch({
          type: 'change_email',
          value
        })}
        className="w-full my-1"
        isInvalid={!!errors.email}
        errorMessage={errors.email && errors.email.message}
        {...register("email", {
          required: "Please enter your email address",
          pattern: {
            value: EMAIL_REGEX,
            message: INVALID_EMAIL,
          },
        })}
      />
      <Input
        isRequired
        label="Subject"
        size="sm"
        color={errors.subject ? "danger" : "default"}
        value={state.subject}
        onValueChange={(value) => dispatch({
          type: 'change_subject',
          value
        })}
        className="w-full my-1"
        {...register("subject", { required: true })}
      />

      <Textarea
        isRequired
        label="Message"
        minRows={10}
        color={errors.message ? "danger" : "default"}
        placeholder="Enter something here..."
        value={state.message}
        onValueChange={(value) => dispatch({
          type: 'change_message',
          value
        })}
        {...register("message", { required: true })}
      />
      <Button
        title="Send"
        className="w-full my-2"
        type="submit"
        color={isSuccess && "success" || isLoading && "default" || "secondary"}
        startContent={isSuccess && <Check />}
        disabled={isSuccess || Object.keys(errors).length > 0}
      >
        { isSuccess && 'Message Sent' || isLoading && "Sending Message" || "Send" }
      </Button>
    </form>
  )
}
