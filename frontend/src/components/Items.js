import React, { useEffect, useState } from  'react'
import Container from 'react-bootstrap/Container'
import {ListGroup, Badge, Row, Col, Button, Card} from "react-bootstrap";

const Items = () => {
    const [items, setItems] = useState([])
    const [cartItems, setCartItems] = useState([])
    const [itemIds, setItemIds] = useState([])
    const [totalTax, setTotalTax] = useState()

    const getItems = async () => {
        const response = await fetch(`${process.env.REACT_APP_API_URL}/items`)

        const data = await response.json()
        setItems(data.data.items)
    }

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

    const removeFromCart = (el) => {

        let newArray = cartItems
            newArray.splice(el.index, 1)
        setCartItems(newArray)
        let hardCopyIds = [...itemIds]
        hardCopyIds.pop(el.id)
        setItemIds(hardCopyIds)
    }

    const addToCart = (el) => {
        let newArray = [...cartItems]
        newArray.push(el)
        setCartItems(newArray)
        setItemIds([...itemIds, el.id])
    }

    useEffect(() => {
        getItems()
    }, [])

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
                    { totalTax && (<Card>
                        <Card.Header>
                            {totalTax}
                        </Card.Header>
                    </Card>)}
                    {cartItems.length > 0 && (
                        <ListGroup as="ol" numbered className="pt-md-4 pb-md-4">
                            <Button ca variant="primary" size="sm" onClick={calculateTax}>
                                Calculate
                            </Button>
                            <br/>
                            {cartItems.map((cartItem, index) => (
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
                                    </div>
                                    <Button variant="danger" size="sm" onClick={() => {
                                        removeFromCart({id: cartItem.id, index:index})
                                    }}>
                                        Remove
                                    </Button>{' '}
                                </ListGroup.Item>
                            ))}
                        </ListGroup>
                    )}
                </Col>
                <Col style={{boxShadow: 'rgba(0, 0, 0, 0.35) 0px 5px 15px'}} className="pt-4 pb-4 ps-4 pe-4 bg-light border">
                    {totalTax > 0 && (
                        <ListGroup as="ol" numbered className="pt-md-4 pb-md-4">
                            {cartItems.map((cartItem) => (
                                <ListGroup variant="flush">
                                    <ListGroup.Item>
                                        {cartItem.name + ': ' + cartItem.price}
                                    </ListGroup.Item>
                        
                                </ListGroup>
                            ))}
                            <div>{'Sales tax: ' + totalTax}</div>
                        </ListGroup>
                    )}
                </Col>
            </Row>
        </Container>
    )
}

export default Items;
