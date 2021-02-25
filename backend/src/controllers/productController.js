const Product = require('../models/productModel');
const shortid = require('shortid');
const slugify = require('slugify');

exports.createProduct = (req, res) => {
    const {
        name, price, description, category, quantity, createBy
    } = req.body;

    let productPicture = [];
    if(req.files.length > 0){
        productPicture = req.files.map(file => {
            return { img: file.fileName }
        })
    }

    const product = new Product({
        name: req.body.name,
        slug: slugify(name),
        price,
        quantity,
        description,
        productPicture,
        category,
        createBy: req.user._id
    });

    product.save((error, product) => {
        if(error) return res.status(400).json({ error });
        if(product){
            res.status(201).json({ product })
        }
    })
}