import { store } from "../Store"

export const fetchData = async (url, option = {}) => {
    const token = store.getState()?.auth?.token
    const header = {
        ...(token && { authorization: `Bearer ${token}` })
    }
    const finalOption = {
        ...option,
        headers: {
            'Content-type': 'application/json',
            ...header,
            ...option.headers
        }
    }

    try {
        console.log(`${import.meta.env.VITE_BASE_API}${url}`)
        const result = await fetch(`${import.meta.env.VITE_BASE_API}${url}`, finalOption)
        console.log(result)
        const data = await result.json()
        return data
    } catch (error) {
        console.log(error)

    }
}







export const fetchUpload = async (url, option = {}) => {
    const token = store.getState()?.auth?.token
    const headers = {
        ...(token && { authorization: `Bearer ${token}` })
    }
    const finalOption = {
        ...option,
        headers: {
            ...headers,
            ...option.headers
        }
    }
    console.log(finalOption)
    try {
        const result = await fetch(`${import.meta.env.VITE_BASE_API}${url}`, finalOption)
        const data = await result.json()
        return data

    } catch (error) {
        return {
            success: false,
            status: false,
            message: "ارتباط با سرور برقرار نشد",
        };
    }
}

