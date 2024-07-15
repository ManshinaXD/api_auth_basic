import db from '../dist/db/models/index.js';

const isValidUserById = async (req, res, next) => {
    const id = req.params.id;
    const response = db.User.findOne({
        where: {
            id: id,
            status: true,
        }
    });
    if (!response) {
        return res.status(404).json({
            message: 'User not found'
        });
    }
    next();
};

const reqIsValid = async (req, res, next) => {


    let verStatus = null
    let verFechaB = null
    let verFechaA = null
    if (req.query.status) {
      verStatus = req.query.status.toLowerCase()
    }
    if (req.query.logBefore) {
      verFechaB = req.query.logBefore
    }
    if (req.query.logAfter) {
      verFechaA = req.query.logAfter
    }
    const rex = /^(\d{4})(-)(0?[1-9]|1[0-2])\2(3[01]|[12][0-9]|0?[1-9])$/
  
    if (verStatus !== null) {
      if (verStatus !== 'true' && verStatus !== 'false') {
        return res.status(400).json({
          message: 'True or False expected'
        });
      }
    }
    if (verFechaB !== null) {
      if (!verFechaB.match(rex)) {
        return res.status(400).json({
          message: 'Format date expected: YYYY-MM-DD'
        });
      }
    }
    if (verFechaA !== null) {
      if (!verFechaA.match(rex)) {
        return res.status(400).json({
          message: 'Format date expected: YYYY-MM-DD'
        });
      }
    }
    next()
  }

const hasPermissions = async (req, res, next) => {
    const token = req.headers.token;
    const payload = JSON.parse(Buffer.from(token, 'base64').toString('ascii'));
    if(!payload.roles.includes('admin')){
        if(payload.id !== +req.params.id){
            return res.status(401).json({
                message: 'Unauthorized'
            });
        }
    }
    next();
}

export default {
    isValidUserById,
    hasPermissions,
    reqIsValid
};