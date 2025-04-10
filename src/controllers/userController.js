
exports.setprofilePic =(req,res,next)=>{
    console.log(req.body);

    res.status(200).json({data:req.body});
}