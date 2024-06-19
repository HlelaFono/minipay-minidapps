import TransferCUSD from "./dApps/TransferCUSD";

export default function App() {
    return (
        <div
            style={{
                marginTop: "10px",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: "9px",
                backgroundColor: "lightblue",
                padding: "20px",
                borderRadius: "20px",
                background: "linear-gradient(180deg, #116C31, #71F53E, #116C31)"
            }}
            >
            <TransferCUSD />
           
        </div>
    );
}
