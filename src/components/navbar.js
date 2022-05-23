import logo from '../assets/spotify.png'
import profile from '../assets/profile.jpg'

export const Navbar = ({ account, balance }) => {

    function copy() {
        navigator.clipboard.writeText(account)
    }

    return (
        <div className="fixed w-full bg-black flex justify-center py-3">
            <div className="w-10/12 flex justify-between">
                <img src={logo} className="w-12" />
            </div>
            {
                account &&
                <div className="relative group cursor-pointer">
                    <img src={profile} className="w-12 object-cover rounded-full" />
                    <div className="group-hover:block hidden absolute top-12 w-[420px] pb-8 shadow-2xl -left-80 rounded-md transition-all z-50">
                        <div className="w-full flex flex-col justify-center">
                            <div className="w-full h-20 bg-gray-100 flex justify-between items-center p-8 gap-x-6">
                                <div>
                                    <img src={"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS2QYpf2_cNoPnPqJ9XEHsosGRxW86IodRRTg&usqp=CAU"} className="w-8 h-8 rounded-full" />
                                </div>
                                <div className="flex gap-x-2">
                                    <div className="flex gap-x-1.5 border-2 rounded-full items-center px-3 py-2 ">
                                        <div className="w-4 h-4 bg-green-900 rounded-full">

                                        </div>
                                        <div className="tet-xs font-semibold">
                                            Alfajores Test Network
                                        </div>
                                    </div>
                                </div>
                                <div>
                                    <img src={profile} className="w-9 h-9 rounded-full object-cover" />
                                </div>
                            </div>
                            <div className="w-full flex flex-col justify-center items-center border-b">
                                <div className="flex flex-col justify-center px-2 mt-1 h-16 font-semibold text-gray-500 hover:bg-gray-100 rounded-md cursor-pointer" onClick={() => { copy() }}>
                                    <div className="flex items-center">
                                        <div className="text-xl tracking-wider">
                                            Account
                                        </div>
                                        <div>
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                                            </svg>
                                        </div>
                                    </div>
                                    <div className="text-gray-300 text-xs">
                                        {account?.substring(0, 5)}...{account?.substring(account?.length - 4, account?.length)}
                                    </div>
                                </div>
                            </div>
                            <div className="w-full flex justify-center my-2">
                                <div className="border rounded-full p-1.5">
                                    <img src={"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS2QYpf2_cNoPnPqJ9XEHsosGRxW86IodRRTg&usqp=CAU"} className="w-8 h-8" />
                                </div>
                            </div>
                            <div className="w-full flex flex-col items-center">
                                <div className="text-3xl">
                                    {balance} cUSD
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            }
        </div>
    )
}