const Category = require('../../models/categoryModel');
const Product = require('../../models/productModel');

function createCategories(categories, parentId = null) {
    const categoryList = [];
    let category;

    if (parentId == null){
        category = categories.filter(dog => dog.parentId == undefined)
    } else {
        category = categories.filter(dog => dog.parentId == parentId)
    }

    for(let cat of categories){
        categoryList.push({
            name: cat.name,
            _id: cat._id,
            slug: cat.slug,
            parentId: cat.parentId,
            children: createCategories(categories, cat._id)
        })
    }
    return categoryList;
}

exports.initialData = async(req, res) => {
    const categories = await Category.find({}).exec();
    const products = await Product.find({})
                                .select(`_id name price quantity slug description productPictures category`)
                                .populate({ path: 'category', select: '_id name'})
                                .exec();
    res.status(200).json({
        categories: createCategories(categories),
        products
    })
}