
export const addProduct = (product) => {
    
    if(localStorage.length == 0) {
        let productList = [];
        productList.push(product)
        console.log(productList)
        localStorage.setItem('basket', JSON.stringify(productList));
        console.log(JSON.parse(localStorage.getItem('basket')))
        return
    }
    const productList = JSON.parse(localStorage.getItem('basket'));
    console.log(productList)
    const index = productList.findIndex(item => item.id === product.id && item.size === product.size);
    
    if (index !== -1) {
        productList[index].amount += Number(product.amount); 
    } else {
        productList.push(product);
    }
    localStorage.setItem('basket', JSON.stringify(productList));
    return productList;
}

export const getProduct = () => {
    return JSON.parse(localStorage.getItem('basket'));
}

export const deleteProduct = (idSize) => {
    let productList = JSON.parse(localStorage.getItem('basket'));
    productList = productList.filter(item => `${item.id}${item.size}` !== idSize);
    console.log(productList)
    localStorage.setItem('basket', JSON.stringify(productList));
    return productList;
}