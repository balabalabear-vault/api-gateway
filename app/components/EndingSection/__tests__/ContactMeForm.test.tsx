import { render, screen } from '@testing-library/react'
import ContactMeForm from '../ContactMeForm'
import { expect, describe, it, beforeAll } from '@jest/globals';

describe('ContactMeForm', () => {

  describe('all components are poperly rendered in intial rendering', () => {
    beforeAll(() => {
      render(<ContactMeForm />);
    })

    it('checks firstName input', () => {
      const inputNode = screen.getByLabelText("First Name");
      expect(inputNode).toBeInTheDocument();
    });

    it('checks lastName input', () => {
      const inputNode = screen.getByLabelText("Last Name");
      expect(inputNode).toBeInTheDocument();
    });

    it('checks Email input', () => {
      const inputNode = screen.getByLabelText("Email");
      expect(inputNode).toBeInTheDocument();
    });

    it('checks Subject input', () => {
      const inputNode = screen.getByLabelText("Subject");
      expect(inputNode).toBeInTheDocument();
    });
    
    it('checks Message input', () => {
      const inputNode = screen.getByLabelText("Message");
      expect(inputNode).toBeInTheDocument();
    });
  });
});