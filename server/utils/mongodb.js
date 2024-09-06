const IssueModel = require('../models/issueModel');

const createNew = async(data) => {
    const newIssue = new IssueModel({
        title: data.title,
        description: data.description
    });
    return await newIssue.save();
}

const updateByID = async(id,data) => {
    return await IssueModel.findByIdAndUpdate(id, data, { new: true });
}

const deleteByID = async(id) => {
    return await IssueModel.findByIdAndDelete(id);;
}

const findAll = async (id) => {
    if (id) {
      return await IssueModel.findById(id);
    } else {
      return await IssueModel.find();
    }
  };

module.exports = {
    createNew,
    updateByID,
    deleteByID,
    findAll
}