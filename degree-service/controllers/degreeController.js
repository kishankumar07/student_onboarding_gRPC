import { findDegreeById,createDegree } from '../services/degreeService.js';

 const findDegree = (call, callback) => {
    findDegreeById(call.request.id)
        .then(degree => {
            if (degree) {
                callback(null, degree);
            } else {
                callback({
                    message: 'Degree not found',
                    code: grpc.status.NOT_FOUND
                });
            }
        })
        .catch(err => {
            callback({
                message: 'Error retrieving degree from database',
                code: grpc.status.INTERNAL,
                details: err.message
            });
        });
};


 const createTheDegree = (call, callback) => {
  const { degreeId, title, major } = call.request;
  createDegree(degreeId, title, major)
    .then(degree => {
      callback(null, degree);
    })
    .catch(err => {
      callback({
        message: 'Error adding degree',
        code: grpc.status.INTERNAL,
        details: err.message
      });
    });
};

export { 
  findDegree,
  createTheDegree
}
