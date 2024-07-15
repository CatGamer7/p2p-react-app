import useAuthFetch from "./authFetch"

const usePostFilters = () => {
    const authFetch = useAuthFetch()
    
    return (url, filterList) => {

        return authFetch(
            url, 
            {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(filterList)
            })
    }
}

export default usePostFilters