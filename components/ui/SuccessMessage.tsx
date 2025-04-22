
export const SuccessMessage = ({ children }: { children: React.ReactNode }) => {
    return (
        <p 
            className=" text-center my-4 bg-purple-700 py-1 rounded-lg text-purple-100 font-bold text-lg uppercase"
        >
            {children}
        </p>
    )
}
