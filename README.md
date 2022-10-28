# Approved Energy Full Stack Developer Test Submission

## Grocery Dashboard Overview
This project is a full stack application that is designed to run a grocery business and maintain records digitally with full CRUD functionality. Grocery Dashboard features customers, products and the orders associating both elements. A user can create, read, update, and delete records with full validation to guide proper inputs and actions.  

To test the application:
1. Type `npm install` to install backend dependencies
2. Type `npm run frontend-install` to install frontend dependencies
3. Type `npm run dev` to run both backend and frontend servers of the app locally

## Technologies
#### Backend
- Node JS
- Express JS

#### Database
- MongoDB
- Mongoose

#### Frontend
- Javascript
- React


## Main Features

### Validation

- to maintain quality of records stored, all requests are validated both in the backend (routes and mongoose schema validations) and frontend
- any invalid input (empty, alphanumeric, or fully alphabetic) should prompt for another entry and will halt the request sequence.
	
### Backend Resource Management

- any customer or product record deleted automatically deletes an order referencing either for cleanup   
	
### Frontend User Interface

- the frontend UI reflects and displays the records in the database
- all CRUD functionality can be performed provided by the list of records, forms, and buttons

![image](https://user-images.githubusercontent.com/86270564/198747099-70ff64ac-830c-4a29-9283-551de1523b9e.png)


## Highlight

#### Validate customer input


- given the data request object, this function validates each property and returns an object containing all errors if any
- this is using Validator library

```
module.exports = function validateUpdateCustomerInput(data) {
    let errors = {};
    let updateProperties = {
        email: data.email !== undefined ? true : false,
        name: data.name !== undefined ? true : false,
        address: data.address !== undefined ? true : false,
        phone: data.phone !== undefined ? true : false 
    };

    data.email = updateProperties.email ? (validText(data.email) ? data.email : '') : undefined
    data.name = updateProperties.name ? (validText(data.name) ? data.name : '') : undefined
    data.address = updateProperties.address ? (validText(data.address) ? data.address : ''): undefined
    data.phone = updateProperties.phone ? (validNumber(data.phone) ? data.phone : '') : undefined

    if (updateProperties.email) {
        if (!Validator.isEmail(data.email)) {
            errors.email = "Email is invalid";
        }
        if (Validator.isEmpty(data.email)) {
            errors.email = "Email is required";
        }
    }

    if (updateProperties.name) {
        if (Validator.isEmpty(data.name)) {
            errors.name = "Name is required";
        }
    }

    if (updateProperties.address) {
        if (Validator.isEmpty(data.address)) {
            errors.address = "Address is required";
        }
    }

    if (updateProperties.phone) {
        if (!Validator.isNumeric(data.phone)) {
            errors.phone = "Phone number is invalid";
        }
    }

    return {
        errors,
        isValid: Object.keys(errors).length === 0
    }
};
```
 
 
#### Automatic Deletion of Orders


- an order is deleted if a product it's referencing becomes deleted
- all backend queries are handled by Mongoose

```
router.delete("/deleteProduct/:product_id", (req, res) => {
    Product.findByIdAndDelete(req.params.product_id, function(error, deletedProduct) {
        if (error || deletedProduct === null) {
            return res.status(400).json({ error: "This product does not exist" });
        } else {
            const deletedInstance = { "productId" : ObjectId(req.params.product_id) }

            Order.deleteMany(deletedInstance, function(error, deletedOrders) {
                if (error || deletedOrders === null) {
                    return res.status(400).json({ error: "There are no orders for this product" });
                } 
                else {
                    return res.json({ deletedOrdersCount: deletedOrders.deletedCount, deletedProduct: deletedProduct });
                }
            });
        }
    });
});
```


## Future Additions
- Handle product quantity management for an order (currently assumes there's an unlimited quantity for each product)
- Add a model for types of products
- Add authentication


