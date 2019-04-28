module.exports = {
    toJson: (context, result) =>{
        context.res = { 
            body: result,
            headers: { "Content-Type": "application/json" }
          }
    },
    formatPath: (path, method = "")=>{
        if(path.title && path.description){
            const newPath ={
                "title": path.title,
                "description": path.description,
                "status":(path.status) ? path.status : 0,
                "items": (path.items) ? path.items : []
            }
            if (method === "POST"){
                newPath["createdAt"]= new Date();
            }
            return newPath;
        }
        return false;
    }
}