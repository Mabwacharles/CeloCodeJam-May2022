import { useState, Suspense } from 'react'
import { productsStore, contractStore } from '../store'
import { NewProduct } from './newProduct'

export const Products = ({ kit, notifyUser }) => {
    const [newProduct, setNewProduct] = useState(false)

    const products = productsStore(state => state.products)
    const cUSDContract = contractStore(state => state.cUSDContract)
    const MPContract = contractStore(state => state.contract)
    const contractAddress = contractStore(state => state.MPContractAddress)

    const createProduct = () => {
        setNewProduct(true)
    }

    const buySong = async (product, index) => {
        console.log(product)
        if (product.owner !== kit.defaultAccount) {
            try {
                notifyUser("info", "Waiting for payment approval")
                const res = await approve(product.price)
                if (res.status === true) {
                    notifyUser("success", `Payment approved, Awaiting payment for ${product.name}`)
                    const result = await MPContract.methods.buySong(index).send({ from: kit.defaultAccount })
                    notifyUser("success", `You have successfully purchased ${product.name}`)
                }
            } catch (err) {
                notifyUser("error", err.message)
            }
        } else {
            notifyUser("info", "You can't buy this song because you already own it")
        }
    }

    const approve = async (price) => {
        const result = await cUSDContract.methods.approve(contractAddress, price).send({ from: kit.defaultAccount })
        return result
    }
    return (
        <div className="pt-20 w-full flex justify-center">
            <div className="w-10/12 flex gap-x-3">
                {
                    products.map((product, index) => {
                        return (
                            <div className="w-60 border rounded-md flex flex-col items-center hover:shadow-xl cursor-pointer transition-all group z-40" onClick={() => { buySong(product, index) }}>
                                <div className="relative rounded-t-md w-full h-40 z-10" style={{ background: `url("${product.image}")`, backgroundRepeat: "no-repeat", backgroundSize: "cover", backgroundPosition: "center" }}>

                                    {/* <img src={product.image} className="w-full h-40 object-cover rounded-t-md z-10" /> */}
                                    <div className="hidden group-hover:block absolute right-0 top-0 p-4">
                                        {
                                            kit.defaultAccount == product.owner &&
                                            <div className="bg-green-400 rounded-full border px-3 py-1 text-xs text-white border-green-400">
                                                Owner
                                            </div>
                                            ||
                                            <div className="bg-white rounded-full border px-3 py-1 text-xs">
                                                Buy
                                            </div>
                                        }
                                    </div>
                                </div>
                                <div className="w-full p-1 px-2 font-semibold">
                                    {
                                        product.name
                                    }
                                </div>
                                <div className="w-full px-2 text-gray-500 text-xs">
                                    {
                                        product.description
                                    }
                                </div>
                                <div className="w-full flex items-center px-2 mb-1">
                                    <div>
                                        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS2QYpf2_cNoPnPqJ9XEHsosGRxW86IodRRTg&usqp=CAU" className="w-8 h-8" />
                                    </div>
                                    <div className="w-full flex justify-between">
                                        <div className="px-2 text-gray-500 text-xs">
                                            {
                                                product.price
                                            }
                                            <span>&nbsp;cUSD</span>
                                        </div>
                                        <div className="text-xs">
                                            {product.sold} Sold
                                        </div>
                                    </div>

                                </div>
                            </div>
                        )
                    })
                }
                <div className="w-60 border rounded-md flex flex-col justify-center items-center hover:shadow-xl cursor-pointer transition-all'" onClick={createProduct}>
                    <div>
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-20 w-20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                    </div>
                    <div>
                        Add Song
                    </div>
                </div>
            </div>
            {
                newProduct && <Suspense fallback={<div>Loading...</div>}>
                    <NewProduct closeHandler={setNewProduct} kit={kit} />
                </Suspense>
            }
        </div >
    )
}
