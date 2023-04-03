# GrubDash

## This is the API and routing for an app that enables a developer to access and manipulate dishes and orders data.

Routes support GET, POST, PUT, DELETE operations. Other operations are not allowed.

Validation is performed on POST, PUT, and DELETE operations to ensure the integrity of the data.

All dishes are accessible via /dishes, and individual dishes are accessible via /dishes/:dishId. A dish can be created and updated, but _not_ deleted.

All orders are accessible via /orders, and individual orders are assessible via orders/orderId. An order can be updated or deleted.

_Note_: that an order can no longer be deleted once its status has been set to _delivered_.
