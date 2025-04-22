
export const ErrorMessage = ({children}: {children: React.ReactNode}) => {
    return (
        <p className=" text-center my-4 bg-red-700 py-1 rounded-lg text-red-100 font-bold text-lg uppercase">{ children }</p>
    )
}
