export const Button = ({ className = "", size = "default", children, ...props }) => {
    const baseClasses = "relative overflow-hidden rounded-full"

    const classes = baseClasses;
    return <button className={classes}>
        <span className="relative flex items-center justify-center gap-2">
            {children}
        </span>
    </button>
}