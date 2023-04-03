# GrubDash

## This is the API and routing for an app that enables a developer to access and manipulate dishes and orders data.

Routes support GET, POST, PUT, DELETE operations. Other operations are not allowed.

Validation is performed on POST, PUT, and DELETE operations to ensure the integrity of the data.+

### Dishes

All dishes are accessible via /dishes, and individual dishes are accessible via /dishes/:dishId. A dish can be created and updated, but _not_ deleted.

Getting a list of dishes:

```
fetch(`localhost:5000/dishes`)
```

Output:

```
[
    {
        id: "3c637d011d844ebab1205fef8a7e36ea",
        name: "Broccoli and beetroot stir fry",
        description: "Crunchy stir fry featuring fresh broccoli and beetroot",
        price: 15,
        image_url:
        "https://images.pexels.com/photos/4144234/pexels-photo-4144234.jpeg?h=530&w=350",
    },
    {
        id: "90c3d873684bf381dfab29034b5bba73",
        name: "Falafel and tahini bagel",
        description: "A warm bagel filled with falafel and tahini",
        price: 6,
        image_url:
        "https://images.pexels.com/photos/4560606/pexels-photo-4560606.jpeg?h=530&w=350",
    },
    {
        id: "d351db2b49b69679504652ea1cf38241",
        name: "Dolcelatte and chickpea spaghetti",
        description:
        "Spaghetti topped with a blend of dolcelatte and fresh chickpeas",
        price: 19,
        image_url:
        "https://images.pexels.com/photos/1279330/pexels-photo-1279330.jpeg?h=530&w=350",
    }
]
```

Creating a dish:

```
fetch('localhost:5000/dishes', {
  method: 'POST',
  body: JSON.stringify({
    name: 'Chicken and waffles',
    description: 'Some chicken as well as some waffles',
    price: 15,
    image_url: "https://images.google.com/",
  }),
  headers: {
    'Content-type': 'application/json; charset=UTF-8',
  },
})
```

Output:

```
{
    name: 'Chicken and waffles',
    description: 'Some chicken as well as some waffles',
    price: 15,
    image_url: 'https://images.google.com/',
    id: 'a6a9551718b98ebad846ca4afcaad8a0',
  }
```

Getting a specific dish:

```
fetch(`localhost:5000/dishes/d351db2b49b69679504652ea1cf38241`);
```

Output:

```
{
        id: "d351db2b49b69679504652ea1cf38241",
        name: "Dolcelatte and chickpea spaghetti",
        description:
        "Spaghetti topped with a blend of dolcelatte and fresh chickpeas",
        price: 19,
        image_url:
        "https://images.pexels.com/photos/1279330/pexels-photo-1279330.jpeg?h=530&w=350",
    }
```

Updating a dish:

```
fetch('localhost:5000/dishes/d351db2b49b69679504652ea1cf38241', {
  method: 'PUT',
  body: JSON.stringify({
    id: d351db2b49b69679504652ea1cf38241,
    name: 'Broccoli and beetroot stir fry',
    description: 'A warm bagel filled with falafel and tahini',
    price: 4,
    image_url: "https://images.pexels.com/photos/4144234/pexels-photo-4144234.jpeg?h=530&w=350",
  }),
  headers: {
    'Content-type': 'application/json; charset=UTF-8',
  },
})
```

Output:

```
{
    id: d351db2b49b69679504652ea1cf38241,
    name: 'Broccoli and beetroot stir fry',
    description: 'A warm bagel filled with falafel and tahini',
    price: 4,
    image_url: "https://images.pexels.com/photos/4144234/pexels-photo-4144234.jpeg?h=530&w=350",
  }
```

### Orders

All orders are accessible via /orders, and individual orders are assessible via orders/orderId. An order can be updated or deleted.

_Note_: that an order can no longer be deleted once its status has been set to _delivered_,
and an order that does not have a status of _pending_ cannot be deleted.

Getting a list of orders:

```
fetch(`localhost:5000/orders`)
```

Output:

```
[
  {
    id: "f6069a542257054114138301947672ba",
    deliverTo: "1600 Pennsylvania Avenue NW, Washington, DC 20500",
    mobileNumber: "(202) 456-1111",
    status: "out-for-delivery",
    dishes: [
      {
        id: "90c3d873684bf381dfab29034b5bba73",
        name: "Falafel and tahini bagel",
        description: "A warm bagel filled with falafel and tahini",
        image_url:
          "https://images.pexels.com/photos/4560606/pexels-photo-4560606.jpeg?h=530&w=350",
        price: 6,
        quantity: 1,
      },
    ],
  },
  {
    id: "5a887d326e83d3c5bdcbee398ea32aff",
    deliverTo: "308 Negra Arroyo Lane, Albuquerque, NM",
    mobileNumber: "(505) 143-3369",
    status: "delivered",
    dishes: [
      {
        id: "d351db2b49b69679504652ea1cf38241",
        name: "Dolcelatte and chickpea spaghetti",
        description:
          "Spaghetti topped with a blend of dolcelatte and fresh chickpeas",
        image_url:
          "https://images.pexels.com/photos/1279330/pexels-photo-1279330.jpeg?h=530&w=350",
        price: 19,
        quantity: 2,
      },
    ],
  },
]
```

Creating an order:

```
fetch('localhost:5000/orders', {
  method: 'POST',
  body: JSON.stringify({
    deliverTo: "555 Something Street, City of Industry, CA",
    mobileNumber: "(555) 555-5555",
    status: "pending",
    dishes: [
      {
        id: "d351db2b49b69679504652ea1cf38241",
        name: "Dolcelatte and chickpea spaghetti",
        description:
          "Spaghetti topped with a blend of dolcelatte and fresh chickpeas",
        image_url:
          "https://images.pexels.com/photos/1279330/pexels-photo-1279330.jpeg?h=530&w=350",
        price: 19,
        quantity: 2,
      },
    ],
  }),
  headers: {
    'Content-type': 'application/json; charset=UTF-8',
  },
})
```

Output:

```
{
    deliverTo: "555 Something Street, City of Industry, CA",
    mobileNumber: "(555) 555-5555",
    status: "pending",
    dishes: [
      {
        id: "d351db2b49b69679504652ea1cf38241",
        name: "Dolcelatte and chickpea spaghetti",
        description:
          "Spaghetti topped with a blend of dolcelatte and fresh chickpeas",
        image_url:
          "https://images.pexels.com/photos/1279330/pexels-photo-1279330.jpeg?h=530&w=350",
        price: 19,
        quantity: 2,
      },
    ],
  }
```

Getting a specific order:

```
fetch(`localhost:5000/orders/f6069a542257054114138301947672ba`);
```

Output:

```
{
    id: "f6069a542257054114138301947672ba",
    deliverTo: "1600 Pennsylvania Avenue NW, Washington, DC 20500",
    mobileNumber: "(202) 456-1111",
    status: "out-for-delivery",
    dishes: [
      {
        id: "90c3d873684bf381dfab29034b5bba73",
        name: "Falafel and tahini bagel",
        description: "A warm bagel filled with falafel and tahini",
        image_url:
          "https://images.pexels.com/photos/4560606/pexels-photo-4560606.jpeg?h=530&w=350",
        price: 6,
        quantity: 1,
      },
    ],
  }
```

Updating an order:

```
fetch('localhost:5000/orders/f6069a542257054114138301947672ba', {
  method: 'PUT',
  body: JSON.stringify({
    id: "f6069a542257054114138301947672ba",
    deliverTo: "1600 Pennsylvania Avenue NW, Washington, DC 20500",
    mobileNumber: "(555) 555-5555",
    status: "out-for-delivery",
    dishes: [
      {
        id: "90c3d873684bf381dfab29034b5bba73",
        name: "Falafel and tahini bagel",
        description: "A warm bagel filled with falafel and tahini",
        image_url:
          "https://images.pexels.com/photos/4560606/pexels-photo-4560606.jpeg?h=530&w=350",
        price: 6,
        quantity: 1,
      },
    ],
  }),
  headers: {
    'Content-type': 'application/json; charset=UTF-8',
  },
})
```

Output:

```
{
    id: "f6069a542257054114138301947672ba",
    deliverTo: "1600 Pennsylvania Avenue NW, Washington, DC 20500",
    mobileNumber: "(555) 555-5555",
    status: "out-for-delivery",
    dishes: [
      {
        id: "90c3d873684bf381dfab29034b5bba73",
        name: "Falafel and tahini bagel",
        description: "A warm bagel filled with falafel and tahini",
        image_url:
          "https://images.pexels.com/photos/4560606/pexels-photo-4560606.jpeg?h=530&w=350",
        price: 6,
        quantity: 1,
      },
    ],
  }
```

Deleting an order:

```
fetch('localhost:5000/orders/f6069a542257054114138301947672ba', {
  method: 'DELETE',
  body: JSON.stringify({
    id: "f6069a542257054114138301947672ba
    }),
  headers: {
    'Content-type': 'application/json; charset=UTF-8',
  },
})
```

Output:

```
{}
```
