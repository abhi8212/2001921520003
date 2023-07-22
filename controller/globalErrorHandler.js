const globalErrorHandler=(error,req,res,next)=>{
    error.statusCode ??=500;
    error.message??="Internal server error";
    res.status(error.statusCode).json({success:false,error:error.message});
}
module.exports=globalErrorHandler;