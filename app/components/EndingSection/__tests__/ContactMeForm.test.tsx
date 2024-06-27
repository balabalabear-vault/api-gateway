import { act, createEvent, fireEvent, render, screen, waitFor, waitForElementToBeRemoved } from '@testing-library/react'
import { userEvent } from '@testing-library/user-event'
import ContactMeForm from '../ContactMeForm'
import { expect, describe, it, beforeAll } from '@jest/globals';

describe('ContactMeForm', () => {
  const inputs = {
    firstName: {
      labelText: "First Name",
      value: "Jack",
    },
    lastName: {
      labelText: "Last Name",
      value: "Kwok",
    },
    email: {
      labelText: "Email",
      value: "kuenyuikwok1106@outlook.com",
    },
    subject: {
      labelText: "Subject",
      value: "Wants to know more about you",
    },
    message: {
      labelText: "Message",
      value: "random text appearing here",
    }
  };

  const mockSuccessCreateMessage = jest.fn((val) => {
    return Promise.resolve({ message: 'Message sent successfully', status: 201 });
  });

  describe('all components are properly rendered in initial rendering.', () => {
    beforeEach(() => {
      render(<ContactMeForm createMessage={mockSuccessCreateMessage} />);
    })

    it('checks firstName input', () => {
      const inputNode = screen.getByLabelText(inputs.firstName.labelText);
      expect(inputNode).toBeVisible();
      expect(inputNode).toBeRequired();
    });

    it('checks lastName input', () => {
      const inputNode = screen.getByLabelText(inputs.lastName.labelText);
      expect(inputNode).toBeVisible();
      expect(inputNode).toBeRequired();
    });

    it('checks Email input', () => {
      const inputNode = screen.getByLabelText(inputs.email.labelText);
      expect(inputNode).toBeVisible();
      expect(inputNode).toBeRequired();
    });

    it('checks Subject input', () => {
      const inputNode = screen.getByLabelText(inputs.subject.labelText);
      expect(inputNode).toBeVisible();
      expect(inputNode).toBeRequired();
    });

    it('checks Message input', () => {
      const inputNode = screen.getByLabelText(inputs.message.labelText);
      expect(inputNode).toBeVisible();
      expect(inputNode).toBeRequired();
    });

    it('checks Send Button', () => {
      const sendButton = screen.getByRole("button", { name: "Send" });
      expect(sendButton).toBeVisible();
      expect(sendButton).toBeEnabled();
    });
  });

  describe('all components behave properly when passed with input.', () => {
    beforeEach(() => {
      render(<ContactMeForm createMessage={mockSuccessCreateMessage} />);
    })

    it('passes string to firstName', async () => {
      const { labelText, value } = inputs.firstName;
      const inputNode = screen.getByLabelText(labelText);
      await userEvent.type(inputNode, value)
      expect(inputNode).toHaveDisplayValue(value);
    });

    it('passes string to lastName', async () => {
      const { labelText, value } = inputs.lastName;
      const inputNode = screen.getByLabelText(labelText);
      await userEvent.type(inputNode, value)
      expect(inputNode).toHaveDisplayValue(value);
    });

    it('passes string to Email', async () => {
      const { labelText, value } = inputs.email;
      const inputNode = screen.getByLabelText(labelText);
      await userEvent.type(inputNode, value)
      expect(inputNode).toHaveDisplayValue(value);
    });

    it('passes string to Subject', async () => {
      const { labelText, value } = inputs.subject;
      const inputNode = screen.getByLabelText(labelText);
      await userEvent.type(inputNode, value)
      expect(inputNode).toHaveDisplayValue(value);
    });

    it('passes string to Message', async () => {
      const { labelText, value } = inputs.message;
      const inputNode = screen.getByLabelText(labelText);
      await userEvent.type(inputNode, value)
      expect(inputNode).toHaveDisplayValue(value);
    });

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
      for( const { labelText, value } of Object.values(inputs)) {
        await userEvent.type(screen.getByLabelText(labelText), value)
      };
      sendButton = screen.getByRole('button', { name: /send/i });
      form = screen.getByRole("form", { name: /contact-me-form/i });

      expect(sendButton).toBeInTheDocument();
      expect(form).toBeInTheDocument();
    })

    afterEach(() => {
      sendButton = null;
      form = null;
    })

    it('has all inputs with correct data form', async () => {
      expect(form).toHaveFormValues(dummyFormValue);
      fireEvent.submit(form as HTMLElement);
      
      // Loading State 
      waitFor(() => {
        expect(sendButton).toHaveTextContent(/sending message/i);
        expect(sendButton).toHaveClass("bg-default");
      })

      // Done !
      waitFor(() => {
        expect(sendButton).toHaveTextContent(/message sent/i);
        expect(sendButton).toHaveClass("bg-success");
        expect(screen.getByRole('img')).toBeInTheDocument();
        expect(mockSuccessCreateMessage).toHaveBeenCalledTimes(1);
        expect(mockSuccessCreateMessage).toHaveBeenCalledWith(dummyFormValue);
      })
    });
  });
});