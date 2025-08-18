const ErrorMessage = ({ErrorMessage="Something went wrong!"}: {ErrorMessage: string})=> {
    return (
        <div className="flex items-center justify-center w-full h-screen ">
            <span className="text-xl px-5 py-1 border text-white border-red-500 bg-red-900 font-medium rounded-md animate-accordion-down">
            {ErrorMessage}
            </span>
        </div>
    );
};

export  default ErrorMessage;