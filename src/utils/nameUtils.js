
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
        if(og.ethers.utils.isAddress(tempname)){
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

export async function getAllNames(nameAddress){
    var og = window.parent.og;
    var tempAddress = "0x00C3670F155f2a0CA2b68882666CbA19d14e4943";
    var address = await resolveOrReturn(nameAddress)
    if(address == false){
        return
    }



    
    try{
        var name = await og.lnr.lookupAddress(address);
    } catch(error){
        console.log(error)
    }
    return(name);
}

export async function getWrappedNames(){
    var og = window.parent.og;
    var tempAddress = "0x00C3670F155f2a0CA2b68882666CbA19d14e4943";
    var ethers = window.parent.og.ethers;
    const provider = new ethers.providers.InfuraProvider(
        "mainnet",
        "5b26585dfc17437da190dd2117648295"
      );
    const wrapperAddress = "0x2Cc8342d7c8BFf5A213eb2cdE39DE9a59b3461A7";
    const abi = [{"inputs":[{"internalType":"string","name":"_uri","type":"string"}],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"owner","type":"address"},{"indexed":true,"internalType":"address","name":"approved","type":"address"},{"indexed":true,"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"Approval","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"owner","type":"address"},{"indexed":true,"internalType":"address","name":"operator","type":"address"},{"indexed":false,"internalType":"bool","name":"approved","type":"bool"}],"name":"ApprovalForAll","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"previousOwner","type":"address"},{"indexed":true,"internalType":"address","name":"newOwner","type":"address"}],"name":"OwnershipTransferred","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"from","type":"address"},{"indexed":true,"internalType":"address","name":"to","type":"address"},{"indexed":true,"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"Transfer","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"uint256","name":"pairId","type":"uint256"},{"indexed":true,"internalType":"address","name":"owner","type":"address"},{"indexed":false,"internalType":"bytes32","name":"namer","type":"bytes32"}],"name":"Unwrapped","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"uint256","name":"pairId","type":"uint256"},{"indexed":true,"internalType":"address","name":"owner","type":"address"},{"indexed":false,"internalType":"bytes32","name":"namer","type":"bytes32"}],"name":"Wrapped","type":"event"},{"inputs":[{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"approve","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"owner","type":"address"}],"name":"balanceOf","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"changeProxyAvail","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"changeWrapEnabled","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"bytes32","name":"_name","type":"bytes32"}],"name":"createWrapper","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"getApproved","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"bytes32","name":"nameId","type":"bytes32"}],"name":"getNameOwner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"idToName","outputs":[{"internalType":"bytes32","name":"","type":"bytes32"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"owner","type":"address"},{"internalType":"address","name":"operator","type":"address"}],"name":"isApprovedForAll","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"name","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"nameBytes","outputs":[{"internalType":"contract Linagee","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"bytes32","name":"","type":"bytes32"}],"name":"nameToId","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"owner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"ownerOf","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_tokenId","type":"uint256"},{"internalType":"address","name":"_param2","type":"address"},{"internalType":"bool","name":"_param3","type":"bool"}],"name":"proxySetAddress","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_tokenId","type":"uint256"},{"internalType":"bytes32","name":"_hash","type":"bytes32"}],"name":"proxySetContent","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_tokenId","type":"uint256"},{"internalType":"address","name":"_param2","type":"address"}],"name":"proxySetSubRegistrar","outputs":[],"stateMutability":"payable","type":"function"},{"inputs":[],"name":"renounceOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"from","type":"address"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"safeTransferFrom","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"from","type":"address"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"tokenId","type":"uint256"},{"internalType":"bytes","name":"data","type":"bytes"}],"name":"safeTransferFrom","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"operator","type":"address"},{"internalType":"bool","name":"approved","type":"bool"}],"name":"setApprovalForAll","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"string","name":"_uri","type":"string"}],"name":"setBaseURI","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"bytes4","name":"interfaceId","type":"bytes4"}],"name":"supportsInterface","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"symbol","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"index","type":"uint256"}],"name":"tokenByIndex","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"owner","type":"address"},{"internalType":"uint256","name":"index","type":"uint256"}],"name":"tokenOfOwnerByIndex","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"tokenURI","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"totalSupply","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"from","type":"address"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"transferFrom","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_tokenId","type":"uint256"}],"name":"unwrap","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"bytes32","name":"","type":"bytes32"}],"name":"waitForWrap","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"bytes32","name":"_name","type":"bytes32"}],"name":"wrap","outputs":[],"stateMutability":"nonpayable","type":"function"}]
    const contract = new ethers.Contract(wrapperAddress, abi, provider)
    const balance = (await contract.balanceOf(tempAddress)).toString();
    if(balance > 0){
        const tokenids =[];
        for(let i = 0; i < balance; i++){
            const curId = (await contract.tokenOfOwnerByIndex(tempAddress, i)).toString();
            const curBytes = (await contract.idToName(curId)).toString();
            const curName = og.lnr.bytes32ToString(curBytes);
            const isValid = og.lnr.isValidDomain(curName+'.og');
            tokenids.push({bytes: curBytes, name: curName+'.og', isValid: isValid[0], tokenId: curId, status: "wrapped"});
        }
        console.log(tokenids)
        return(tokenids)
    }
    return
}

//////////////////////////////////////////////////////////////////////////////////////////

export async function getUnwrappedNames(){
    var og = window.parent.og;
    var tempAddress = "0x00C3670F155f2a0CA2b68882666CbA19d14e4943";
    var myaddress = "0xD0B12c1123a83d85ddf1F1ff23B5aF3FCDbF6799"
    var other = "0x7e1877D6eD0574181E5508952CFCD057B5AC5832";
    var ethers = window.parent.og.ethers;
    const provider = new ethers.providers.InfuraProvider(
        "mainnet",
        "5b26585dfc17437da190dd2117648295"
      );
    const lnrAddress = "0x5564886ca2C518d1964E5FCea4f423b41Db9F561";
    var abi2 = [
        "event reserve(bytes32 _name, address indexed src)"
      ];
      
    const abi = [{"constant": true,"inputs": [{"name": "_owner","type": "address"}],"name": "name","outputs": [{"name": "o_name","type": "bytes32"}],"type": "function","payable": false,"stateMutability": "view"},{"constant": true,"inputs": [{"name": "_name","type": "bytes32"}],"name": "owner","outputs": [{"name": "","type": "address"}],"type": "function","payable": false,"stateMutability": "view"},{"constant": true,"inputs": [{"name": "_name","type": "bytes32"}],"name": "content","outputs": [{"name": "","type": "bytes32"}],"type": "function","payable": false,"stateMutability": "view"},{"constant": true,"inputs": [{"name": "_name","type": "bytes32"}],"name": "addr","outputs": [{"name": "","type": "address"}],"type": "function","payable": false,"stateMutability": "view"},{"constant": false,"inputs": [{"name": "_name","type": "bytes32"}],"name": "reserve","outputs": [],"type": "function","payable": true,"stateMutability": "payable"},{"constant": true,"inputs": [{"name": "_name","type": "bytes32"}],"name": "subRegistrar","outputs": [{"name": "o_subRegistrar","type": "address"}],"type": "function","payable": false,"stateMutability": "view"},{"constant": false,"inputs": [{"name": "_name","type": "bytes32"},{"name": "_newOwner","type": "address"}],"name": "transfer","outputs": [],"type": "function","payable": true,"stateMutability": "payable"},{"constant": false,"inputs": [{"name": "_name","type": "bytes32"},{"name": "_registrar","type": "address"}],"name": "setSubRegistrar","outputs": [],"type": "function","payable": true,"stateMutability": "payable"},{"constant": false,"inputs": [],"name": "Registrar","outputs": [],"type": "function","payable": true,"stateMutability": "payable"},{"constant": false,"inputs": [{"name": "_name","type": "bytes32"},{"name": "_a","type": "address"},{"name": "_primary","type": "bool"}],"name": "setAddress","outputs": [],"type": "function","payable": true,"stateMutability": "payable"},{"constant": false,"inputs": [{"name": "_name","type": "bytes32"},{"name": "_content","type": "bytes32"}],"name": "setContent","outputs": [],"type": "function","payable": true,"stateMutability": "payable"},{"constant": false,"inputs": [{"name": "_name","type": "bytes32"}],"name": "disown","outputs": [],"type": "function","payable": true,"stateMutability": "payable"},{"constant": true,"inputs": [{"name": "_name","type": "bytes32"}],"name": "register","outputs": [{"name": "","type": "address"}],"type": "function","payable": false,"stateMutability": "view"},{"anonymous": false,"inputs": [{"indexed": true,"name": "name","type": "bytes32"}],"name": "Changed","type": "event"},{"anonymous": false,"inputs": [{"indexed": true,"name": "name","type": "bytes32"},{"indexed": true,"name": "addr","type": "address"}],"name": "PrimaryChanged","type": "event"},{"type": "fallback","payable": true,"stateMutability": "payable"}]
    const contract = new ethers.Contract(lnrAddress, abi2, provider);
    var currentBlock = await provider.getBlockNumber()
    var filt = await provider.getTransactionCount(myaddress)
    console.log(filt)

    for (var i=currentBlock; i >= 0 ; --i) {
        console.log("in loop", i)
        try {
            var block = await provider.getBlock(i);
            if (block && block.transactions) {
                console.log("in if")
                block.transactions.forEach(function(e) {
                    if (myaddress == e.from) {
                        console.log(e)
                    }
                });
            }
        } catch (e) { console.error("Error in block " + i, e); }
    }


    
    
    
    // const balance = (await contract.balanceOf(tempAddress)).toString();
    // if(balance > 0){
    //     const tokenids =[];
    //     for(let i = 0; i < balance; i++){
    //         const curId = (await contract.tokenOfOwnerByIndex(tempAddress, i)).toString();
    //         const curBytes = (await contract.idToName(curId)).toString();
    //         const curName = og.lnr.bytes32ToString(curBytes);
    //         const isValid = og.lnr.isValidDomain(curName+'.og');
    //         tokenids.push({bytes: curBytes, name: curName+'.og', isValid: isValid[0], tokenId: curId, status: "wrapped"});
    //     }
    //     console.log(tokenids)
    //     return(tokenids)
    // }
    return
}

