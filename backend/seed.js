const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Product = require('../models/Product');

dotenv.config({ path: '../.env' });

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI);
        console.log(`MongoDB Connected: ${conn.connection.host}`);
    } catch (error) {
        console.error(error);
        process.exit(1);
    }
};

const menProducts = [
    {
        name: "Wool crew-neck sweater ",
        description: "Iconic nylon jacket from nvrmnd Re-Edition 2005 collection. Features the signature triangle logo and technical fabric construction.",
        price: 299.99,
        image: "https://www.prada.com/content/dam/pradabkg_products/U/UMF/UMF040/17KDF0036/UMF040_17KD_F0036_S_OOO_SLF.jpg/_jcr_content/renditions/cq5dam.web.hebebed.1200.1200.jpg",
        category: "men",
        stock: 8
    },
      {
        _id: '2',
        name: "Wool pants",
        description: "Woolen pant remastered in color Ebony.",
        price: 577.89,
        image: "https://www.prada.com/content/dam/pradabkg_products/U/UP0/UP0355/1W2GF0192/UP0355_1W2G_F0192_S_VMO_SLF.jpg/_jcr_content/renditions/cq5dam.web.hebebed.2400.2400.jpg",
        category: "men",
        stock: 5
    },
    {
        _id: '3',
        name: "Wool blouson jacket with shearling collar",
        description: "Woolen jacket with fluffy collar in color Ebony.",
        price: 867.99,
        image: "https://www.prada.com/content/dam/pradabkg_products/S/SGC/SGC958/1UPKF0192/SGC958_1UPK_F0192_S_OOO_SLF.jpg/_jcr_content/renditions/cq5dam.web.hebebed.2400.2400.jpg",
        category: "men",
        stock: 7
    },
    {
        _id: '4',
        name: "Cotton pants",
        description: "Blue cotton pants with a relaxed fit, perfect for casual wear.",
        price: 499.77,
        image: "https://www.prada.com/content/dam/pradabkg_products/S/SPH/SPH485/1U7YF0012/SPH485_1U7Y_F0012_S_OOO_SLF.jpg/_jcr_content/renditions/cq5dam.web.hebebed.2400.2400.jpg",
        category: "men",
        stock: 57
    },
    {
        _id: '5',
        name: "Prada Buckle antiqued leather bag with belt",
        description: "leather bag with printed logo and belt in beige, brown and remastered style of fashion.",
        price: 8990.89,
        image: "https://www.prada.com/content/dam/pradabkg_products/2/2VG/2VG126/2HKFF077M/2VG126_2HKF_F077M_V_OJ2_SLF.jpg/_jcr_content/renditions/cq5dam.web.hebebed.2400.2400.jpg",
        category: "men",
        stock: 48
    },
    {
        _id: '6',
        name: "Printed Fabric Boot",
        description: "An archive silhouette inspires the design of these texan boots made of fabric and animated with a lively floral print.",
        price: 1236.67,
        image: "https://www.prada.com/content/dam/pradabkg_products/2/2WE/2WE002/3LRAF0F24/2WE002_3LRA_F0F24_F_D001_SLR.jpg/_jcr_content/renditions/cq5dam.web.hebebed.2400.2400.jpg",
        category: "men",
        stock: 63
    },


];

const importData = async () => {
    try {
        await Product.deleteMany();
        await Product.insertMany(menProducts);
        console.log('Data Imported!');
        process.exit();
    } catch (error) {
        console.error(`${error}`);
        process.exit(1);
    }
};

const destroyData = async () => {
    try {
        await Product.deleteMany();
        console.log('Data Destroyed!');
        process.exit();
    } catch (error) {
        console.error(`${error}`);
        process.exit(1);
    }
};

if (process.argv[2] === '-d') {
    destroyData();
} else {
    importData();
}

connectDB();