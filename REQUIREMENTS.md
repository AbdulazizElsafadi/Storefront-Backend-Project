# API Requirements

The company stakeholders want to create an online storefront to showcase their great product ideas. Users need to be able to browse an index of all products, see the specifics of a single product, and add products to an order that they can view in a cart page. You have been tasked with building the API that will support this application, and your coworker is building the frontend.

These are the notes from a meeting with the frontend developer that describe what endpoints the API needs to supply, as well as data shapes the frontend and backend have agreed meet the requirements of the application.

## API Endpoints

#### Products

- Index
- Show
- Create [token required]
- [OPTIONAL] Top 5 most popular products
- [OPTIONAL] Products by category (args: product category)

#### Users

- Index [token required]
- Show [token required]
- Create N[token required]

#### Orders

- Current Order by user (args: user id)[token required]
- [OPTIONAL] Completed Orders by user (args: user id)[token required]

## Data Shapes

#### Product

- id
- name
- price
- [OPTIONAL] category

#### User

- id
- firstName
- lastName
- password

#### Orders

- id
- id of each product in the order
- quantity of each product in the order
- user_id
- status of order (active or complete)

## RESTful Routes

### 1- Users

- An INDEX route: '/users' [GET]
- A SHOW route: '/users/:id' [GET]
- A CREATE route: '/users' [POST]

### 2- Products

- An INDEX route: '/products' [GET]
- A SHOW route: '/products/:id' [GET]
- A CREATE route: '/products' [POST]

### 3- Orders

- an INDEX route: 'orders' [GET]
- a CREATE route: 'orders' [POST]
- ADD PRODUCT route: '/orders/:order_id/products' [post]
- CURRENT USER ORDERS route: '/orders/users/:user_id/current' [GET]

## Database Design

- The database contains 4 tables:

1- Users(id:SERIAL PRIMARY KEY, firstName:VARCHAR, lastName:VARCHAR, password:VARCHAR)

2- Products(id:SERIAL PRIMARY KEY, name:VARCHAR, price:INGEGER)

3- Orders(id SERIAL PRIMARY KEY, user_id INTEGER[foreign key to Users table], status VARCHAR(100))

4- Order_products(id SERIAL PRIMARY KEY, order_id: INTEGER[foreign key to Orders table], product_id:VARCHAR[foreign key to Products table], quantity INETEGER)
