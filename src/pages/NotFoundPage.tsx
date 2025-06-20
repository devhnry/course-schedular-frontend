import {useNavigate} from "react-router-dom";
import {FC} from "react";

const NotFound: FC = () => {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen flex items-center justify-center bg-white px-6">
            <div className="max-w-xl w-full text-center">
                <h1 className="text-[72px] font-bold text-black mb-2">404</h1>
                <h2 className="text-2xl font-semibold text-gray-800 mb-4">Page Not Found</h2>
                <p className="text-gray-600 mb-8">
                    Oops. The page you’re looking for doesn’t exist or has been moved.
                </p>

                <div className="flex flex-col sm:flex-row justify-center gap-4">
                    <button
                        onClick={() => navigate(-1)}
                        className="border cursor-pointer border-gray-800 text-black px-4 py-2 rounded-md font-medium hover:bg-black hover:text-white transition"
                    >
                        Go Back
                    </button>
                    <button
                        onClick={() => navigate("/")}
                        className="bg-black cursor-pointer text-white px-4 py-2 rounded-md font-medium hover:scale-105 transition"
                    >
                        Go to Home
                    </button>
                </div>
            </div>
        </div>
    );
};

export default NotFound;
