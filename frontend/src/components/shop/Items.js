import React, { useEffect, useState } from 'react'
import Container from 'react-bootstrap/Container'
import ListGroup from 'react-bootstrap/ListGroup'
import Badge from 'react-bootstrap/Badge'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/Button'
import Card from 'react-bootstrap/Card'

const Items = (props) => {
    const { ItemService, items } = props
    // State with List of items added to cart
    const [cartItems, setCartItems] = useState([])
    // State with List of item ids which are sent through API to calculate total tax
    const [itemIds, setItemIds] = useState([])
    // State to store total calculated tax
    const [totalTax, setTotalTax] = useState(0)
    //State to store itemQuantity or count
    const [itemQuantity, setItemQuantity] = useState([])

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
        calculateTax(itemIds)
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
            //handling item count while adding item to cart
            let quantityArray = [...itemQuantity]
            quantityArray.push({ itemId: el.id, itemCount: 1 })
            setItemQuantity(quantityArray)
        }
        //setting itemIds array
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
        newArray[itemIndex] = { itemId: item.id, itemCount: itemQuantity[itemIndex].itemCount += 1 }
        setItemQuantity(newArray)
    }

    /**
     * totalPrice: calculate the total price of items accounting quantity of each item
     *
     * @type {string}
     */
    const totalPriceWithoutTax = cartItems.reduce(
        (total, currentItem) =>
            total + currentItem.price *
            itemQuantity[itemQuantity
                .findIndex(
                    (el) => el.itemId === currentItem.id
                )].itemCount
        , 0
    ).toFixed(2)

    const calculateTax = async() => {
        await ItemService.calculateTax(itemIds).then((res) => {
            setTotalTax(res)
        })
    }

    useEffect(() => {
        try {
            if(itemIds.length > 0) {
                calculateTax()
            }
        } catch (e) {
            return e
        }
    }, [itemIds])

    return (
        <Container className="pt-md-4 pb-md-4 ">
            <h3 className='text-center'> Welcome to Tax-app</h3>
            <Row style={{ gap: '52px' }}>
                <Col style={{ boxShadow: 'rgba(0, 0, 0, 0.35) 0px 5px 15px' }} className="pt-4 pb-4 ps-4 pe-4 bg-light border">
                    <h3> Item List </h3>
                    {items.length > 0 && (
                        <ListGroup as="ol" numbered className='pt-md-4 pb-md-4'>
                            {items.map((item, index) => (
                                <ListGroup.Item
                                    key={item.id}
                                    as="li"
                                    className="d-flex justify-content-between align-items-start"
                                >
                                    <div className="ms-2 me-auto">
                                        <div className="fw-bold">{'Name: ' + item.name}</div>

                                        {' Category: ' + item.tax_category} {'   '}
                                        <Badge bg="secondary" pill>
                                            {'$' + item.price}
                                        </Badge>{'  '}
                                    </div>
                                    <Button id="addToCart" label={'add button' + index} variant="primary" size="sm" onClick={() => {
                                        addToCart(item)
                                    }}>
                                        Add
                                    </Button>{' '}
                                </ListGroup.Item>
                            ))}
                        </ListGroup>
                    )}
                </Col>
                <Col style={{ boxShadow: 'rgba(0, 0, 0, 0.35) 0px 5px 15px' }} className="pt-4 pb-4 ps-4 pe-4 bg-light border">
                    <h3>Cart</h3>
                    <h5>Please add items to cart to calculate Tax.</h5>
                    {cartItems.length > 0 && (
                        <ListGroup as="ol" numbered className="pt-md-4 pb-md-4" label="itemCartList">
                            {cartItems.map((cartItem, index) => {
                                return (
                                    <ListGroup.Item
                                        key={index + 'itemList'}
                                        as="li"
                                        className="d-flex justify-content-between align-items-start"
                                    >
                                        <div className="ms-2 me-auto">
                                            <div className="fw-bold">{'Name: ' + cartItem.name}</div>

                                            {' Category: ' + cartItem.tax_category} {'   '}
                                            <Badge bg="secondary" pill>
                                                $ {cartItem.price}
                                            </Badge>{'  '}
                                            <Badge bg="success" pill>
                                                Count: {itemQuantity[index]?.itemCount}
                                            </Badge>{'  '}
                                        </div>
                                        <Button variant="danger" size="sm" onClick={() => {
                                            removeFromCart({ id: cartItem.id, index: index })
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
                <Col style={{ boxShadow: 'rgba(0, 0, 0, 0.35) 0px 5px 15px' }} className="pt-4 pb-4 ps-4 pe-4 bg-light border">
                    <h3>Receipt</h3>
                    {itemIds && (
                        <Card>
                            <ListGroup as="ol" numbered className="pt-md-4 pb-md-4">
                                {cartItems.map((cartItem, index) => (
                                    <ListGroup variant="flush">
                                        <ListGroup.Item
                                            key={index + 'itemList'}
                                        >
                                            <Badge bg="secondary" pill>
                                                Count: {itemQuantity[index]?.itemCount}
                                            </Badge>{'  '}
                                            <p>{cartItem.name + ': ' + '$' + cartItem.price}</p>
                                        </ListGroup.Item>

                                    </ListGroup>
                                ))}
                            </ListGroup>
                            <div className='ps-2'>
                                <p>Total tax: $ {totalTax}</p>
                                <p>Total price: $ {(parseFloat(totalTax) + parseFloat(totalPriceWithoutTax)).toFixed(2)}</p>
                            </div>
                        </Card>
                    )}
                </Col>
            </Row>
        </Container>
    )
}

export default Items;
