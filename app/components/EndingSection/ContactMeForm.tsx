"use client"

import {Input} from "@nextui-org/input";
import {Textarea} from "@nextui-org/input";
import { Button } from "@nextui-org/react";
import { useReducer } from "react";
import { SubmitHandler, useForm } from "react-hook-form";

type TInputs = {
  firstName: string
  lastName: string
  email: string
  subject: string
  message: string
}

function reducer(state: TInputs, action: {type: string, value: string}): TInputs {
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

export default function ContactMeForm() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<TInputs>();

  const [state, dispatch] = useReducer(reducer, {
    firstName: '',
    lastName: '',
    email: '',
    subject: '',
    message: '',
  });

  const onSubmit: SubmitHandler<TInputs> = (data) => console.log('xd', data);

  return (
      <form className="w-full">
        <div className="flex flex-row my-1">
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
            // variant="bordered"
            className="w-6/12 mr-1"
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
            // variant="bordered"
            className="w-6/12 ml-1"
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
          // variant="bordered"
          className="w-full my-1"
          isInvalid={!!errors.email}
          errorMessage={errors.email?.message}
          {...register("email", {
            required: true,
            pattern: {
              value: /\S+@\S+\.\S+/,
              message: "Entered value does not match email format",
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
          // variant="bordered"
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
        <Button title="Send" className="w-full my-2" onClick={handleSubmit(onSubmit)}>Send</Button>
      </form>
  )
}
