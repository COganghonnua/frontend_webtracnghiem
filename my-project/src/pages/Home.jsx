import { useState } from "react";

const Home = () => {
    const [showData, setShowData] = useState("");
    const [data, setData] = useState("");
    return (
        <div>
            <div>
                {data}
            </div>
            <input type="text"
                value={showData}
                onChange={(e) => setShowData(e.target.value)}
            />
            <button onClick={() => setData(showData)}>Hiển thị data</button>
            <h1>Welcome to the Home Page</h1>
        </div >
    )
};

export default Home;
