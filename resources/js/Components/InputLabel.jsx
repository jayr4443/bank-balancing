export default function InputLabel({
    value,
    className = "",
    children,
    ...props
}) {
    return (
        <label
            {...props}
            className={
                `block text-sm font-semibold text-white tracking-wide transition-all duration-300 
                hover:text-blue-400 hover:drop-shadow-glow ` + className
            }
        >
            {value ? value : children}
        </label>
    );
}
