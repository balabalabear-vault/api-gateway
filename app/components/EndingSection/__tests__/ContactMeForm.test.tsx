import { act, cleanup, render, screen } from '@testing-library/react'
import { userEvent } from '@testing-library/user-event'
import ContactMeForm, { TInputs } from '../ContactMeForm'
import { expect, describe, it } from '@jest/globals';
import { INVALID_EMAIL } from '@/app/constants/text';

describe('ContactMeForm', () => {
  const inputs: { [key in keyof TInputs]: { name: RegExp; value: string, role: string } } = {
    firstName: {
      name: /first name/i,
      value: "Jack",
      role: 'textbox'
    },
    lastName: {
      name: /last name/i,
      value: "Kwok",
      role: 'textbox'
    },
    email: {
      name: /email/i,
      value: "kuenyuikwok1106@outlook.com",
      role: 'textbox'
    },
    subject: {
      name: /subject/i,
      value: "Wants to know more about you",
      role: 'textbox'
    },
    message: {
      name: /message/i,
      value: "random text appearing here",
      role: 'textbox'
    }
  };

  const mockSuccessCreateMessage = jest.fn(async (val) => {
    await new Promise((resolve, reject) => setTimeout(resolve, 500))
    return Promise.resolve({ message: 'Message sent successfully', status: 201 });
  });

  describe('all components are properly rendered in initial rendering.', () => {
    beforeEach(() => {
      render(<ContactMeForm createMessage={mockSuccessCreateMessage} />);
    })

    it('checks all inputs', () => {
      for(const {name, role} of Object.values(inputs)) {
        const inputNode = screen.getByRole(role, { name });
        expect(inputNode).toBeVisible();
        expect(inputNode).toBeRequired();
      }
    })

    it('checks Send Button', () => {
      const sendButton = screen.getByRole("button", { name: "Send" });
      expect(sendButton).toBeVisible();
      expect(sendButton).toBeEnabled();
    });

    it('checks form', () => {
      const form = screen.getByRole("form", { name: /contact-me-form/i });
      expect(form).toBeInTheDocument();
    });
  });

  describe('all components behave properly when passed with input.', () => {
    it('checks all inputs', async () => {
      render(<ContactMeForm createMessage={mockSuccessCreateMessage} />);
      for(const {name, role, value} of Object.values(inputs)) {
        const inputNode = screen.getByRole(role, { name });
        await userEvent.type(inputNode, value)
        expect(inputNode).toHaveDisplayValue(value);
        expect(inputNode).toHaveValue(value);
      }
    })
  });

  describe('interaction between components and Send button.', () => {
    const dummyFormValue = {
      firstName: "Jack",
      lastName: "Kwok",
      email: "kuenyuikwok1106@outlook.com",
      subject: "Wants to know more about you",
      message: "random text appearing here"
    };

    let sendButton: HTMLElement | null = null;
    let form: HTMLElement | null = null;

    beforeEach(async () => {
      render(<ContactMeForm createMessage={mockSuccessCreateMessage} />);
      sendButton = screen.getByRole('button', { name: /send/i });
      form = screen.getByRole("form", { name: /contact-me-form/i });
      for(const {name, role, value} of Object.values(inputs)) {
        const inputNode = screen.getByRole(role, { name });
        await userEvent.type(inputNode, value)
      }
      expect(sendButton).toBeInTheDocument();
      expect(form).toBeInTheDocument();
    })

    afterEach(async () => {
      sendButton = null;
      form = null;
      cleanup();
      jest.clearAllMocks();
    })

    it('has all inputs with correct data form', async () => {
      expect(form).toHaveFormValues(dummyFormValue);
      await userEvent.click(sendButton as HTMLElement);
      
      // Loading State 
      act(() => {
        const button = screen.getByRole("button", { name: /sending message/i });
        expect(button).toBeInTheDocument();
        expect(button).toHaveClass("bg-default");
      })

      // Done !
      const newButton = await screen.findByRole("button", { name: /message sent/i });
      expect(newButton).toBeInTheDocument();
      expect(newButton).toHaveClass("bg-success");
      expect(screen.getByTitle("check")).toBeInTheDocument();
      expect(mockSuccessCreateMessage).toHaveBeenCalledTimes(1);
      expect(mockSuccessCreateMessage).toHaveBeenCalledWith(dummyFormValue);
    });

    it('has all inputs with INCORRECT email', async () => {
      const incorrectInfo = {
        ...dummyFormValue,
        email: '12345',
      };
      const emailNode = screen.getByRole(inputs.email.role, { name: inputs.email.name });
      expect(emailNode).toBeInTheDocument();
      await userEvent.clear(emailNode);
      await userEvent.type(emailNode, `${incorrectInfo.email}[Tab]`);
      expect(emailNode).toHaveValue(incorrectInfo.email);
      expect(sendButton).toBeDisabled();
      await userEvent.click(sendButton as HTMLElement);

      act(() => {
        expect(mockSuccessCreateMessage).not.toBeCalled();
        expect(screen.queryByRole('button', { name: /sending message/i })).toBeNull();
        expect(screen.queryByRole('button', { name: /message sent/i })).toBeNull();
      })

      expect(emailNode).toHaveClass('!text-danger');
      expect(screen.getByText(INVALID_EMAIL)).toBeInTheDocument();
    });

    it('has all INCORRECT inputs but email', async () => {
      for(const [key, { name, role }] of Object.entries(inputs)) {
        if(key === "email") continue;
        const inputNode = screen.getByRole(role, { name });
        expect(inputNode).toBeInTheDocument();
        await userEvent.clear(inputNode);
        expect(inputNode).toHaveValue('');
      }
      expect(sendButton).toBeDisabled();
      await userEvent.click(sendButton as HTMLElement);

      act(() => {
        expect(mockSuccessCreateMessage).not.toBeCalled();
        expect(screen.queryByRole('button', { name: /sending message/i })).toBeNull();
        expect(screen.queryByRole('button', { name: /message sent/i })).toBeNull();
      })
      const firstNameNode = screen.getByRole(inputs.firstName.role, { name: inputs.firstName.name });
      const lastNameNode = screen.getByRole(inputs.lastName.role, { name: inputs.lastName.name });
      const subjectNode = screen.getByRole(inputs.subject.role, { name: inputs.subject.name });
      const messageNode = screen.getByRole(inputs.message.role, { name: inputs.message.name });
      expect(firstNameNode).toHaveClass('placeholder:text-danger');
      expect(lastNameNode).toHaveClass('placeholder:text-danger');
      expect(subjectNode).toHaveClass('placeholder:text-danger');
      expect(messageNode).toHaveClass('placeholder:text-danger');
    })
  });
});