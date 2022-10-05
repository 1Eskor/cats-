import React, { useState, useEffect } from "react";
import { abi, contractaddress } from "../contractdataabi/abi";
import Web3 from "web3";

export default function Home({ props }) {
  const [counter, setCounter] = useState(0);
  const [apiData, setApiData] = useState([]);
  const [contract, setContract] = useState([]);
  const [userAccountAddress, setUserAccountAddress] = useState(null);


  const handleConnectMetamask = async () => {

    const web3 = new Web3(Web3.givenProvider || "http://localhost:8545");
    const network = await web3.eth.net.getNetworkType();
    await window.ethereum.enable();
    //Fetch account data:
    const accountFromMetaMask = await web3.eth.getAccounts();
    setUserAccountAddress(accountFromMetaMask[0]);


  };

  const onButtonClick = (type) => {
    setCounter(counter + 1);
  };

  useEffect(() => {
    async function fetchData() {
      const web3 = new Web3(Web3.givenProvider || "http://localhost:8545");


      const contract = new web3.eth.Contract(abi, contractaddress);
      console.log(contract, 'this is the contract')
      setContract(contract)
    }
    fetchData();
  }, []);

  const renderTableRows = () => {
    let rows = [];
    if (apiData.length !== 0) {
      rows = apiData.map((item, index) => {
        return (
          <tr key={index}>
            <td>{item.from}</td>
            <td style={{ textAlign: "right" }}>{item.userId}</td>
            <td style={{ textAlign: "right" }}>{item.title}</td>
            <td style={{ textAlign: "right" }}>{item.id}</td>
          </tr>
        );
      });
    } else {
      return <p>No data available</p>;
    }

    return rows;
  };
  console.log(userAccountAddress, 'this is the user account address')
  return (
    <>
      <div className="container-fluid m-0 py-2 align-middle text-center text-banner">
        {counter}
        <button onClick={() => onButtonClick()}>Checkout</button>Shop
        <button onClick={() => handleConnectMetamask()}>{userAccountAddress ? userAccountAddress : 'Connect'}</button>
        <table className="table">
          <thead>
            <tr>
              <th>From</th>
              <th style={{ textAlign: "right" }}>To</th>
              <th style={{ textAlign: "right" }}>Updated</th>
              <th style={{ textAlign: "right" }}>Rate</th>
            </tr>
          </thead>
          <tbody>{renderTableRows()}</tbody>
        </table>
      </div>
    </>
  );
}
