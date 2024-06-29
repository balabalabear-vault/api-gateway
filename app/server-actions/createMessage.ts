'use server'
import chalk from 'chalk';
import { z } from 'zod';
import { TInputs } from '../components/EndingSection/ContactMeForm';
import { EMAIL_REGEX } from '../constants/regex';
import { INVALID_EMAIL, ERROR, MESSAGE_SENT } from '../constants/text';

const error = chalk.bold.red;

export type TResponse = {
    side?: 'server' | 'client'
    status: number,
    message: string,
    error: string | { [key: string]: string[] }
  }

const createErrorMessage = (field: string) => ({
    invalid_type_error: `Invalid ${field}`
})

export async function createMessage(formData: TInputs): Promise<TResponse>{
    const MessageSchema = z.object({
        firstName: z.string(createErrorMessage('firstName')).min(1),
        lastName: z.string(createErrorMessage('lastName')).min(1),
        email: z.string(createErrorMessage('email')).regex(EMAIL_REGEX, { message: INVALID_EMAIL }),
        subject: z.string(createErrorMessage('subject')).min(1),
        message: z.string(createErrorMessage('message')).min(1),
      });
    try {
        const validation = MessageSchema.safeParse(formData);
        if(!validation.success) {
            throw { side: 'client', error: validation.error.flatten().fieldErrors };
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
        return ({ message: MESSAGE_SENT, error: '', status: 201 });
    } catch (e: any) {
        console.error(error(require('util').inspect(e, {colors:true, depth:null})));
        switch(e.side) {
            case 'client': return { ...e, message: '', status: 400 };
            default: return ({ side: 'server', error: ERROR, message: '', status: 500 });
        }
    }
}