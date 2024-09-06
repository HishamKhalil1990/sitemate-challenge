import axiosInstance from "./axios";

export const createIssue = async (data) => {
    try{
        const response = await axiosInstance.post(`/issues`, data);
        return response.data
    }catch(err){
        return {
            status:'failed',
            errors:'Creating error'
        }
    }
};

export const getIssue = async (id) => {
    try{
        let url = '/issues'
        if(id){
            url += `?id=${id}`
        }
        const response = await axiosInstance.get(url);
        return response.data;
    }catch(err){
        return {
            status:'failed',
            errors:'Feteching error'
        }
    }
};

export const deleteIssue = async (id) => {
    try{
        const response = await axiosInstance.delete(`/issues/${id}`);
        return response.data
    }catch(err){
        return {
            status:'failed',
            errors:'Deleting error'
        }
    }
};

export const updateIssue = async (id, data) => {
    try{
        const response = await axiosInstance.put(`/issues/${id}`, data);
        return response.data
    }catch(err){
        return {
            status:'failed',
            errors:'Updating error'
        }
    }
};
