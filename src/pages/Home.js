import React, { useEffect, useState } from "react";
import Web3 from "web3";
import { newKitFromWeb3 } from "@celo/contractkit";
import { notificationStore, productsStore, contractStore } from '../store'
import marketPlaceABI from '../contracts/marketPlaceABI.json'
import erc20abi from '../contracts/erc20abi.json'

import { Navbar } from '../components/navbar'
import { Products } from '../components/products'

const ERC20_DECIMALS = 18;

export default function Home() {
  const [kit, setKit] = useState(null)
  const [balance, setBalance] = useState(0)

  const setNotification = notificationStore(state => state.setNotification)
  const setShowNotification = notificationStore(state => state.setShowNotification)
  const products = productsStore(state => state.products)
  const setProducts = productsStore(state => state.setProducts)
  const contract = contractStore(state => state.contract)
  const setContract = contractStore(state => state.setContract)
  const setCUSDContract = contractStore(state => state.setCUSDContract)
  const contractAddress = contractStore(state => state.MPContractAddress)
  const cUSDContractAddress = contractStore(state => state.cUSDContractAddress)

  const [account, setAccount] = useState(null)

  useEffect(() => {
    connectCeloWallet()
  }, [])

  useEffect(async () => {
    if (kit) {
      const accounts = await kit.web3.eth.getAccounts()
      kit.defaultAccount = accounts[0]
      setAccount(accounts[0])
      const bal = await kit.getTotalBalance(kit.defaultAccount)
      console.log("Balance")
      console.log(bal)
      setBalance(bal.cUSD.shiftedBy(-18).toFixed(2))
      const contract = new kit.web3.eth.Contract(marketPlaceABI, contractAddress)
      const cUSDContract = new kit.web3.eth.Contract(erc20abi, cUSDContractAddress)
      setContract(contract)
      setCUSDContract(cUSDContract)

    }
  }, [kit])

  useEffect(async () => {
    if (contract) {
      const songsLength = await contract.methods.getSongsLength().call()
      const songs = []
      for (let i = 0; i < songsLength; i++) {
        const song = await contract.methods.readSong(i).call()
        songs.push(song)
      }
      console.log("Length ", songsLength)
      setProducts(songs)
    }
  }, [contract])

  const notifyUser = (type, message) => {
    setNotification([type, message])
    setShowNotification(true)
  }

  const connectCeloWallet = async () => {
    if (!window.celo) {
      notifyUser("error", "Please install Celo Extension Wallet")
    }
    if (window.celo) {
      try {
        notifyUser("info", "Please approve Cpotify to access your Celo Wallet")
        await window.celo.enable()
        notifyUser("success", "Cpotify connected successfully")
        const web3 = new Web3(window.celo)
        setKit(newKitFromWeb3(web3))
      } catch (e) {
        notifyUser('error', `${e.message}`)
      }
    }
  }

  return (
    <div>
      <Navbar account={account} balance={balance} />
      <Products kit={kit} notifyUser={notifyUser} />
    </div>
  );
}
