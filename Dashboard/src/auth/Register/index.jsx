import React, { useEffect, useRef } from 'react'
import { Anim_Deep } from '../../Utils/deep_anim'
import { Link, useNavigate } from 'react-router-dom'
import { fetchData } from '../../Utils/fetchData'
import useFormFields from '../../Hook/useFormFields'
import Notify from '../../Utils/Notify'
import { useDispatch } from 'react-redux'
import { addToken } from '../../Store/Slice/auth'
export default function Register() {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [fields, handleChange, setFields] = useFormFields({
        fullName: null,
        username: null,
        password: null
    })
    const el = useRef()
    useEffect(() => {
        Anim_Deep(el.current)
    }, [el])
    const handleSubmit = (async (e) => {
        e.preventDefault()
        const result = await fetchData('/auth/bootstrap', {
            body: JSON.stringify(fields),
            method: 'POST'
        })
        console.log(result)
        if (result.success) {
            Notify('success', 'Register Successfully')
            dispatch(addToken(result.data))
            navigate("/")
            setFields(null)
        } else {
            Notify('error', 'Failed Register')
            setFields(null)
        }
    })

    return (
        <div className=' cursor-pointer overflow-hidden w-full h-screen bg-[url("./bg_auth.png")] bg-center bg-cover flex flex-col justify-evenly items-center transform-3d perspective-dramatic'>
            <h1 className='text-4xl text-green-400 text-shadow-[#00ff5599] text-shadow-lg tracking-widest'>Register</h1>
            <form
                onSubmit={handleSubmit}
                ref={el}
                className='w-7/12 h-9/12 rounded-2xl border-2 bg-white/10 border-green-700 backdrop-blur-md shadow-[0_0_30px_rgba(34,197,94,0.25)]
    flex flex-col items-center justify-around'
            >
                <label className='w-8/12 flex flex-col gap-5 text-xl text-green-300'>
                    <span>اسم کامل :</span>

                    <input
                        name='fullName'
                        onChange={e => handleChange(e)}
                        className='w-full h-14 px-5 rounded-xl bg-black/20 border border-green-700/70 text-green-100 placeholder:text-green-300/50 outline-none transition-all duration-300 focus:border-green-400 focus:shadow-[0_0_20px_rgba(34,197,94,0.25)] focus:bg-black/30'
                        type="text"
                        placeholder='نام کامل'
                    />
                </label>

                <label className='w-8/12 flex flex-col gap-5 text-xl text-green-300'>
                    <span>نام کاربری :</span>

                    <input
                        name='username'
                        onChange={e => handleChange(e)}
                        className='w-full h-14 px-5 rounded-xl bg-black/20 border border-green-700/70 text-green-100 placeholder:text-green-300/50 outline-none transition-all duration-300 focus:border-green-400 focus:shadow-[0_0_20px_rgba(34,197,94,0.25)] focus:bg-black/30'
                        type="text"
                        placeholder='نام کاربری'
                    />
                </label>

                <label className='w-8/12 flex flex-col gap-5 text-xl text-green-300'>
                    <span>رمز عبور :</span>

                    <input
                        name='password'
                        onChange={e => handleChange(e)}
                        className='w-full h-14 px-5 rounded-xl bg-black/20 border border-green-700/70 text-green-100 placeholder:text-green-300/50 outline-none transition-all duration-300 focus:border-green-400 focus:shadow-[0_0_20px_rgba(34,197,94,0.25)] focus:bg-black/30'
                        type="password"
                        placeholder='رمز عبور'
                    />
                </label>
                
                <button
                    type='submit'
                    className='cursor-pointer w-8/12 h-14 rounded-xl border border-green-500 bg-green-500/10 text-green-300 text-xl hover:bg-green-500/20 hover:text-green-200 hover:shadow-[0_0_25px_rgba(34,197,94,0.3)] transition-all duration-300'
                >
                    ثبت نام
                </button>
                <p onClick={() => navigate("/auth")} className='text-2xl text-green-300 hover:text-shadow-[#00ff5540] text-shadow-lg transition-all duration-300'>

                    قبلا ثبت نام کردید ؟
                </p>

            </form>
        </div>
    )
}
