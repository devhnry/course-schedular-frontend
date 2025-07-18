import toast from "react-hot-toast"

const showSessionWarning = (): Promise<boolean> => {
    return new Promise((resolve) => {
        toast((t) => (
                <div>
                    <p>Your session will expire in 1 minute.</p>
                    <div className="mt-3 flex justify-between w-full gap-2">
                        <button onClick={() => {
                            toast.dismiss(t.id)
                            resolve(true)
                        }} className="bg-blue-500 text-white px-3 py-1.5 rounded-sm cursor-pointer">
                            Stay Logged In
                        </button>
                        <button onClick={() => {
                            toast.dismiss(t.id)
                            resolve(false)
                        }} className="bg-gray-300 px-3 py-1.5 rounded-sm cursor-pointer">
                            Logout
                        </button>
                    </div>
            </div> ),
        { duration: 60000, id: "session-warning" }) })
}

export default showSessionWarning
