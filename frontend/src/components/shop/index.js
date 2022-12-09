import React, { useEffect, useState } from 'react'
import { ItemService } from '../../services/ItemService'
import Items from './Items'

export default function () {
  const [shopItems, setShopItems] = useState()

  useEffect(() => {
    ItemService.getItems().then((res) => {
      setShopItems(res.data.items)
    })
  }, [])
  return (
    <div>
      {
        shopItems && <Items ItemService={ItemService} items={shopItems} />
      }

    </div>
  )
}

