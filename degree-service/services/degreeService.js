import Degree from '../models/degreeModel.js';

const findDegreeById = (degreeId) => {
    return Degree.findOne({ degreeId });
};

const createDegree = (degreeId,title,major) =>{
      return Degree.create({degreeId,title,major});
}

export {
      findDegreeById,
      createDegree,
}
