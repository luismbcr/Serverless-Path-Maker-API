module.exports = {
    toJson: (context, result) =>{
        console.log('in');
        context.res = { 
            body: result,
            headers: { "Content-Type": "application/json" }
          }
    }
}