export default function getContext(context, properties){
    if(properties === "*"){
        return context;
    }
    let contextProps = {};
    
    properties.forEach(prop => {
        contextProps[prop] = context[prop]
    })

    return contextProps
    
}



