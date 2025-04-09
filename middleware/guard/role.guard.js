
module.exports = (allowRole)=>{
  return (req, res, next)=>{
      const user = req.user

      if(!user){
          return res.status(403).send({ message: "Unathorixed" });
      }
      if(!allowRole.includes(user.role)){
        return res.status(403).send({ message: "Unathorixed" });
      }
      next()
  }
}