module.exports = {
    toJson: (context, result) =>{
        context.res = { 
            body: result,
            headers: { "Content-Type": "application/json" }
          }
    },
    formatPath: (path)=>{
        if(path.title && path.description){
            return {
                "title": path.title,
                "description": path.description,
                "items": [],
                "createdAt":new Date()
            }
        }
        return false;
    }
}