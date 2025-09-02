// types/vercel.d.ts
import type { IncomingMessage, ServerResponse } from 'http'

export interface VercelRequest extends IncomingMessage {
    query: { [key: string]: string }
    cookies: { [key: string]: string }
}

export interface VercelResponse extends ServerResponse {
    status: (code: number) => VercelResponse
    json: (body: any) => void
    send: (body: string) => void
}
