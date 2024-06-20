export interface LoginActionResult{
    message?: string,
    error?: boolean
}

export const initialState: LoginActionResult = {
    error: false,
    message: ""
}