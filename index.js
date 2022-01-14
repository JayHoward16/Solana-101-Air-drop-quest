const {
	 Connection,
	 PublicKey,
	 clusterApiUrl,
	 Keypair,
	 LAMPORTS_PER_SOL,
	 Transaction,
	 Account,
} = require("@solana/web3.js");

// Step 1 Gen New wallet keypair
const newPair = new Keypair();
console.log(newPair);

// Step 2 Storing the public and private key
const publicKey = new PublicKey(newPair._keypair.publicKey).toString();

const secretKey = newPair._keypair.secretKey


// Step 3 Getting the wallet balance 
const getWalletBalance = async () => {
	    try { 
		    const connection = new Connection(clusterApiUrl("devnet"), "confirmed");
		    const myWallet = await Keypair.fromSecretKey(secretKey);
		    const walletBalance = await connection.getBalance(
                           new PublicKey(myWallet.publicKey) 
		 );
		    console.log(`=> For wallet address ${publicKey}`);
		    console.log(`   Wallet balance: ${parseInt(walletBalance)/LAMPORTS_PER_SOL}SOL`);
		    
	    } catch (err) {
				        console.log(err);
				    }
};


// Step 4 Air dropping SOL (in the context of LAMPORTS) 
const airDropSol = async () => {
	    try { 
		    const connection = new Connection(clusterApiUrl("devnet"), "confirmed");
		    const walletKeyPair = await Keypair.fromSecretKey(secretKey);
		    console.log(`-- Airdropping 2 SOL --`)
		    const fromAirDropSignature = await connection.requestAirdrop( 
		      new PublicKey(walletKeyPair.publicKey),
			 2 * LAMPORTS_PER_SOL
		             );
		            await connection.confirmTransaction(fromAirDropSignature);
		        } catch (err) {
				        console.log(err);
				    }
};

//Step 5 Driver Function 
const driverFunction = async () => {

	await getWalletBalance();
	await airDropSol();
	await getWalletBalance();
}
driverFunction(); 


