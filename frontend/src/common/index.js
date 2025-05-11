

const backendDomain = 'http://localhost:8080/api'

const SummaryApi = {
    signUp: {
        url: `${backendDomain}/sign-up`,
        method: 'post'
    },
    logIn: {
        url: `${backendDomain}/login`,
        method: 'post'
    },
    userDetails: {
        url: `${backendDomain}/user-details`,
        method: 'get'
    },
    logOut: {
        url: `${backendDomain}/logout`,
        method: 'get'
    },
    getAdmin: {
        url: `${backendDomain}/admin`,
        method: 'get'
    },
    getAllUser: {
        url: `${backendDomain}/admin/users`,
        method: 'get'
    },
    updateRoleUser: {
        url: `${backendDomain}/admin/update-role-user`,
        method: 'post'
    },
    addProduct: {
        url: `${backendDomain}/add-product`,
        method: 'post'
    },
    allProduct: {
        url: `${backendDomain}/all-product`,
        method: 'get'
    },
    updateQuantityProduct: {
        url: `${backendDomain}/update-quantity-product`,
        method: 'post'
    },
    getProductsBestSelling: {
        url: `${backendDomain}/all-product-best-selling`,
        method: 'get'
    },
    getProductsById: {
        url: `${backendDomain}/product-details/:id`,
        method: 'post'
    },
    getProductsByManyId: {
        url: `${backendDomain}/products-many-id`,
        method: 'post'
    },
    setPromotion: {
        url: `${backendDomain}/setPromotion`,
        method: 'post'
    },
    getProductSelected: {
        url: `${backendDomain}/getProductSelected`,
        method: 'post'
    },
    searchProduct: {
        url: `${backendDomain}/search-product`,
        method: 'post'
    },
    addToCart: {
        url: `${backendDomain}/add-to-cart`,
        method: 'post'
    },
    countProductInCart: {
        url: `${backendDomain}/count-product-in-cart`,
        method: 'get'
    },
    getCart: {
        url: `${backendDomain}/get-cart`,
        method: 'get'
    },
    updateQuantity: {
        url: `${backendDomain}/update-quantity-cart`,
        method: 'post'
    },
    removeProductCart: {
        url: `${backendDomain}/remove-product-cart`,
        method: 'post'
    },
    updateProduct: {
        url: `${backendDomain}/update-product`,
        method: 'post'
    },
    order: {
        url: `${backendDomain}/order`,
        method: 'post'
    },
    allOrder: {
        url: `${backendDomain}/all-order`,
        method: 'get'
    },
    setStatusOrder: {
        url: `${backendDomain}/status-order`,
        method: 'post'
    },
}

export default SummaryApi