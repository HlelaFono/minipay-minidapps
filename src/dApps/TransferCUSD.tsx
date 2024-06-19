import { useState } from "react";
import { ethers } from "ethers";


// Mainnet address of cUSD
const CUSD_ADDRESS = "0x765DE816845861e75A25fCA122bb6898B8B1282a";


// DApp to quickly test transfer of cUSD to a specific address using the cUSD contract.
export default function TransferCUSD() {
    const [receiverAddress, setReceiverAddress] = useState("");
    const [userAddress, setUserAddress] = useState("");
    const [transactionStatues, setTransactionStatues] = useState("");
    const [isHovered, setIsHovered] = useState(false);

    const  transferCUSD = async () => {
        try {
            const { ethereum } = window;
            if (!ethereum) throw new Error("MetaMusk not detected, install MetaMusk");
            
            const accounts = await ethereum.request({method: "eth_requestAccounts"});
            setUserAddress(accounts[0]);

            const provider = new ethers.providers.Web3Provider(ethereum);
            const signer = provider.getSigner();

            const cUSDContract = new ethers.Contract(CUSD_ADDRESS, ["function transfer(address to, uint256 value)"], signer);
            
            const tx = await cUSDContract.transfer(receiverAddress, ethers.utils.parseEther("0.1"));
            await provider.waitForTransaction(tx.hash);

            setTransactionStatues("Transaction successfull !!");
        } catch (error) {
            if(error instanceof Error) {
                console.error("Error tranferring cUSD:", error);
                setTransactionStatues(`Error: ${error.message}`);
            }
            
        }
    };
    return (
        <div
        style = {
            {
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                backgroundColor: "lightgreen",
                height: "90vh",
                width: "100px",
                justifyContent: "center",
                borderRadius: "10px"
               
                
            }
        }
        >
            {
                userAddress && <p> Your Address: {userAddress}</p>
            }
            <input
                type="text"
                value={receiverAddress}
                onChange={(e) => setReceiverAddress(e.target.value)}
                placeholder="Receiver's Address"
                style={{
                    marginBottom: "10px",
                    borderRadius: "20px",
                    padding: "10px",
                    width: "300px",
                    border: "3px solid rgb(0,127,0)"
                }}
            ></input>
            <button
            onClick={transferCUSD}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            style={{
                marginBottom: "10px",
                borderRadius: "20px",
                border: "2px solid rgb(0,127,0)",
                color: "rgb(255,255,255)",
                backgroundColor: isHovered ? "darkgreen" : "green",
                padding: "10px 20px",
                cursor: "pointer"

            }}
            >
                Transfer cUSD
            </button>
            {transactionStatues && <p>{transactionStatues}</p>}
        </div>


    );
}
