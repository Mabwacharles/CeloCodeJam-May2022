import { useState, useEffect } from 'react'
import { contractStore } from '../store'

export const NewProduct = ({ closeHandler, kit }) => {
    const initialSongInput = {
        name: "", 
        image: "",
        description: "",
        price: 0
    }
    const contract = contractStore(state => state.contract)

    const [loading, setLoading] = useState(false)
    const [{name, image, description, price}, setInputs] = useState(initialSongInput)

    const close = () => {
        closeHandler();
    }

    const onChangeHandler = (input) => {
        setInputs(prevState=>({...prevState, [input.target.name]: input.target.value}))
    }

    const createSong = async () => {
        if(name !== "" && description !== "" && image !== "" && price !== "" && price !== 0){
            const length = await contract.methods.getSongsLength().call()
            const result = contract.methods.writeProduct(length, name, image, description, price).send({from: kit.defaultAccount})
            console.log(result)
            close()
        }
    }
    return (
        <div className="fixed w-full inset-0 z-50 overflow-hidden flex justify-center items-end md:items-center animated fadeIn faster"
            style={{ background: "rgba(0,0,0,.7)" }}>
            <div className="shadow-lg modal-container bg-white border-2 border-green-400 w-full md:w-2/5 lg:w-2/5 mx-auto rounded-t-lg md:rounded-lg z-100 overflow-y-auto max-h-full relative">
                <div className="absolute right-0">
                    <div className="m-1 p-2 hover:bg-gray-200 rounded-full cursor-pointer" onClick={close}>
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </div>
                </div>
                <div className="w-full flex flex-col px-4 py-2">
                    <div className="font-semibold text-gray-500 text-xl">
                        New Song
                    </div>
                    <div className="">
                        <label htmlFor="name" className="text-xs font-medium tracking-wider ">
                            Name
                        </label>
                        <input type="text" name="name" className="p-3 w-full rounded-md border focus:outline-none focus:ring-0 focus:border-green-400" placeholder="Enter song name" onChange={onChangeHandler}/>
                    </div>
                    <div className="mt-2">
                        <label htmlFor="image" className="text-xs font-medium tracking-wider ">
                            Image
                        </label>
                        <input type="text" name="image" className="p-3 w-full rounded-md border focus:outline-none focus:ring-0 focus:border-green-400" placeholder="Enter song image address" onChange={onChangeHandler}/>
                    </div>
                    <div className="mt-2">
                        <label htmlFor="name" className="text-xs font-medium tracking-wider ">
                            Description
                        </label>
                        <textarea type="text" name="description" className="p-3 w-full rounded-md border focus:outline-none focus:ring-0 focus:border-green-400" placeholder="Enter song description" cols="80" onChange={onChangeHandler}>

                        </textarea>
                    </div>
                    <div className="mt-2">
                        <label htmlFor="name" className="text-xs font-medium tracking-wider ">
                            Price
                        </label>
                        <input type="number" name="price" className="p-3 w-full rounded-md border focus:outline-none focus:ring-0 focus:border-green-400" placeholder="Enter song image address" onChange={onChangeHandler}/>
                    </div>
                    <div className="w-full flex justify-end mt-5 mb-3 gap-x-3">
                        <div>
                            <button className="px-8 py-2 bg-gray-300 rounded-full">
                                Close
                            </button>
                        </div>
                        <div>
                            <button className="px-8 py-2 bg-green-400 rounded-full text-white" onClick={createSong  }>
                                {
                                    loading &&
                                    <svg role="status" class="inline w-8 h-6 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-pink-400" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                                        <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
                                    </svg>
                                    ||
                                    <span>Create Song</span>
                                }
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}