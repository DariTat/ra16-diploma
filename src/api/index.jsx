
const url = ' http://localhost:7070/api';

export const getHitList = async () => {
    const response = await fetch(`${url}/top-sales`);
    if (!response.ok) {
        throw new Error(response.statusText);
    }
    return await response.json();
}

export const getCategoriesList = async () => {
    const response = await fetch(`${url}/categories`);
    if (!response.ok) {
        throw new Error(response.statusText);
    }
    return await response.json();
}

export const getCatalogList = async () => {
    const response = await fetch(`${url}/items`);
    
    if (!response.ok) {
        throw new Error(response.statusText);
    }
    return await response.json();
}

export const getCatalog = async (id) => {
    const response = await fetch(`${url}/items?categoryId=${id}`);
    if (!response.ok) {
        throw new Error(response.statusText);
    }
    return await response.json();
}

export const getMoreItems = async (id) => {
    const response = await fetch(`${url}/items?categoryId=${id}&offset=6`);
    if (!response.ok) {
        throw new Error(response.statusText);
    }
    return await response.json();
}

export const searchItems = async (value) => {
    const response = await fetch(`${url}/items?q=${value}`);
    if (!response.ok) {
        throw new Error(response.statusText);
    }
    return await response.json();
}

export const getItem = async (id) => {
    const response = await fetch(`${url}/items/${id}`);
    if (!response.ok) {
        throw new Error(response.statusText);
    }
    return await response.json();
}
export const sendOrder = async (order) => {
    try { 
        const response =  fetch(`${url}/order`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(order)
        });
        if ((await response).ok) {
            return (await response).ok;
        } else {
            return (await response).statusText;
        }
        
    } catch (error) {
        console.log('Failed to send request:', error);
    }
    
   
}