export default function PrimaryButton({
    className = "",
    disabled,
    children,
    ...props
}) {
    return (
        <button
            {...props}
            className={`
                inline-flex items-center justify-center rounded-lg border border-transparent 
                bg-gradient-to-r from-blue-600 to-indigo-600 px-5 py-2.5 text-sm font-bold uppercase 
                tracking-widest text-white shadow-md transition-all duration-300 
                hover:from-indigo-600 hover:to-purple-600 hover:shadow-blue-500/50 
                focus:outline-none focus:ring-4 focus:ring-blue-500/50 
                active:scale-95
                ${disabled ? "opacity-50 cursor-not-allowed" : ""}
                ${className}
            `}
            disabled={disabled}
        >
            {children}
        </button>
    );
}
