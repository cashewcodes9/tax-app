import React, { useEffect, useState } from  'react'
import Container from 'react-bootstrap/Container'
import ListGroup from 'react-bootstrap/ListGroup'
import Badge from 'react-bootstrap/Badge'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/Button'
import Card from 'react-bootstrap/Card'

const Items = () => {

    const [items, setItems] = useState([])
    const [cartItems, setCartItems] = useState([])
    const [itemIds, setItemIds] = useState([])
    const [totalTax, setTotalTax] = useState()
    const [itemQuantity, setItemQuantity] = useState([])

    //
    /**
     * getItems Function: Responsible for calling api and getting item lists from backend
     *
     * @returns {Promise<void>}
     */
    const getItems = async () => {
        const response = await fetch(`${process.env.REACT_APP_API_URL}/items`)

        const data = await response.json()
        setItems(data.data.items)
    }

    /**
     * calculateTax Function: Responsible for calling api and getting total tax of items in cart
     *
     * @returns {Promise<void>}
     */
    const calculateTax = async () => {
        const response = await fetch(`${process.env.REACT_APP_API_URL}/items/calculate`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({'item_ids' : itemIds})
        }).then((res) => {
            return res.json()
        })
        setTotalTax(response)
    }

    /**
     * removeFromCart Function: Responsible for removing item from cart
     *
     * @param el
     */
    const removeFromCart = (el) => {
        //deleting cart item with splice
        let newArray = cartItems
            newArray.splice(el.index, 1)
        //updating cartItems
        setCartItems(newArray)
        //setting totalTax to zero if no cart item exist.
        if (cartItems.length === 0) {
            setTotalTax(0)
        }
        //operations to handle item count while removing item from cart
        let itemIndex = itemQuantity.findIndex((item) => item.itemId === el.id)
        let itemQuantityArray = [...itemQuantity]
        itemQuantityArray.splice(itemIndex, 1)
        setItemQuantity(itemQuantityArray)

        // remove itemIds when an item with 'n' count is removed
        let idIndex = itemIds.indexOf(el.id)
        while (idIndex !== -1) {
            itemIds.splice(idIndex, 1)
            idIndex = itemIds.indexOf(el.id)
        }
    }

    /**
     * addToCart Function: responsible for adding items to cart.
     *
     * @param el
     */
    const addToCart = (el) => {
        if (itemIds.find((item) => item === el.id)) {
            itemCounter(el)
        } else {
            let newArray = [...cartItems]
            newArray.push(el)
            setCartItems(newArray)
            let quantityArray = [...itemQuantity]
            quantityArray.push({itemId: el.id, itemCount: 1})
            setItemQuantity(quantityArray)
        }
        setItemIds([...itemIds, el.id])

    }

    /**
     * itemCounter Function: responsible to increase item count
     *
     * @param item
     */
    const itemCounter = (item) => {
        let itemIndex = itemQuantity.findIndex((el) => el.itemId === item.id)
        let newArray = [...itemQuantity]
        newArray[itemIndex] = {itemId: item.id, itemCount: itemQuantity[itemIndex].itemCount += 1}
        setItemQuantity(newArray)
    }

    /**
     * totalPrice: calculate the total price of items
     *
     * @type {string}
     */
    const totalPrice = cartItems
        .reduce((total, { price = 0}) => total + price, 0)
        .toFixed(2)

    // UseEffect functions

    useEffect(() => {
        getItems()
    }, [])

    useEffect(() => {
        calculateTax()
    }, [itemIds])

    return (
        <Container className="pt-md-4 pb-md-4 ">
            <Row style={{gap: '52px'}}>
                <Col style={{boxShadow: 'rgba(0, 0, 0, 0.35) 0px 5px 15px'}} className="pt-4 pb-4 ps-4 pe-4 bg-light border">
                    <h3> Item List </h3>
                    {items.length > 0 && (
                        <ListGroup as="ol" numbered className='pt-md-4 pb-md-4'>
                            {items.map(item => (
                                <ListGroup.Item
                                    key={item.id}
                                    as="li"
                                    className="d-flex justify-content-between align-items-start"
                                >

                                    <div className="ms-2 me-auto">
                                        <div className="fw-bold">{'Name: ' + item.name }</div>

                                        {' Category: ' + item.tax_category} {'   '}
                                        <Badge bg="secondary" pill>
                                            {'$' + item.price}
                                        </Badge>{'  '}
                                    </div>
                                    <Button variant="primary" size="sm" onClick={() => {
                                        addToCart(item)
                                    }}>
                                        Add
                                    </Button>{' '}
                                </ListGroup.Item>
                            ))}
                        </ListGroup>
                    )}
                </Col>
                <Col style={{boxShadow: 'rgba(0, 0, 0, 0.35) 0px 5px 15px'}} className="pt-4 pb-4 ps-4 pe-4 bg-light border">
                    <h3>Cart</h3>
                    <h5>Please add items to cart to calculate Tax.</h5>
                    {cartItems.length > 0 && (
                        <ListGroup as="ol" numbered className="pt-md-4 pb-md-4">
                            {cartItems.map((cartItem, index) =>
                                 {
                                        return (
                                            <ListGroup.Item
                                                key={index}
                                                as="li"
                                                className="d-flex justify-content-between align-items-start"
                                            >
                                                <div className="ms-2 me-auto">
                                                    <div className="fw-bold">{'Name: ' + cartItem.name }</div>

                                                    {' Category: ' + cartItem.tax_category} {'   '}
                                                    <Badge bg="secondary" pill>
                                                        {'$' + cartItem.price}
                                                    </Badge>{'  '}
                                                    <Badge bg="success" pill>
                                                        Count: {itemQuantity[index]?.itemCount}
                                                    </Badge>{'  '}
                                                </div>
                                                <Button variant="danger" size="sm" onClick={() => {
                                                    removeFromCart({id: cartItem.id, index:index})
                                                }}>
                                                    Remove
                                                </Button>{' '}
                                            </ListGroup.Item>
                                        )
                                    }
                            )}
                        </ListGroup>
                    )}
                </Col>
                <Col style={{boxShadow: 'rgba(0, 0, 0, 0.35) 0px 5px 15px'}} className="pt-4 pb-4 ps-4 pe-4 bg-light border">
                    {totalTax > 0 && (
                        <Card>
                            <ListGroup as="ol" numbered className="pt-md-4 pb-md-4">
                                {cartItems.map((cartItem) => (
                                    <ListGroup variant="flush">
                                        <ListGroup.Item>
                                            <Badge bg="secondary" pill>
                                                {'$' + cartItem.price}
                                            </Badge>{'  '}
                                            {cartItem.name + ': ' + '$' + cartItem.price}
                                        </ListGroup.Item>

                                    </ListGroup>
                                ))}
                            </ListGroup>
                            <div className='ps-2'>
                                <div>{'Total tax: ' + '$' + totalTax}</div>
                                <div>{'Total price: ' + '$' + totalPrice}</div>
                            </div>
                        </Card>
                            )}
                </Col>
            </Row>
        </Container>
    )
}

export default Items;
