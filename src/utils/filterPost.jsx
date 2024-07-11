const postFilters = (url, filterList) => {
    return fetch(
        url, 
        {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(filterList)
        })
    .then((res) => res.json())
}

export default postFilters