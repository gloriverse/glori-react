import Product from '../../models/Product'
import Cart from '../../models/Cart'
import connectDb from '../../utils/connectDb'

connectDb()

export default async (req, res) => {
    switch (req.method) {
        case "GET":
            await handleGetRequest(req, res)
            break;
        case "POST":
            await handlePostRequest(req, res)
            break;
        case "DELETE":
            await handleDeleteRequest(req, res)
            break;
        default:
            res.status(405).send(`Method ${req.method} not allowed`);
            break;

    }
}


async function handleGetRequest(req, res) {
    const { _id } = req.query
    const product = await Product.findOne({ _id })
    res.status(200).json(product)
}

async function handlePostRequest(req, res) {
    const { name, price, description, mediaUrl } = req.body
    try {
        if (!name || !price || !description || !mediaUrl) {
            return res.status(422).send("Product missing one or more field")
        }
        const product = await new Product({
            name,
            price,
            description,
            mediaUrl
        }).save()
        res.status(201).json(product)
    } catch (error) {
        console.error(error)
        res.status(500).send("Server Error in creating product")
    }

}

async function handleDeleteRequest(req, res) {
    const { _id } = req.query

    try {
        //deelte product by id
        await Product.findOneAndDelete({ _id })

        //remove product from all cart 
        await Cart.updateMany(
            {"products.product":_id},
            {$pull:{products:{product: _id}}}
        )
    } catch (error) {
        console.error(error)
        res.status(500).send('Error deleting Product')
    }
   
    res.status(204).json({})
}
