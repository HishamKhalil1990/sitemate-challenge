const axiosInstance = require("./axios");

const createIssue = async (data) => {
    try{
        const response = await axiosInstance.post(`/issues`, data);
        return response.data
    }catch(err){
        console.log({
            status:'failed',
            errors:'Creating error'
        })
        throw err
    }
};

const getIssue = async (id) => {
    try{
        let url = '/issues'
        if(id){
            url += `?id=${id}`
        }
        const response = await axiosInstance.get(url);
        return response.data;
    }catch(err){
        console.log({
            status:'failed',
            errors:'Feteching error'
        })
        throw err
    }
};

const deleteIssue = async (id) => {
    try{
        const response = await axiosInstance.delete(`/issues/${id}`);
        return response.data
    }catch(err){
        console.log({
            status:'failed',
            errors:'Deleting error'
        })
        throw err
    }
};

const updateIssue = async (id, data) => {
    try{
        const response = await axiosInstance.put(`/issues/${id}`, data);
        return response.data
    }catch(err){
        console.log({
            status:'failed',
            errors:'Updating error'
        })
        throw err
    }
};

module.exports = {
    createIssue,
    getIssue,
    deleteIssue,
    updateIssue
}
