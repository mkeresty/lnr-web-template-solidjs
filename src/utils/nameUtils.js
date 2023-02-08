
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
    if(og.ethers.utils.isAddress(nameAddress) == true){
        console.log("true address", nameAddress)
        return(nameAddress)
    }
    else{
        console.log("why in here")
            try{
                var tempname = await og.lnr.resolveName(nameAddress);
                console.log(tempname);
                if(og.ethers.utils.isAddress(tempname)){
                    var name = tempname;
                
                }
            } catch(error){
                console.log(error)
            }

    console.log("returning", name)
    return(name)
};
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

export async function getAllNames(nameAddress){
    var og = window.parent.og;
    var address = await resolveOrReturn(nameAddress);
    console.log("address", address)
    if(address == false){
        return
    }
    console.log("getting")
    var unwrapped = await getUnwrappedNames(address);
    console.log(unwrapped)
    var wrapped = await getWrappedNames(address);
    console.log(wrapped)

    return(unwrapped.concat(wrapped))

}

export async function getWrappedNames(address){


    //----------WILL NEED RETOOLING TO WORK ON MAIN---------
    //------------USE lnr.og.wrapperContract.<function> INSTEAD OF contract

    var og = window.parent.og;
    var ethers = window.parent.og.ethers;
    const provider = new ethers.providers.InfuraProvider(
        "mainnet",
        "5b26585dfc17437da190dd2117648295"
      );



    const wrapperAddress = "0x2Cc8342d7c8BFf5A213eb2cdE39DE9a59b3461A7";
    const abi = [{"inputs":[{"internalType":"string","name":"_uri","type":"string"}],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"owner","type":"address"},{"indexed":true,"internalType":"address","name":"approved","type":"address"},{"indexed":true,"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"Approval","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"owner","type":"address"},{"indexed":true,"internalType":"address","name":"operator","type":"address"},{"indexed":false,"internalType":"bool","name":"approved","type":"bool"}],"name":"ApprovalForAll","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"previousOwner","type":"address"},{"indexed":true,"internalType":"address","name":"newOwner","type":"address"}],"name":"OwnershipTransferred","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"from","type":"address"},{"indexed":true,"internalType":"address","name":"to","type":"address"},{"indexed":true,"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"Transfer","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"uint256","name":"pairId","type":"uint256"},{"indexed":true,"internalType":"address","name":"owner","type":"address"},{"indexed":false,"internalType":"bytes32","name":"namer","type":"bytes32"}],"name":"Unwrapped","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"uint256","name":"pairId","type":"uint256"},{"indexed":true,"internalType":"address","name":"owner","type":"address"},{"indexed":false,"internalType":"bytes32","name":"namer","type":"bytes32"}],"name":"Wrapped","type":"event"},{"inputs":[{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"approve","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"owner","type":"address"}],"name":"balanceOf","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"changeProxyAvail","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"changeWrapEnabled","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"bytes32","name":"_name","type":"bytes32"}],"name":"createWrapper","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"getApproved","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"bytes32","name":"nameId","type":"bytes32"}],"name":"getNameOwner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"idToName","outputs":[{"internalType":"bytes32","name":"","type":"bytes32"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"owner","type":"address"},{"internalType":"address","name":"operator","type":"address"}],"name":"isApprovedForAll","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"name","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"nameBytes","outputs":[{"internalType":"contract Linagee","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"bytes32","name":"","type":"bytes32"}],"name":"nameToId","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"owner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"ownerOf","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_tokenId","type":"uint256"},{"internalType":"address","name":"_param2","type":"address"},{"internalType":"bool","name":"_param3","type":"bool"}],"name":"proxySetAddress","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_tokenId","type":"uint256"},{"internalType":"bytes32","name":"_hash","type":"bytes32"}],"name":"proxySetContent","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_tokenId","type":"uint256"},{"internalType":"address","name":"_param2","type":"address"}],"name":"proxySetSubRegistrar","outputs":[],"stateMutability":"payable","type":"function"},{"inputs":[],"name":"renounceOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"from","type":"address"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"safeTransferFrom","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"from","type":"address"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"tokenId","type":"uint256"},{"internalType":"bytes","name":"data","type":"bytes"}],"name":"safeTransferFrom","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"operator","type":"address"},{"internalType":"bool","name":"approved","type":"bool"}],"name":"setApprovalForAll","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"string","name":"_uri","type":"string"}],"name":"setBaseURI","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"bytes4","name":"interfaceId","type":"bytes4"}],"name":"supportsInterface","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"symbol","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"index","type":"uint256"}],"name":"tokenByIndex","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"owner","type":"address"},{"internalType":"uint256","name":"index","type":"uint256"}],"name":"tokenOfOwnerByIndex","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"tokenURI","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"totalSupply","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"from","type":"address"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"transferFrom","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_tokenId","type":"uint256"}],"name":"unwrap","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"bytes32","name":"","type":"bytes32"}],"name":"waitForWrap","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"bytes32","name":"_name","type":"bytes32"}],"name":"wrap","outputs":[],"stateMutability":"nonpayable","type":"function"}]
    const contract = new ethers.Contract(wrapperAddress, abi, provider);

    const balance = (await contract.balanceOf(address)).toString(); //HERE
    const tokenids =[];
    if(balance > 0){
        for(let i = 0; i < balance; i++){
            const curId = (await contract.tokenOfOwnerByIndex(address, i)).toString(); //HERE
            const curBytes = (await contract.idToName(curId)).toString();  //HERE
            const curName = og.lnr.bytes32ToString(curBytes);
            var isValid = false;
            try{
                var isValid = (og.lnr.isValidDomain(curName.toString()+'.og'))[0]; 
                console.log(isValid[0])
            }
            catch(e){
                console.log(e)
            }
            tokenids.push({bytes: curBytes, name: curName+'.og', isValid: isValid.toString(), tokenId: curId, status: "wrapped"});
        }
        return(tokenids)
    }
    return(tokenids)
}

//////////////////////////////////////////////////////////////////////////////////////////

export async function getUnwrappedNames(address){
    var og = window.parent.og;
    var tokens = await theGraph(address);
    const tokenids =[];
    if(tokens && tokens['data']['domains']){
        const gData = tokens['data']['domains'];
        for(let i = 0; i < gData.length; i++){
            const curId = undefined;
            const curBytes = ((gData[i]).domainBytecode).toString();
            console.log(curBytes)
            const curName = (og.lnr.bytes32ToString(curBytes)).toString();
            console.log(curName)
            var isValid = false;
            try{
                var norm = og.lnr.normalize(curName.toString()+'.og')
                console.log(norm)
                var isValid = (og.lnr.isValidDomain(curName.toString()+'.og'))[0]; 
                console.log("valid", isValid)
            }
            catch(e){
                console.log(e)
            }
            console.log("curName",curName)
            // console.log('curname', curBytes)
            // var curOwner = await handleEthers(og.lnr.owner(curName + '.og'));
            // console.log(curOwner, 'cur')
            // if(curOwner && curOwner[0]  == address){
            //     tokenids.push({bytes: curBytes, name: curName+'.og', isValid: isValid[0], tokenId: curId, status: "unwrapped"});
            // }

            //Remove below--------------------------
            tokenids.push({bytes: curBytes, name: curName+'.og', isValid: isValid.toString(), tokenId: curId, status: "unwrapped"});

           
        }
        return(tokenids)
    }

    return(tokenids)
}

async function theGraph(address){
    const resp = await fetch(`https://api.studio.thegraph.com/query/42000/linagee/v0.0.1`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        query: `
      query {
        domains(where: {owner_contains_nocase: "${address}"}) {
            domainUtf8,
            domainBytecode
          }
        
    }`
      }),
    }).then((res)=>{
        return(res.json())})

    return(resp)
}

