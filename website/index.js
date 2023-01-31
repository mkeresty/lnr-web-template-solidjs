let og = window.parent.og;

async function derp(){
  let walletAddress = await og.signer.getAddress();
  console.log("log from chain: Wallet:" + walletAddress);
  console.log(og);
  console.log("UTF8 stuff 小馬, 昨夜のコンサートは最高でした جیم ذال sdf Д д Ж ж Ñ");
  $("#test").html("Clone - jq good- ethers: good<br>" + walletAddress)
}


$(document).ready(function(){
  derp();
});
