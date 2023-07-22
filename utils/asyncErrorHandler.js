const customError=require("./customeError");
const asyncErrorHandler = (fun)=>{
    return (req,res,next)=>{
        fun(req,res,next).catch(err => next(new customError(err.message)));
    }
}

module.exports = asyncErrorHandler;