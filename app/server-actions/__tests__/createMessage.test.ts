import fetchMock from 'jest-fetch-mock';
import { TInputs } from "@/app/components/EndingSection/ContactMeForm";
import { createMessage } from "../createMessage";
import { ERROR, INVALID_EMAIL, MESSAGE_SENT } from "@/app/constants/text";

describe('createMessage', () => {
    const inputs: { [key in keyof TInputs]: string } = {
        firstName: "Jack",
        lastName: "Kwok",
        email: "kuenyuikwok1106@outlook.com",
        subject: "Wants to know more about you",
        message: "random text appearing here"
    };

    beforeEach(() => {
        fetchMock.resetMocks();
    });

    it("receives improper input from FE, so return 400", async () => {
        fetchMock.enableMocks();
        const res = await createMessage({
            ...inputs,
            email: '',
            firstName: '',
        });
        expect(fetch).toHaveBeenCalledTimes(0);
        expect(res).toStrictEqual({
            status: 400,
            side: 'client',
            message: '',
            error: {
              firstName: [ 'String must contain at least 1 character(s)' ],
              email: [ INVALID_EMAIL ]
            }            
        })
    })

    it("receives proper input from FE and AWS, so return 201", async () => {
        fetchMock.enableMocks();
        fetchMock.mockResponseOnce(MESSAGE_SENT, { status: 201 })
        const res = await createMessage({...inputs});
        expect(fetch).toHaveBeenCalledTimes(1);
        expect(res).toEqual(expect.objectContaining({
            error: '',
            message: MESSAGE_SENT,
            status: 201
        }))
    })

    it("receives proper input from FE but throwing error from AWS side, so return 500", async () => {
        fetchMock.enableMocks();
        fetchMock.mockResponseOnce(MESSAGE_SENT, { status: 400 })
        const res = await createMessage({...inputs});
        expect(fetch).toHaveBeenCalledTimes(1);
        expect(res).toEqual(expect.objectContaining({
            side: 'server',
            message: '',
            error: ERROR,
            status: 500
        }))
    })

});