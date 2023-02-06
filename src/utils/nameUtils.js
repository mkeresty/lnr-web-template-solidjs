
export async function nameLookup(address){
    var og = window.parent.og;
    var name = address;
    try{
        var name = await og.lnr.lookupAddress(address);
    } catch(error){
        console.log(error)
    }
    return(name);
}

export async function resolveOrReturn(nameAddress){
    console.log('nameoraddrss', nameAddress)
    var og = window.parent.og;
    var name = false;
    if(og.ethers.utils.isAddress(nameAddress)){
        return(nameAddress)
    }else{
    try{
        var tempname = await og.lnr.resolveName(nameAddress);
        if(og.utils.isAddress(tempname)){
            var name = tempname;
        }
    } catch(error){
        console.log(error)
    }

    console.log("returning", name)
    return(name)};
}

export async function handleEthers(fn){
    try{
        var signature = await fn();
        return(signature)
    } catch(error){
        console.log(error)
        return(false)
    }

};