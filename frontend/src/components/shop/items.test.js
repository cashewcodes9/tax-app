import Items from "./Items"
import { cleanup, render, screen, within } from "@testing-library/react";
import { act } from "react-dom/test-utils";
import userEvent from "@testing-library/user-event";


let itemData = [
    {
        id: 1,
        name: "book at 12.49",
        tax_category: "Book",
        price: 12.49,
    }
]

const defaultService = {
    itemService: {
        getItems: jest.fn().mockImplementation(() => Promise.resolve(itemData)),
        calculateTax: jest.fn()
    }
}
const createSuit = async (services = {}) => {
    services = {
        itemService: {
            ...defaultService.itemService,
            ...services.itemService
        }
    }
    let renderResults = null
    await act(async () => {
        renderResults = render(<Items items={itemData} ItemService={services.itemService} />)
    })
    return renderResults
}
afterEach(cleanup)


describe('shop', () => {
    it('gets item data', async () => {
        await createSuit()
        expect(await screen.findByText('Name: book at 12.49')).toBeInTheDocument()
    })

    it('adds items to the cart and checks in both cart and receipt', async () => {
        await createSuit()
        const addButton = screen.getByRole('button',{name: /Add/i})
        userEvent.click(addButton)
        
        const cart = within(screen.getByText('Cart').parentElement)
        cart.getByText('Name: book at 12.49')

        const receipt = within(screen.getByText('Receipt').parentElement)
        receipt.getByText('book at 12.49: $12.49')
    })
})


