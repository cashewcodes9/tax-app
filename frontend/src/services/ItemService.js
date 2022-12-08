class ApiService {

    constructor() {
        console.log('I am here in service')
    }

    /**
     * getItems Function: Responsible for calling api and getting item lists from backend
     *
     * @returns {Promise<void>}
     */
    getItems = async () => {
        const response = await fetch(`${process.env.REACT_APP_API_URL}/items`)

        return await response.json()
    }

    /**
         * calculateTax Function: Responsible for calling api and getting total tax of items in cart
         *
         * @returns {Promise<void>}
         */
    calculateTax = async (itemIds) => {
        const response = await fetch(`${process.env.REACT_APP_API_URL}/items/calculate`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ 'item_ids': itemIds })
        })
        const data = await response.json()
        return data
    }

}

export const ItemService = new ApiService()