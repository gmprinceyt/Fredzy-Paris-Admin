const ErrorMessage = ({ErrorMessage="Something went wrong!"}: {ErrorMessage: string})=> {
    return (
        <div className="flex items-center justify-center w-full h-screen ">
            <span className="text-xl px-3 py-1 border border-red-500 bg-red-900 rounded-md animate-accordion-down">
            {ErrorMessage}
            </span>
        </div>
    );
};

export  default ErrorMessage;