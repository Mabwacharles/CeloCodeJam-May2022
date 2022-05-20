import create from 'zustand'

export const notificationStore = create(set => ({
    showNotification: false,
    notification: ["", ""],
    setShowNotification: (status) => set({ showNotification: status }),
    setNotification: (notification) => set({ notification: notification }),
}))

export const productsStore = create(set =>({
    products: [],
    setProducts: (products) => set({ products: products})
}))

export const contractStore = create(set =>({
    contract: null,
    cUSDContract: null,
    setContract: (contract) => set({ contract: contract }),
    setCUSDContract: (cUSDContract) => set({ cUSDContract: cUSDContract }),
    MPContractAddress: '0x87BEb3944BCeD341610107c37B051F3d38614e8B',
    cUSDContractAddress: '0x874069Fa1Eb16D44d622F2e0Ca25eeA172369bC1'
}))
