const path = require("path");
const dishes = require(path.resolve("src/data/dishes-data"));

// Use this function to assign ID's when necessary
const nextId = require("../utils/nextId");

// VALIDATION
function hasName(req, res, next) {
  const { name = null } = req.body.data;
  if (name === null) {
    next({
      status: 400,
      message: "name property missing",
    });
  } else {
    return next();
  }
}

function hasValidName(req, res, next) {
  const { name } = req.body.data;
  if (name.length === 0) {
    next({
      status: 400,
      message: "name property empty",
    });
  } else {
    return next();
  }
}

function hasDescription(req, res, next) {
  const { description = null } = req.body.data;
  if (description === null) {
    next({
      status: 400,
      message: "description property missing",
    });
  } else {
    return next();
  }
}

function hasValidDescription(req, res, next) {
  const { description } = req.body.data;
  if (description.length === 0) {
    next({
      status: 400,
      message: "description property empty",
    });
  } else {
    return next();
  }
}

function hasPrice(req, res, next) {
  const { price = null } = req.body.data;
  if (price === null) {
    next({
      status: 400,
      message: "price property missing,",
    });
  } else {
    return next();
  }
}

function hasIntegerPrice(req, res, next) {
  const { price } = req.body.data;
  if (typeof price != "number") {
    next({
      status: 400,
      message: `price property has type ${typeof price}, expected a number`,
    });
  } else if (price % 1 > 0) {
    next({
      status: 400,
      message: `price property is a float, expected an integer`,
    });
  } else {
    return next();
  }
}

function hasValidPrice(req, res, next) {
  const { price } = req.body.data;
  if (price <= 0) {
    next({
      status: 400,
      message: `price property has value ${price}, expected > 0`,
    });
  } else {
    return next();
  }
}

function hasImage(req, res, next) {
  const { image_url = null } = req.body.data;
  if (image_url === null) {
    next({
      status: 400,
      message: "image_url property missing,",
    });
  } else {
    return next();
  }
}

function hasValidImage(req, res, next) {
  const { image_url } = req.body.data;
  if (image_url.length === 0) {
    next({
      status: 400,
      message: "image_url property empty",
    });
  } else {
    return next();
  }
}

function dishExists(req, res, next) {
  const { dishId } = req.params;
  const foundDish = dishes.find((dish) => dish.id === dishId);

  if (!foundDish) {
    next({
      status: 404,
      message: `Dish does not exist: ${dishId}`,
    });
  } else {
    res.locals.dish = foundDish;
    return next();
  }
}

function dishIdMatches(req, res, next) {
  const { dishId } = req.params;
  const requestId = req.body.data.id;
  const match = dishId === requestId;
  if (requestId && !match) {
    next({
      status: 400,
      message: `Dish id does not match route id. Dish: ${requestId}, Route: ${dishId}`,
    });
  } else {
    return next();
  }
}

// HANDLERS
function list(req, res) {
  res.json({ data: dishes });
}

function create(req, res) {
  const { name, description, price, image_url } = req.body.data;
  const id = nextId();
  const newDish = {
    name,
    description,
    price,
    image_url,
    id,
  };
  dishes.push(newDish);
  res.status(201).json({ data: newDish });
}

function read(req, res) {
  const dish = res.locals.dish;
  res.json({ data: dish });
}

function update(req, res) {
  const oldDish = res.locals.dish;
  const { name, description, price, image_url, id } = req.body.data;
  const dishIndex = dishes.findIndex((dish) => dish.id === oldDish.id);
  dishes[dishIndex] = { ...oldDish, name, description, price, image_url };
  if (id) {
    dishes[dishIndex] = { ...dishes[dishIndex], id };
  }
  res.send({ data: dishes[dishIndex] });
}

// EXPORTS
module.exports = {
  list,
  create: [
    hasName,
    hasValidName,
    hasDescription,
    hasValidDescription,
    hasPrice,
    hasIntegerPrice,
    hasValidPrice,
    hasImage,
    hasValidImage,
    create,
  ],
  read: [dishExists, read],
  update: [
    hasName,
    hasValidName,
    hasDescription,
    hasValidDescription,
    hasPrice,
    hasIntegerPrice,
    hasValidPrice,
    hasImage,
    hasValidImage,
    dishExists,
    dishIdMatches,
    update,
  ],
};
