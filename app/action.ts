'use server'
import chalk from 'chalk';
import { z } from 'zod';
import { TInputs } from './components/EndingSection/ContactMeForm';

const error = chalk.bold.red;

const createErrorMessage = (field: string) => ({
    invalid_type_error: `Invalid ${field}`
})

export async function createMessage(formData: TInputs): Promise<{
    status: number,
    message?: string,
    errors?: string | {}
}>{
    const MessageSchema = z.object({
        firstName: z.string(createErrorMessage('firstName')),
        lastName: z.string(createErrorMessage('lastName')),
        email: z.string(createErrorMessage('email')),
        subject: z.string(createErrorMessage('subject')),
        message: z.string(createErrorMessage('message'))
      });
    try {
        const validation = MessageSchema.safeParse(formData);
        if(!validation.success) {
            throw { side: 'Clients', errors: validation.error.flatten().fieldErrors };
        }
        
        const res = await fetch('https://api.balabalabear.com/contacts', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData)
        });
        if(res.status >= 400) {
            const data = await res.json();
            throw { side: 'Server', errors: data };
        }
        return ({ message: 'Message sent successfully', status: 201 });
    } catch (e: any) {
        console.error(error(require('util').inspect(e, {colors:true, depth:null})));
        switch(e.side) {
            case 'Clients': return { ...e, status: 400 };
            default: return ({ errors: 'Error processing request', status: 500 });
        }
    }
}