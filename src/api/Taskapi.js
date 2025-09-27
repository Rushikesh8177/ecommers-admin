import axiosInstance from './api.js'

export const getAllcat = ()=> axiosInstance.get('/catagoris/getAllcatagoris')
export const createcat = (payload)=> axiosInstance.post('/catagoris/createCatagoris', payload)
export const getcatById = (id) => axiosInstance.get(`/catagoris/getcatagorisByID/${id}`);
export const updatecat = (id, payload) => axiosInstance.put(`/catagoris/updateCatagoris/${id}`, payload);
export const deletecat = (id) => axiosInstance.delete(`/catagoris/deleteCatagoris/${id}`);




export const getAllBrands = () => axiosInstance.get('/brand/getAllbrand');
export const createBrand = (data) => axiosInstance.post('/brand/createbrand', data);
export const getBrandById = (id) => axiosInstance.get(`/brand/getbrandByID/${id}`);
export const updateBrand = (id, data) => axiosInstance.put(`/brand/updatebrand/${id}`, data);
export const deleteBrand = (id) => axiosInstance.delete(`/brand/deletebrand/${id}`);


export const getAllproducts = () => axiosInstance.get('/product/getAllproducts');
// export const createBrand = (data) => axiosInstance.post('/brand/createbrand', data);
// export const getBrandById = (id) => axiosInstance.get(`/brand/getbrandByID/${id}`);
// export const updateBrand = (id, data) => axiosInstance.put(`/brand/updatebrand/${id}`, data);
 export const deleteProduct = (id) => axiosInstance.delete(`/product/deleteProduct/${id}`);
