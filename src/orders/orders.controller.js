const path = require("path");
const orders = require(path.resolve("src/data/orders-data"));
const nextId = require("../utils/nextId");

// HELPERS
function hasDeliverTo(req, res, next) {
  const { deliverTo = null } = req.body.data;
  if (deliverTo === null) {
    next({
      status: 400,
      message: `Order must include a deliverTo`,
    });
  } else {
    return next();
  }
}

function deliverToIsNotEmpty(req, res, next) {
  const { deliverTo } = req.body.data;
  if (deliverTo.length === 0) {
    next({
      status: 400,
      message: `Order must include a deliverTo`,
    });
  } else {
    return next();
  }
}

function hasMobileNumber(req, res, next) {
  const { mobileNumber = null } = req.body.data;
  if (mobileNumber === null) {
    next({
      status: 400,
      message: `Order must include a mobileNumber`,
    });
  } else {
    return next();
  }
}

function mobileNumberIsNotEmpty(req, res, next) {
  const { mobileNumber } = req.body.data;
  if (mobileNumber.length === 0) {
    next({
      status: 400,
      message: `Order must include a mobileNumber`,
    });
  } else {
    return next();
  }
}

function hasDishes(req, res, next) {
  const { dishes = null } = req.body.data;
  if (dishes === null) {
    next({
      status: 400,
      message: `Order must include a dish`,
    });
  } else {
    return next();
  }
}

function dishesIsAnArray(req, res, next) {
  const { dishes } = req.body.data;
  if (!Array.isArray(dishes)) {
    next({
      status: 400,
      message: `Order must include at least one dish`,
    });
  } else {
    return next();
  }
}

function dishesIsNotEmpty(req, res, next) {
  const { dishes } = req.body.data;
  if (dishes.length === 0) {
    next({
      status: 400,
      message: `Order must include at least one dish`,
    });
  } else {
    return next();
  }
}

function dishHasQuantity(req, res, next) {
  const { dishes } = req.body.data;

  dishes.forEach(({ quantity = null }, index) => {
    if (quantity === null) {
      next({
        status: 400,
        message: `Dish ${index} must have a quantity that is an integer greater than 0`,
      });
    }
  });

  return next();
}

function dishQuantityIsAnInteger(req, res, next) {
  const { dishes } = req.body.data;

  dishes.forEach(({ quantity }, index) => {
    if (typeof quantity != "number" || quantity % 1 != 0) {
      next({
        status: 400,
        message: `Dish ${index} must have a quantity that is an integer greater than 0`,
      });
    }
  });

  return next();
}

function dishQuantityIsGreaterThanZero(req, res, next) {
  const { dishes } = req.body.data;
  dishes.forEach(({ quantity }, index) => {
    if (quantity <= 0) {
      next({
        status: 400,
        message: `Dish ${index} must have a quantity that is an integer greater than 0`,
      });
    }
  });

  return next();
}

function orderExists(req, res, next) {
  const { orderId } = req.params;
  const foundOrder = orders.find((order) => order.id === orderId);
  if (!foundOrder) {
    next({
      status: 404,
      message: `Order ${orderId} does not exist`,
    });
  } else {
    res.locals.order = foundOrder;
    return next();
  }
}

function idMatches(req, res, next) {
  const { orderId } = req.params;
  const { id = null } = req.body.data;
  if (id && orderId != id) {
    next({
      status: 400,
      message: `Order id does not match route id. Order: ${id}, Route: ${orderId}`,
    });
  } else {
    return next();
  }
}

function orderIsPending(req, res, next) {
  const { status } = res.locals.order;
  if (status !== "pending") {
    next({
      status: 400,
      message: "An order cannot be deleted unless it is pending",
    });
  } else {
    return next();
  }
}

function hasStatus(req, res, next) {
  const { status = null } = req.body.data;
  if (status === null) {
    next({
      status: 400,
      message:
        "Order must have a status of pending, preparing, out-for-delivery, delivered",
    });
  } else {
    return next();
  }
}

function statusIsNotEmpty(req, res, next) {
  const { status } = req.body.data;
  if (status === "") {
    next({
      status: 400,
      message:
        "Order must have a status of pending, preparing, out-for-delivery, delivered",
    });
  } else {
    return next();
  }
}

function statusIsNotDelivered(req, res, next) {
  const { status } = res.locals.order;
  if (status === "delivered") {
    next({
      status: 400,
      message: "A delivered order cannot be changed",
    });
  } else {
    return next();
  }
}

function statusIsNotInvalid(req, res, next) {
  const { status } = req.body.data;
  if (status === "invalid") {
    next({
      status: 400,
      message: "Order status is invalid",
    });
  } else {
    return next();
  }
}

// HANDLERS
function list(req, res) {
  res.json({ data: orders });
}

function create(req, res) {
  const { id, deliverTo, mobileNumber, status, dishes } = req.body.data;
  const newId = nextId();
  const newOrder = { id, deliverTo, mobileNumber, status, dishes, id: newId };
  orders.push(newOrder);
  res.status(201).json({ data: newOrder });
}

function read(req, res) {
  const order = res.locals.order;
  res.json({ data: order });
}

function update(req, res) {
  const pathOrderId = req.params.orderId;
  const { id, deliverTo, mobileNumber, status, dishes } = req.body.data;
  const index = orders.findIndex((order) => order.id === pathOrderId);
  let orderToUpdate = orders[index];
  orderToUpdate = {
    ...orders[index],
    deliverTo,
    mobileNumber,
    status,
    dishes,
  };

  if (id) {
    orderToUpdate = { ...orderToUpdate, id };
  }

  orders[index] = orderToUpdate;

  res.json({ data: orders[index] });
}

function destroy(req, res) {
  const { orderId } = req.params;
  const orderIndex = orders.findIndex((order) => order.id === orderId);
  orders.splice(orderIndex, 1);
  res.sendStatus(204);
}

module.exports = {
  list,
  create: [
    hasDeliverTo,
    deliverToIsNotEmpty,
    hasMobileNumber,
    mobileNumberIsNotEmpty,
    hasDishes,
    dishesIsAnArray,
    dishesIsNotEmpty,
    dishHasQuantity,
    dishQuantityIsAnInteger,
    dishQuantityIsGreaterThanZero,
    create,
  ],
  read: [orderExists, read],
  update: [
    orderExists,
    idMatches,
    hasDeliverTo,
    deliverToIsNotEmpty,
    hasMobileNumber,
    mobileNumberIsNotEmpty,
    hasDishes,
    dishesIsAnArray,
    dishesIsNotEmpty,
    dishHasQuantity,
    dishQuantityIsAnInteger,
    dishQuantityIsGreaterThanZero,
    hasStatus,
    statusIsNotEmpty,
    statusIsNotDelivered,
    statusIsNotInvalid,
    update,
  ],
  destroy: [orderExists, orderIsPending, destroy],
};
