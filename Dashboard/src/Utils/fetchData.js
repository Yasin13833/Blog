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
    console.log(finalOption)
    try {
        const result = await fetch(`${import.meta.env.BASE_URL}${url}`, finalOption)
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
        const result = await fetch(`${import.meta.env.BASE_URL}${url}`, finalOption)
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

