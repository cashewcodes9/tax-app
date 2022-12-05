import React, { useEffect, useState } from  'react'
import Container from 'react-bootstrap/Container'
import {ListGroup, Badge, Row, Col, Button} from "react-bootstrap";

const Items = () => {
    const [items, setItems] = useState([])
    const [cartItems, setCartItems] = useState([])
    const [itemIds, setItemIds] = useState([])

    const getItems = async () => {
        const response = await fetch(`${process.env.REACT_APP_API_URL}/items`)

        const data = await response.json()
        setItems(data.data.items)
    }

    const calculateTax = async () => {
        const response = await fetch(`${process.env.REACT_APP_API_URL}/items/calculate`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ item_ids: []  })
        })
    }


    const addToCart = (el) => {
        setCartItems([...cartItems , el])
        setItemIds([...itemIds, el.id])
    }

    useEffect(() => {
        getItems()
    }, [ ])

    return (
        <Container className="pt-md-4 pb-md-4 ">
            <Row>
                <Col xs={12} md={6} className="pt-md-4 pb-md-4 bg-light border">
                    {items.length > 0 && (
                        <ListGroup as="ol" numbered className='pt-md-4'>
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
                <Col xs={12} md={6} className="pt-4 pb-4 pl-4  bg-light border">
                    {cartItems.length > 0 && (
                        <ListGroup as="ol" numbered className="pt-md-4 pb-md-4">
                            <Button ca variant="primary" size="sm" onClick={calculateTax}>
                                Calculate
                            </Button>
                            <br/>
                            {cartItems.map(cartItem => (
                                <ListGroup.Item
                                    key={cartItem.id}
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
                                        addToCart(cartItem)
                                    }}>
                                        Remove
                                    </Button>{' '}
                                </ListGroup.Item>
                            ))}
                        </ListGroup>
                    )}
                </Col>
            </Row>
        </Container>
    )
}

export default Items;
