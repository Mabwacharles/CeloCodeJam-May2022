import { useEffect } from 'react'
import { notificationStore } from '../store'

export const Alert = ({ type, message }) => {

    const setShowNotification = notificationStore(state => state.setShowNotification)

    useEffect(() => {
        hideAlert()
    }, [])
    const hideAlert = () => {
        setTimeout(() => {
            setShowNotification(false);

        }, 5000)
        console.log(notificationColor)
    }

    const notificationColor = {
        success: {
            bg: "bg-green-100",
            text: 'text-green-700'
        },
        error: {
            bg: "bg-red-100",
            text: 'text-red-700'
        },
        info: {
            bg: "bg-yellow-100",
            text: 'text-yellow-700'
        },
    }
    return (
        <div className={`absolute mt-20 flex ${notificationColor[type]?.bg} rounded-lg p-4 mb-4 text-sm ${notificationColor[type]?.text}" role="alert z-50 shadow-xl`}>
            <svg className={`w-5 h-5 inline mr-3 ${notificationColor[type]?.text}`} fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd"></path></svg>
            <div className={`${notificationColor[type]?.text}`}>
                {message}
            </div>
        </div>
    )
}