// Global variables
let products = [];
let user = null;
let token = localStorage.getItem('token');

// Gender Selection Modal Functions
function openGenderModal() {
    document.getElementById('genderModal').style.display = 'block';
    document.body.style.overflow = 'hidden';
}

function closeGenderModal() {
    document.getElementById('genderModal').style.display = 'none';
    document.body.style.overflow = 'auto';
}

// Close modal when clicking outside
window.onclick = function(event) {
    const modal = document.getElementById('genderModal');
    if (event.target == modal) {
        closeGenderModal();
    }
}

// Close modal on escape key
document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape') {
        closeGenderModal();
    }
});

// Utility functions for animations and interactions
function showNotification(message, type = 'success') {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;
    document.body.appendChild(notification);

    setTimeout(() => {
        notification.style.animation = 'slideOutRight 0.5s ease-out';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 500);
    }, 3000);
}

function showLoading(element) {
    const loading = document.createElement('div');
    loading.className = 'loading';
    element.appendChild(loading);
    return loading;
}

function hideLoading(loadingElement) {
    if (loadingElement && loadingElement.parentNode) {
        loadingElement.parentNode.removeChild(loadingElement);
    }
}

function smoothScrollTo(element) {
    element.scrollIntoView({ behavior: 'smooth' });
}

// Add smooth scrolling to navigation links
document.addEventListener('DOMContentLoaded', function() {
    const navLinks = document.querySelectorAll('nav a[href^="#"]');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            if (targetElement) {
                smoothScrollTo(targetElement);
            }
        });
    });
});

// Outfit data for Shop the Look
const outfitData = {
    1: {
        name: "Urban Minimalist Look",
        items: [
            { id: '1', name: "Wool crew-neck sweater", price: 299.99, image: "https://www.prada.com/content/dam/pradabkg_products/U/UMF/UMF040/17KDF0036/UMF040_17KD_F0036_S_OOO_SLF.jpg/_jcr_content/renditions/cq5dam.web.hebebed.1200.1200.jpg" },
            { id: '2', name: "Wool pants", price: 577.89, image: "https://www.prada.com/content/dam/pradabkg_products/U/UP0/UP0355/1W2GF0192/UP0355_1W2G_F0192_S_VMO_SLF.jpg/_jcr_content/renditions/cq5dam.web.hebebed.2400.2400.jpg" },
            { id: '3', name: "Wool blouson jacket with shearling collar", price: 867.99, image: "https://www.prada.com/content/dam/pradabkg_products/S/SGC/SGC958/1UPKF0192/SGC958_1UPK_F0192_S_OOO_SLF.jpg/_jcr_content/renditions/cq5dam.web.hebebed.2400.2400.jpg" },
            { id: '4', name: "Cotton pants", price: 499.77, image: "https://www.prada.com/content/dam/pradabkg_products/S/SPH/SPH485/1U7YF0012/SPH485_1U7Y_F0012_S_OOO_SLF.jpg/_jcr_content/renditions/cq5dam.web.hebebed.2400.2400.jpg" }
        ]
    },
    2: {
        name: "Classic Elegance Ensemble",
        items: [
            { id: '5', name: "Buckle antiqued leather bag with belt", price: 8990.89, image: "https://www.prada.com/content/dam/pradabkg_products/2/2VG/2VG126/2HKFF077M/2VG126_2HKF_F077M_V_OJ2_SLF.jpg/_jcr_content/renditions/cq5dam.web.hebebed.2400.2400.jpg" },
            { id: '6', name: "Printed Fabric Boot", price: 1236.67, image: "https://www.prada.com/content/dam/pradabkg_products/2/2WE/2WE002/3LRAF0F24/2WE002_3LRA_F0F24_F_D001_SLR.jpg/_jcr_content/renditions/cq5dam.web.hebebed.2400.2400.jpg" },
            { id: '1', name: "Wool crew-neck sweater", price: 299.99, image: "https://www.prada.com/content/dam/pradabkg_products/U/UMF/UMF040/17KDF0036/UMF040_17KD_F0036_S_OOO_SLF.jpg/_jcr_content/renditions/cq5dam.web.hebebed.1200.1200.jpg" },
            { id: '2', name: "Wool pants", price: 577.89, image: "https://www.prada.com/content/dam/pradabkg_products/U/UP0/UP0355/1W2GF0192/UP0355_1W2G_F0192_S_VMO_SLF.jpg/_jcr_content/renditions/cq5dam.web.hebebed.2400.2400.jpg" }
        ]
    },
    3: {
        name: "Modern Street Style",
        items: [
            { id: '3', name: "Wool blouson jacket with shearling collar", price: 867.99, image: "https://www.prada.com/content/dam/pradabkg_products/S/SGC/SGC958/1UPKF0192/SGC958_1UPK_F0192_S_OOO_SLF.jpg/_jcr_content/renditions/cq5dam.web.hebebed.2400.2400.jpg" },
            { id: '4', name: "Cotton pants", price: 499.77, image: "https://www.prada.com/content/dam/pradabkg_products/S/SPH/SPH485/1U7YF0012/SPH485_1U7Y_F0012_S_OOO_SLF.jpg/_jcr_content/renditions/cq5dam.web.hebebed.2400.2400.jpg" },
            { id: '6', name: "Printed Fabric Boot", price: 1236.67, image: "https://www.prada.com/content/dam/pradabkg_products/2/2WE/2WE002/3LRAF0F24/2WE002_3LRA_F0F24_F_D001_SLR.jpg/_jcr_content/renditions/cq5dam.web.hebebed.1200.1200.jpg" },
            { id: '5', name: "Buckle antiqued leather bag with belt", price: 8990.89, image: "https://www.prada.com/content/dam/pradabkg_products/2/2VG/2VG126/2HKFF077M/2VG126_2HKF_F077M_V_OJ2_SLF.jpg/_jcr_content/renditions/cq5dam.web.hebebed.2400.2400.jpg" }
        ]
    },
    4: {
        name: "Sophisticated Evening Wear",
        items: [
            { id: '1', name: "Wool crew-neck sweater", price: 299.99, image: "https://www.prada.com/content/dam/pradabkg_products/U/UMF/UMF040/17KDF0036/UMF040_17KD_F0036_S_OOO_SLF.jpg/_jcr_content/renditions/cq5dam.web.hebebed.1200.1200.jpg" },
            { id: '3', name: "Wool blouson jacket with shearling collar", price: 867.99, image: "https://www.prada.com/content/dam/pradabkg_products/S/SGC/SGC958/1UPKF0192/SGC958_1UPK_F0192_S_OOO_SLF.jpg/_jcr_content/renditions/cq5dam.web.hebebed.2400.2400.jpg" },
            { id: '2', name: "Wool pants", price: 577.89, image: "https://www.prada.com/content/dam/pradabkg_products/U/UP0/UP0355/1W2GF0192/UP0355_1W2G_F0192_S_VMO_SLF.jpg/_jcr_content/renditions/cq5dam.web.hebebed.2400.2400.jpg" },
            { id: '5', name: "Buckle antiqued leather bag with belt", price: 8990.89, image: "https://www.prada.com/content/dam/pradabkg_products/2/2VG/2VG126/2HKFF077M/2VG126_2HKF_F077M_V_OJ2_SLF.jpg/_jcr_content/renditions/cq5dam.web.hebebed.2400.2400.jpg" }
        ]
    }
};

// Sample women's products for demo
const sampleWomenProducts = [
    {
        _id: '8',
        name: "Short-sleeved wool knit sweater with pendants",
        description: "Timeless wool mini wool sweater with a fitted silhouette and elegant pendant.",
        price: 8590.00,
        image: "https://www.prada.com/content/dam/pradabkg_products/P/P24/P24V2L/17ZEF0037/P24V2L_17ZE_F0037_S_OOO_SLF.jpg/_jcr_content/renditions/cq5dam.web.hebebed.2400.2400.jpg",
        category: "women",
        stock: 8,
        gallery: [
            "https://www.prada.com/content/dam/pradabkg_products/S/SD/SD023/1W2GF0193/SD023_1W2G_F0193_S_045_SLF.jpg/_jcr_content/renditions/cq5dam.web.hebebed.1200.1200.jpg",
            "https://www.prada.com/content/dam/pradabkg_products/S/SD/SD023/1W2GF0193/SD023_1W2G_F0193_S_046_SLF.jpg/_jcr_content/renditions/cq5dam.web.hebebed.1200.1200.jpg",
            "https://www.prada.com/content/dam/pradabkg_products/S/SD/SD023/1W2GF0193/SD023_1W2G_F0193_S_047_SLF.jpg/_jcr_content/renditions/cq5dam.web.hebebed.1200.1200.jpg",
            "https://www.prada.com/content/dam/pradabkg_products/S/SD/SD023/1W2GF0193/SD023_1W2G_F0193_S_048_SLF.jpg/_jcr_content/renditions/cq5dam.web.hebebed.1200.1200.jpg"
        ]
    },
    {
        _id: '9',
        name: "Mouliné wool dress",
        description: "Crafted wool dress with a sleek design and comfortable fit.",
        price: 3250.00,
        image: "https://www.prada.com/content/dam/pradabkg_products/P/P3Q/P3Q75K/18D6F04RV/P3Q75K_18D6_F04RV_S_OOO_SLF.jpg/_jcr_content/renditions/cq5dam.web.hebebed.2400.2400.jpg",
        category: "women",
        stock: 15,
        gallery: [
            "https://www.prada.com/content/dam/pradabkg_products/2/2WE/2WE002/3LRAF0F25/2WE002_3LRA_F0F25_F_045_SLR.jpg/_jcr_content/renditions/cq5dam.web.hebebed.1200.1200.jpg",
            "https://www.prada.com/content/dam/pradabkg_products/2/2WE/2WE002/3LRAF0F25/2WE002_3LRA_F0F25_F_046_SLR.jpg/_jcr_content/renditions/cq5dam.web.hebebed.1200.1200.jpg",
            "https://www.prada.com/content/dam/pradabkg_products/2/2WE/2WE002/3LRAF0F25/2WE002_3LRA_F0F25_F_047_SLR.jpg/_jcr_content/renditions/cq5dam.web.hebebed.1200.1200.jpg",
            "https://www.prada.com/content/dam/pradabkg_products/2/2WE/2WE002/3LRAF0F25/2WE002_3LRA_F0F25_F_048_SLR.jpg/_jcr_content/renditions/cq5dam.web.hebebed.1200.1200.jpg"
        ]
    },
    {
        _id: '10',
        name: "Shearling and cloth coat",
        description: "Luxurious shearling coat with a modern cut and premium finish.",
        price: 2850.00,
        image: "https://www.prada.com/content/dam/pradabkg_products/5/56A/56A218/15PFF0572/56A218_15PF_F0572_S_OOO_SLF.jpg/_jcr_content/renditions/cq5dam.web.hebebed.2400.2400.jpg",
        category: "women",
        stock: 6,
        gallery: [
            "https://www.prada.com/content/dam/pradabkg_products/S/SC/SC023/1W2GF0194/SC023_1W2G_F0194_S_045_SLF.jpg/_jcr_content/renditions/cq5dam.web.hebebed.1200.1200.jpg",
            "https://www.prada.com/content/dam/pradabkg_products/S/SC/SC023/1W2GF0194/SC023_1W2G_F0194_S_046_SLF.jpg/_jcr_content/renditions/cq5dam.web.hebebed.1200.1200.jpg",
            "https://www.prada.com/content/dam/pradabkg_products/S/SC/SC023/1W2GF0194/SC023_1W2G_F0194_S_047_SLF.jpg/_jcr_content/renditions/cq5dam.web.hebebed.1200.1200.jpg",
            "https://www.prada.com/content/dam/pradabkg_products/S/SC/SC023/1W2GF0194/SC023_1W2G_F0194_S_048_SLF.jpg/_jcr_content/renditions/cq5dam.web.hebebed.1200.1200.jpg"
        ]
    },
    {
        _id: '11',
        name: "Shetland wool dress",
        description: "Elegant wool dress with artistic drape and luxurious texture.",
        price: 6500.00,
        image: "https://www.prada.com/content/dam/pradabkg_products/P/P67/P674SY/18OYF0480/P674SY_18OY_F0480_S_OOO_SLF.jpg/_jcr_content/renditions/cq5dam.web.hebebed.2400.2400.jpg",
        category: "women",
        stock: 20,
        gallery: [
            "https://www.prada.com/content/dam/pradabkg_products/S/SA/SA023/1W2GF0003/SA023_1W2G_F0003_S_045_SLF.jpg/_jcr_content/renditions/cq5dam.web.hebebed.1200.1200.jpg",
            "https://www.prada.com/content/dam/pradabkg_products/S/SA/SA023/1W2GF0003/SA023_1W2G_F0003_S_046_SLF.jpg/_jcr_content/renditions/cq5dam.web.hebebed.1200.1200.jpg",
            "https://www.prada.com/content/dam/pradabkg_products/S/SA/SA023/1W2GF0003/SA023_1W2G_F0003_S_047_SLF.jpg/_jcr_content/renditions/cq5dam.web.hebebed.1200.1200.jpg",
            "https://www.prada.com/content/dam/pradabkg_products/S/SA/SA023/1W2GF0003/SA023_1W2G_F0003_S_048_SLF.jpg/_jcr_content/renditions/cq5dam.web.hebebed.1200.1200.jpg"
        ]
    },
    {
        _id: '12',
        name: "Floral print cloquet dress",
        description: "Sophisticated adorned floral dress and premium finish.",
        price: 3200.00,
        image: "https://www.prada.com/content/dam/pradabkg_products/P/P3Q/P3Q66K/18E7F0028/P3Q66K_18E7_F0028_S_OOO_SLF.jpg/_jcr_content/renditions/cq5dam.web.hebebed.2400.2400.jpg",
        category: "women",
        stock: 5,
        gallery: [
            "https://www.prada.com/content/dam/pradabkg_products/1/1BH/1BH023/055IF0002/1BH023_055I_F0002_S_045_SLF.jpg/_jcr_content/renditions/cq5dam.web.hebebed.1200.1200.jpg",
            "https://www.prada.com/content/dam/pradabkg_products/1/1BH/1BH023/055IF0002/1BH023_055I_F0002_S_046_SLF.jpg/_jcr_content/renditions/cq5dam.web.hebebed.1200.1200.jpg",
            "https://www.prada.com/content/dam/pradabkg_products/1/1BH/1BH023/055IF0002/1BH023_055I_F0002_S_047_SLF.jpg/_jcr_content/renditions/cq5dam.web.hebebed.1200.1200.jpg",
            "https://www.prada.com/content/dam/pradabkg_products/1/1BH/1BH023/055IF0002/1BH023_055I_F0002_S_048_SLF.jpg/_jcr_content/renditions/cq5dam.web.hebebed.1200.1200.jpg"
        ]
    },
    {
        _id: '13',
        name: "Short-sleeved wool sweater with pendants",
        description: "Elegant short sleeved dresswith intricate detailing and luxurious pendants.",
        price: 4500.00,
        image: "https://www.prada.com/content/dam/pradabkg_products/P/P24/P24V2H/17KDF0399/P24V2H_17KD_F0399_S_OOO_SLF.jpg/_jcr_content/renditions/cq5dam.web.hebebed.2400.2400.jpg",
        category: "women",
        category: "women",
        stock: 3,
        gallery: [
            "https://www.prada.com/content/dam/pradabkg_products/5/56A/56A218/15PFF0572/56A218_15PF_F0572_S_045_SLF.jpg/_jcr_content/renditions/cq5dam.web.hebebed.1200.1200.jpg",
            "https://www.prada.com/content/dam/pradabkg_products/5/56A/56A218/15PFF0572/56A218_15PF_F0572_S_046_SLF.jpg/_jcr_content/renditions/cq5dam.web.hebebed.1200.1200.jpg",
            "https://www.prada.com/content/dam/pradabkg_products/5/56A/56A218/15PFF0572/56A218_15PF_F0572_S_047_SLF.jpg/_jcr_content/renditions/cq5dam.web.hebebed.1200.1200.jpg",
            "https://www.prada.com/content/dam/pradabkg_products/5/56A/56A218/15PFF0572/56A218_15PF_F0572_S_048_SLF.jpg/_jcr_content/renditions/cq5dam.web.hebebed.1200.1200.jpg"
        ]
    }
];

// Sample men's products for demo
const sampleMenProducts = [

     {
         _id: '1',
         name: "Wool crew-neck sweater ",
         description: "Iconic nylon jacket from nvrmnd Re-Edition 2005 collection. Features the signature triangle logo and technical fabric construction.",
         price: 299.99,
         image: "https://www.prada.com/content/dam/pradabkg_products/U/UMF/UMF040/17KDF0036/UMF040_17KD_F0036_S_OOO_SLF.jpg/_jcr_content/renditions/cq5dam.web.hebebed.1200.1200.jpg",
         category: "men",
         stock: 8,
         gallery: [
             "https://www.prada.com/content/dam/pradabkg_products/U/UMF/UMF040/17KDF0036/UMF040_17KD_F0036_S_045_SLF.jpg/_jcr_content/renditions/cq5dam.web.hebebed.1200.1200.jpg",
             "https://www.prada.com/content/dam/pradabkg_products/U/UMF/UMF040/17KDF0036/UMF040_17KD_F0036_S_046_SLF.jpg/_jcr_content/renditions/cq5dam.web.hebebed.1200.1200.jpg",
             "https://www.prada.com/content/dam/pradabkg_products/U/UMF/UMF040/17KDF0036/UMF040_17KD_F0036_S_047_SLF.jpg/_jcr_content/renditions/cq5dam.web.hebebed.1200.1200.jpg",
             "https://www.prada.com/content/dam/pradabkg_products/U/UMF/UMF040/17KDF0036/UMF040_17KD_F0036_S_048_SLF.jpg/_jcr_content/renditions/cq5dam.web.hebebed.1200.1200.jpg"
         ]
     },
      {
         _id: '2',
         name: "Wool pants",
         description: "Woolen pant remastered in color Ebony.",
         price: 577.89,
         image: "https://www.prada.com/content/dam/pradabkg_products/U/UP0/UP0355/1W2GF0192/UP0355_1W2G_F0192_S_VMO_SLF.jpg/_jcr_content/renditions/cq5dam.web.hebebed.2400.2400.jpg",
         category: "men",
         stock: 5,
         gallery: [
             "https://www.prada.com/content/dam/pradabkg_products/U/UP0/UP0355/1W2GF0192/UP0355_1W2G_F0192_S_045_SLF.jpg/_jcr_content/renditions/cq5dam.web.hebebed.1200.1200.jpg",
             "https://www.prada.com/content/dam/pradabkg_products/U/UP0/UP0355/1W2GF0192/UP0355_1W2G_F0192_S_046_SLF.jpg/_jcr_content/renditions/cq5dam.web.hebebed.1200.1200.jpg",
             "https://www.prada.com/content/dam/pradabkg_products/U/UP0/UP0355/1W2GF0192/UP0355_1W2G_F0192_S_047_SLF.jpg/_jcr_content/renditions/cq5dam.web.hebebed.1200.1200.jpg",
             "https://www.prada.com/content/dam/pradabkg_products/U/UP0/UP0355/1W2GF0192/UP0355_1W2G_F0192_S_048_SLF.jpg/_jcr_content/renditions/cq5dam.web.hebebed.1200.1200.jpg"
         ]
     },
      {
         _id: '3',
         name: "Wool blouson jacket with shearling collar",
         description: "Woolen jacket with fluffy collar in color Ebony.",
         price: 867.99,
         image: "https://www.prada.com/content/dam/pradabkg_products/S/SGC/SGC958/1UPKF0192/SGC958_1UPK_F0192_S_OOO_SLF.jpg/_jcr_content/renditions/cq5dam.web.hebebed.2400.2400.jpg",
         category: "men",
         stock: 7,
         gallery: [
             "https://www.prada.com/content/dam/pradabkg_products/S/SGC/SGC958/1UPKF0192/SGC958_1UPK_F0192_S_045_SLF.jpg/_jcr_content/renditions/cq5dam.web.hebebed.1200.1200.jpg",
             "https://www.prada.com/content/dam/pradabkg_products/S/SGC/SGC958/1UPKF0192/SGC958_1UPK_F0192_S_046_SLF.jpg/_jcr_content/renditions/cq5dam.web.hebebed.1200.1200.jpg",
             "https://www.prada.com/content/dam/pradabkg_products/S/SGC/SGC958/1UPKF0192/SGC958_1UPK_F0192_S_047_SLF.jpg/_jcr_content/renditions/cq5dam.web.hebebed.1200.1200.jpg",
             "https://www.prada.com/content/dam/pradabkg_products/S/SGC/SGC958/1UPKF0192/SGC958_1UPK_F0192_S_048_SLF.jpg/_jcr_content/renditions/cq5dam.web.hebebed.1200.1200.jpg"
         ]
     },
      {
         _id: '4',
         name: "Cotton pants",
         description: "Blue cotton pants with a relaxed fit, perfect for casual wear.",
         price: 499.77,
         image: "https://www.prada.com/content/dam/pradabkg_products/S/SPH/SPH485/1U7YF0012/SPH485_1U7Y_F0012_S_OOO_SLF.jpg/_jcr_content/renditions/cq5dam.web.hebebed.2400.2400.jpg",
         category: "men",
         stock: 57,
         gallery: [
             "https://www.prada.com/content/dam/pradabkg_products/S/SPH/SPH485/1U7YF0012/SPH485_1U7Y_F0012_S_045_SLF.jpg/_jcr_content/renditions/cq5dam.web.hebebed.1200.1200.jpg",
             "https://www.prada.com/content/dam/pradabkg_products/S/SPH/SPH485/1U7YF0012/SPH485_1U7Y_F0012_S_046_SLF.jpg/_jcr_content/renditions/cq5dam.web.hebebed.1200.1200.jpg",
             "https://www.prada.com/content/dam/pradabkg_products/S/SPH/SPH485/1U7YF0012/SPH485_1U7Y_F0012_S_047_SLF.jpg/_jcr_content/renditions/cq5dam.web.hebebed.1200.1200.jpg",
             "https://www.prada.com/content/dam/pradabkg_products/S/SPH/SPH485/1U7YF0012/SPH485_1U7Y_F0012_S_048_SLF.jpg/_jcr_content/renditions/cq5dam.web.hebebed.1200.1200.jpg"
         ]
     },
     {
         _id: '5',
         name: "Buckle antiqued leather bag with belt",
         description: "leather bag with printed logo and belt in beige, brown and remastered style of fashion.",
         price: 8990.89,
         image: "https://www.prada.com/content/dam/pradabkg_products/2/2VG/2VG126/2HKFF077M/2VG126_2HKF_F077M_V_OJ2_SLF.jpg/_jcr_content/renditions/cq5dam.web.hebebed.2400.2400.jpg",
         category: "men",
         stock: 48,
         gallery: [
             "https://www.prada.com/content/dam/pradabkg_products/2/2VG/2VG126/2HKFF077M/2VG126_2HKF_F077M_V_045_SLF.jpg/_jcr_content/renditions/cq5dam.web.hebebed.1200.1200.jpg",
             "https://www.prada.com/content/dam/pradabkg_products/2/2VG/2VG126/2HKFF077M/2VG126_2HKF_F077M_V_046_SLF.jpg/_jcr_content/renditions/cq5dam.web.hebebed.1200.1200.jpg",
             "https://www.prada.com/content/dam/pradabkg_products/2/2VG/2VG126/2HKFF077M/2VG126_2HKF_F077M_V_047_SLF.jpg/_jcr_content/renditions/cq5dam.web.hebebed.1200.1200.jpg",
             "https://www.prada.com/content/dam/pradabkg_products/2/2VG/2VG126/2HKFF077M/2VG126_2HKF_F077M_V_048_SLF.jpg/_jcr_content/renditions/cq5dam.web.hebebed.1200.1200.jpg"
         ]
     },
     {
         _id: '6',
         name: "Printed Fabric Boot",
         description: "An archive silhouette inspires the design of these texan boots made of fabric and animated with a lively floral print.",
         price: 1236.67,
         image: "https://www.prada.com/content/dam/pradabkg_products/2/2WE/2WE002/3LRAF0F24/2WE002_3LRA_F0F24_F_D001_SLR.jpg/_jcr_content/renditions/cq5dam.web.hebebed.2400.2400.jpg",
         category: "men",
         stock: 63,
         gallery: [
             "https://www.prada.com/content/dam/pradabkg_products/2/2WE/2WE002/3LRAF0F24/2WE002_3LRA_F0F24_F_045_SLR.jpg/_jcr_content/renditions/cq5dam.web.hebebed.1200.1200.jpg",
             "https://www.prada.com/content/dam/pradabkg_products/2/2WE/2WE002/3LRAF0F24/2WE002_3LRA_F0F24_F_046_SLR.jpg/_jcr_content/renditions/cq5dam.web.hebebed.1200.1200.jpg",
             "https://www.prada.com/content/dam/pradabkg_products/2/2WE/2WE002/3LRAF0F24/2WE002_3LRA_F0F24_F_047_SLR.jpg/_jcr_content/renditions/cq5dam.web.hebebed.1200.1200.jpg",
             "https://www.prada.com/content/dam/pradabkg_products/2/2WE/2WE002/3LRAF0F24/2WE002_3LRA_F0F24_F_048_SLR.jpg/_jcr_content/renditions/cq5dam.web.hebebed.1200.1200.jpg"
         ]
     },

];

// Fetch products from API
async function fetchProducts() {
    try {
        const urlParams = new URLSearchParams(window.location.search);
        const category = urlParams.get('category');

        if (category === 'men') {
            // Return sample men's products for demo
            products = sampleMenProducts;
            return products;
        }

        if (category === 'women') {
            // Return sample women's products for demo
            products = sampleWomenProducts;
            return products;
        }

        const response = await fetch('/api/products');
        products = await response.json();
        return products;
    } catch (error) {
        console.error('Error fetching products:', error);
        // Fallback to sample products
        if (window.location.search.includes('category=men')) {
            products = sampleMenProducts;
            return products;
        }
        return [];
    }
}

// Cart functionality
let cart = JSON.parse(localStorage.getItem('cart')) || [];

function saveCart() {
    localStorage.setItem('cart', JSON.stringify(cart));
}

function addToCart(productId) {
    const product = products.find(p => p._id === productId || p.id === productId);
    if (product) {
        const existingItem = cart.find(item => item._id === productId || item.id === productId);
        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            cart.push({ ...product, quantity: 1 });
        }
        saveCart();

        // Update cart display if on cart page
        if (document.getElementById('cart-items') && !document.getElementById('checkout-items')) {
            displayCart();
        }

        // Update checkout items if on checkout page
        if (document.getElementById('checkout-items')) {
            displayCheckoutItems();
        }

        showNotification(`${product.name} added to cart!`, 'success');

        // Animate the cart icon
        const cartLink = document.querySelector('.cart-link');
        if (cartLink) {
            cartLink.style.animation = 'bounce 0.6s ease';
            setTimeout(() => {
                cartLink.style.animation = '';
            }, 600);
        }

        // Update cart count in navigation immediately
        updateCartCount();

        // Show cart data immediately when item is added
        showCartData();
    }
}

function updateCartCount() {
    const cartCountElements = document.querySelectorAll('.cart-count');
    const totalItems = cart.reduce((total, item) => total + item.quantity, 0);

    cartCountElements.forEach(element => {
        element.textContent = totalItems;
        element.style.display = totalItems > 0 ? 'inline-block' : 'none';
    });
}

// Function to open outfit modal
function openOutfitModal(lookId) {
    const outfit = outfitData[lookId];
    if (!outfit) return;

    // Create modal HTML
    const modalHTML = `
        <div id="outfit-modal" class="modal outfit-modal">
            <div class="modal-content">
                <span class="close">&times;</span>
                <h2 class="outfit-title">${outfit.name}</h2>
                <div class="outfit-items">
                    ${outfit.items.map(item => `
                        <div class="outfit-item">
                            <img src="${item.image}" alt="${item.name}">
                            <h4>${item.name}</h4>
                            <div class="price">$${item.price}</div>
                            <button class="btn" onclick="addToCart('${item.id}')">Add to Cart</button>
                        </div>
                    `).join('')}
                </div>
                <div class="outfit-total">
                    <h3>Complete Look</h3>
                    <div class="total-price">$${outfit.items.reduce((total, item) => total + item.price, 0).toFixed(2)}</div>
                    <button class="btn" onclick="addOutfitToCart('${lookId}')">Add Entire Look to Cart</button>
                </div>
            </div>
        </div>
    `;

    // Add modal to body
    document.body.insertAdjacentHTML('beforeend', modalHTML);

    // Show modal
    const modal = document.getElementById('outfit-modal');
    modal.style.display = 'block';

    // Close modal functionality
    const closeBtn = modal.querySelector('.close');
    closeBtn.onclick = function() {
        modal.style.display = 'none';
        setTimeout(() => {
            document.body.removeChild(modal);
        }, 300);
    };

    // Close modal when clicking outside
    window.onclick = function(event) {
        if (event.target === modal) {
            modal.style.display = 'none';
            setTimeout(() => {
                document.body.removeChild(modal);
            }, 300);
        }
    };
}

// Function to add entire outfit to cart
function addOutfitToCart(lookId) {
    const outfit = outfitData[lookId];
    if (!outfit) return;

    let addedCount = 0;
    outfit.items.forEach(item => {
        const product = products.find(p => p._id === item.id || p.id === item.id);
        if (product) {
            const existingItem = cart.find(cartItem => cartItem._id === item.id || cartItem.id === item.id);
            if (existingItem) {
                existingItem.quantity += 1;
            } else {
                cart.push({ ...product, quantity: 1 });
            }
            addedCount++;
        }
    });

    if (addedCount > 0) {
        saveCart();
        showNotification(`Complete ${outfit.name} added to cart!`, 'success');

        // Animate the cart icon
        const cartLink = document.querySelector('nav a[href*="cart"]');
        if (cartLink) {
            cartLink.style.animation = 'bounce 0.6s ease';
            setTimeout(() => {
                cartLink.style.animation = '';
            }, 600);
        }

        // Show cart data immediately when outfit is added
        showCartData();

        // Close modal
        const modal = document.getElementById('outfit-modal');
        if (modal) {
            modal.style.display = 'none';
            setTimeout(() => {
                if (document.body.contains(modal)) {
                    document.body.removeChild(modal);
                }
            }, 300);
        }
    }
}

function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    saveCart();
    displayCart();
}

function displayCart() {
    const cartItems = document.getElementById('cart-items');
    const totalElement = document.getElementById('cart-total');
    const subtotalElement = document.getElementById('cart-subtotal');
    const taxElement = document.getElementById('cart-tax');
    const cartCount = document.getElementById('cart-count');
    const cartEmpty = document.getElementById('cart-empty');
    const cartContent = document.getElementById('cart-content');
    const checkoutBtn = document.getElementById('checkout-btn');

    if (cartItems && totalElement) {
        if (cart.length === 0) {
            cartEmpty.style.display = 'block';
            cartContent.style.display = 'none';
            return;
        }

        cartEmpty.style.display = 'none';
        cartContent.style.display = 'grid';

        cartItems.innerHTML = '';
        let subtotal = 0;
        let itemCount = 0;

        cart.forEach((item, index) => {
            const itemTotal = item.price * item.quantity;
            subtotal += itemTotal;
            itemCount += item.quantity;

            cartItems.innerHTML += `
                <div class="cart-item">
                    <img src="${item.image}" alt="${item.name}">
                    <div class="cart-item-details">
                        <h3>${item.name}</h3>
                        <p>$${item.price.toFixed(2)} each</p>
                        <div class="cart-item-quantity">
                            <button class="quantity-btn" onclick="updateQuantity(${index}, ${item.quantity - 1})">-</button>
                            <input type="number" class="quantity-input" value="${item.quantity}" min="1" onchange="updateQuantity(${index}, this.value)">
                            <button class="quantity-btn" onclick="updateQuantity(${index}, ${item.quantity + 1})">+</button>
                        </div>
                    </div>
                    <div class="cart-item-price">$${(item.price * item.quantity).toFixed(2)}</div>
                    <button class="remove-btn" onclick="removeFromCart(${index})">Remove</button>
                </div>
            `;
        });

        const tax = subtotal * 0.08; // 8% tax
        const shipping = subtotal > 100 ? 0 : 9.99; // Free shipping over $100
        const total = subtotal + tax + shipping;

        // Update all price displays
        if (subtotalElement) subtotalElement.textContent = `$${subtotal.toFixed(2)}`;
        if (taxElement) taxElement.textContent = `$${tax.toFixed(2)}`;
        if (totalElement) totalElement.textContent = `$${total.toFixed(2)}`;

        // Update cart count
        if (cartCount) {
            cartCount.textContent = `${itemCount} item${itemCount !== 1 ? 's' : ''}`;
        }

        // Update shipping display
        const shippingElement = document.getElementById('cart-shipping');
        if (shippingElement) {
            shippingElement.textContent = shipping === 0 ? 'Free' : `$${shipping.toFixed(2)}`;
        }

        // Enable/disable checkout button
        if (checkoutBtn) {
            checkoutBtn.style.opacity = cart.length > 0 ? '1' : '0.5';
            checkoutBtn.style.pointerEvents = cart.length > 0 ? 'auto' : 'none';
        }
    }
}

function updateQuantity(index, newQuantity) {
    if (newQuantity < 1) {
        removeFromCart(index);
        return;
    }

    cart[index].quantity = parseInt(newQuantity);
    saveCart();
    displayCart();
    updateCartCount();
    showNotification('Cart updated!', 'success');
}

function removeFromCart(index) {
    const removedItem = cart.splice(index, 1)[0];
    saveCart();
    displayCart();
    updateCartCount();
    showNotification(`${removedItem.name} removed from cart`, 'info');
}

async function displayProducts(productList = null) {
    if (!productList) {
        productList = await fetchProducts();
    }
    const productGrid = document.querySelector('.product-grid');
    const main = document.querySelector('main');
    const productsSection = document.querySelector('.products');
    const urlParams = new URLSearchParams(window.location.search);
    const category = urlParams.get('category');

    if (productGrid) {
        productGrid.innerHTML = '';
        productList.forEach(product => {
            const isMenSection = urlParams.get('category') === 'men';
            const isWomenSection = urlParams.get('category') === 'women';
            productGrid.innerHTML += `
                <div class="product-card ${isMenSection ? 'men-product' : ''} ${isWomenSection ? 'women-product' : ''}" data-product-id="${product._id || product.id}">
                    <img src="${product.image}" alt="${product.name}">
                    <h3>${product.name}</h3>
                    <p class="product-description">${product.description}</p>
                    <p class="product-price">$${product.price}</p>
                    <div class="product-details" style="display: none;">
                        <p><strong>Category:</strong> ${product.category}</p>
                        <p><strong>Stock:</strong> ${product.stock} available</p>
                        <p><strong>Description:</strong> ${product.description}</p>
                        ${product.gallery ? `
                        <div class="product-gallery">
                            ${product.gallery.map(img => `<img src="${img}" alt="${product.name} view">`).join('')}
                        </div>
                        ` : ''}
                    </div>
                    <div class="product-actions">
                        <button class="btn" onclick="addToCart('${product._id || product.id}')">Add to Cart</button>
                    </div>
                </div>
            `;
        });
    }

    // Add collection header for men's section
    if (category === 'men' && productsSection) {
        // Remove existing header if any
        const existingHeader = productsSection.querySelector('.collection-header');
        if (existingHeader) {
            existingHeader.remove();
        }

        // Insert header before product grid
        const headerHTML = `
            <div class="collection-header">
                <h1>Fall Winter 2025</h1>
                <h2>Men's Collection</h2>
                <p>The Men's Fall Winter 2025 Collection by Miuccia Prada and Raf Simons is a deep exploration of human nature and emotional impulses as essential drivers of creativity. Romanticism flows through each piece as a force in motion.</p>
            </div>
        `;
        productGrid.insertAdjacentHTML('beforebegin', headerHTML);
    }

    // Add collection header for women's section
    if (category === 'women' && productsSection) {
        // Remove existing header if any
        const existingHeader = productsSection.querySelector('.collection-header');
        if (existingHeader) {
            existingHeader.remove();
        }

        // Insert header before product grid
        const headerHTML = `
            <div class="collection-header">
                <h1>Fall Winter 2025</h1>
                <h2>Women's Collection</h2>
                <p>The Women's Fall Winter 2025 Collection by Miuccia Prada and Raf Simons is a celebration of female identity, where garments constantly transform, redefining their function and relationship with the body. Fragments of clothing move freely, shaping new silhouettes through unexpected interactions.</p>
            </div>
        `;
        productGrid.insertAdjacentHTML('beforebegin', headerHTML);
    }

    // Change background for men's and women's sections
    if ((category === 'men' || category === 'women') && main) {
        main.style.background = '#ffffff';
        document.body.style.background = '#ffffff';
    }

    // Add sample content after products in men's and women's sections
    if ((category === 'men' || category === 'women') && productsSection) {
        // Remove existing sample content if any
        const existingSample = productsSection.querySelector('.sample-content');
        if (existingSample) {
            existingSample.remove();
        }

        // Determine image paths based on category
        const imageBasePath = category === 'men'
            ? 'https://www.prada.com/content/dam/pradaspa/ecommerce/2025/09/SBL/Man/'
            : 'https://www.prada.com/content/dam/pradaspa/ecommerce/2025/09/SBL/Woman/';

        // Special handling for women's images
        const firstImageSrc = category === 'women'
            ? 'https://www.prada.com/content/dam/pradaspa/ecommerce/2025/09/SBL/Woman/look_12.jpg/_jcr_content/renditions/cq5dam.web.hebebed.1200.1200.jpg'
            : `${imageBasePath}look_1.jpg/_jcr_content/renditions/cq5dam.web.hebebed.1200.1200.jpg`;

        const secondImageSrc = category === 'women'
            ? 'https://www.prada.com/content/dam/pradaspa/ecommerce/2025/09/SBL/Woman/look_30.jpg/_jcr_content/renditions/cq5dam.web.hebebed.1200.1200.jpg'
            : `${imageBasePath}look_17.jpg/_jcr_content/renditions/cq5dam.web.hebebed.1200.1200.jpg`;

        const thirdImageSrc = category === 'women'
            ? 'https://www.prada.com/content/dam/pradaspa/ecommerce/2025/09/SBL/Woman/look_39.jpg/_jcr_content/renditions/cq5dam.web.hebebed.1200.1200.jpg'
            : `${imageBasePath}look_21.jpg/_jcr_content/renditions/cq5dam.web.hebebed.1200.1200.jpg`;

        const fourthImageSrc = category === 'women'
            ? 'https://www.prada.com/content/dam/pradaspa/ecommerce/2025/09/SBL/Woman/look_19.jpg/_jcr_content/renditions/cq5dam.web.hebebed.1200.1200.jpg'
            : `${imageBasePath}look_36.jpg/_jcr_content/renditions/cq5dam.web.hebebed.1200.1200.jpg`;

        // Add sample content after product grid
        const sampleHTML = `
            <div class="sample-content">
                <div class="featured-section">
                    <h2>Shop the Look</h2>
                    <div class="featured-grid">
                        <div class="featured-item" data-look-id="1">
                            <img src="${firstImageSrc}" alt="Shop the Look Item 1">
                        </div>
                        <div class="featured-item" data-look-id="2">
                            <img src="${secondImageSrc}" alt="Shop the Look Item 2">
                        </div>
                        <div class="featured-item" data-look-id="3">
                            <img src="${thirdImageSrc}" alt="Shop the Look Item 3">
                        </div>
                        <div class="featured-item" data-look-id="4">
                            <img src="${fourthImageSrc}" alt="Shop the Look Item 4">
                        </div>
                    </div>
                    <p class="featured-description">Instinctive passion breaks free from rationality, revealing a new, intimate elegance. Spontaneous contrasts give rise to unexpected, captivating combinations, where the body dresses by instinct.</p>
                </div>
            </div>
        `;
        productGrid.insertAdjacentHTML('afterend', sampleHTML);
    }

}

function filterProducts() {
    // Check URL parameters for category
    const urlParams = new URLSearchParams(window.location.search);
    const urlCategory = urlParams.get('category');

    let filtered = products.filter(product =>
        urlCategory === '' || product.category === urlCategory
    );

    // Apply additional filters if on products page
    if (document.getElementById('price-range')) {
        filtered = applyFilters(filtered);
    }

    displayProducts(filtered);
}

function applyFilters(productsList) {
    const priceRange = document.getElementById('price-range').value;
    const categoryFilter = document.getElementById('category-filter').value;
    const sortBy = document.getElementById('sort-by').value;

    let filtered = [...productsList];

    // Price range filter
    if (priceRange !== 'all') {
        filtered = filtered.filter(product => {
            const price = product.price;
            switch (priceRange) {
                case '0-500':
                    return price >= 0 && price <= 500;
                case '500-1000':
                    return price > 500 && price <= 1000;
                case '1000-5000':
                    return price > 1000 && price <= 5000;
                case '5000+':
                    return price > 5000;
                default:
                    return true;
            }
        });
    }

    // Category filter
    if (categoryFilter !== 'all') {
        filtered = filtered.filter(product => product.category === categoryFilter);
    }

    // Sorting
    filtered.sort((a, b) => {
        switch (sortBy) {
            case 'name':
                return a.name.localeCompare(b.name);
            case 'name-desc':
                return b.name.localeCompare(a.name);
            case 'price-low':
                return a.price - b.price;
            case 'price-high':
                return b.price - a.price;
            case 'newest':
                // Assuming newer products have higher IDs or we can add a date field
                return (b._id || b.id) - (a._id || a.id);
            default:
                return 0;
        }
    });

    return filtered;
}

function clearFilters() {
    document.getElementById('price-range').value = 'all';
    document.getElementById('category-filter').value = 'all';
    document.getElementById('sort-by').value = 'name';
    filterProducts();
}

// Auth functionality
function showLoginForm() {
    document.getElementById('login-form').classList.add('active');
    document.getElementById('register-form').classList.remove('active');
    document.getElementById('login-tab').classList.add('active');
    document.getElementById('register-tab').classList.remove('active');
}

function showRegisterForm() {
    document.getElementById('register-form').classList.add('active');
    document.getElementById('login-form').classList.remove('active');
    document.getElementById('register-tab').classList.add('active');
    document.getElementById('login-tab').classList.remove('active');
}

// Debounce function for search
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Create back-to-top button
function createBackToTopButton() {
    const button = document.createElement('button');
    button.innerHTML = '↑';
    button.className = 'back-to-top';
    button.style.cssText = `
        position: fixed;
        bottom: 20px;
        right: 20px;
        background: #e74c3c;
        color: white;
        border: none;
        border-radius: 50%;
        width: 50px;
        height: 50px;
        font-size: 20px;
        cursor: pointer;
        opacity: 0;
        visibility: hidden;
        transition: all 0.3s ease;
        z-index: 1000;
    `;
    document.body.appendChild(button);

    button.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            button.style.opacity = '1';
            button.style.visibility = 'visible';
        } else {
            button.style.opacity = '0';
            button.style.visibility = 'hidden';
        }
    });
}

// Video overlay functionality
function showVideoOverlay() {
    const overlay = document.querySelector('.video-overlay');
    if (overlay) {
        overlay.classList.add('show');
    }
}

// Navigation show/hide functionality
function showNavigation() {
    const header = document.querySelector('header');
    if (header) {
        header.classList.add('show');
    }
}

function hideNavigation() {
    const header = document.querySelector('header');
    if (header) {
        header.classList.remove('show');
    }
}

// Enhanced navigation controls
let hideTimeout;
function resetHideTimer() {
    clearTimeout(hideTimeout);
    hideTimeout = setTimeout(hideNavigation, 3000); // Hide after 3 seconds
}

// Event listeners
document.addEventListener('DOMContentLoaded', async function() {
    // Hide the video overlay after 3 seconds
    setTimeout(function() {
        const video = document.getElementById('hero-video');
        if (video) {
            video.classList.add('hide-overlay');
        }
    }, 3000); // 3 seconds

    // Show video only for 5 seconds, then reveal everything with animation
    setTimeout(function() {
        showVideoOverlay();
        showNavigation();
    }, 5000); // 5 seconds

    // Additional interactive triggers (scroll, mouse, click)
    window.addEventListener('scroll', function() {
        if (window.scrollY > 10) {
            showNavigation();
            resetHideTimer();
        }
    });

    document.addEventListener('mousemove', function(e) {
        if (e.clientY < 150) {
            showNavigation();
            resetHideTimer();
        }
    });

    document.addEventListener('click', function() {
        showNavigation();
        resetHideTimer();
    });

    await displayProducts();
    displayCart();
    createBackToTopButton();
    updateWishlistButtons();

    // Apply URL-based filtering on page load
    filterProducts();

    // Add filter event listeners
    const applyFiltersBtn = document.getElementById('apply-filters');
    const clearFiltersBtn = document.getElementById('clear-filters');

    if (applyFiltersBtn) {
        applyFiltersBtn.addEventListener('click', () => {
            filterProducts();
            showNotification('Filters applied successfully!', 'success');
        });
    }

    if (clearFiltersBtn) {
        clearFiltersBtn.addEventListener('click', () => {
            clearFilters();
            showNotification('Filters cleared!', 'success');
        });
    }

    // Add click handlers for men's and women's product expansion after all DOM updates
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.get('category') === 'men' || urlParams.get('category') === 'women') {
        setTimeout(() => {
            const menProducts = document.querySelectorAll('.men-product');
            let currentlyExpanded = null;

            // Function to collapse all cards
            function collapseAll() {
                const collectionProducts = document.querySelectorAll('.men-product, .women-product');
                collectionProducts.forEach(card => {
                    card.classList.remove('expanded');
                    const details = card.querySelector('.product-details');
                    if (details) {
                        details.style.display = 'none';
                    }
                });
                currentlyExpanded = null;
            }

            menProducts.forEach(card => {
                card.addEventListener('click', function(e) {
                    // Don't expand if clicking on the Add to Cart button
                    if (e.target.classList.contains('btn')) return;

                    e.stopPropagation(); // Prevent event bubbling

                    // If this card is already expanded, collapse it
                    if (this === currentlyExpanded) {
                        collapseAll();
                        return;
                    }

                    // Collapse any currently expanded card
                    collapseAll();

                    // Expand this card
                    this.classList.add('expanded');
                    const details = this.querySelector('.product-details');
                    if (details) {
                        details.style.display = 'block';
                    }
                    currentlyExpanded = this;
                });
            });

            // Collapse when clicking outside any product card
            document.addEventListener('click', function(e) {
                // Check if the click is outside any product card
                const isClickOutside = !e.target.closest('.men-product, .women-product');
                if (isClickOutside && currentlyExpanded) {
                    collapseAll();
                }
            });

            // Add click handlers for Shop the Look items
            const featuredItems = document.querySelectorAll('.featured-item[data-look-id]');
            featuredItems.forEach(item => {
                item.addEventListener('click', function() {
                    const lookId = this.getAttribute('data-look-id');
                    openOutfitModal(lookId);
                });
            });
        }, 100);
    }

    // Make gender buttons functional
    const genderButtons = document.querySelectorAll('.gender-link');
    genderButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            // Show navigation and content immediately when gender button is clicked
            showVideoOverlay();
            showNavigation();

            // The link will navigate to products page with category filter
            // This is handled by the href attribute
        });
    });

    // No search or category filters on this page

    // Enhanced Auth tabs
    const loginTab = document.getElementById('login-tab');
    const registerTab = document.getElementById('register-tab');
    if (loginTab) {
        loginTab.addEventListener('click', function() {
            showLoginForm();
            // Reset form states
            resetAuthForms();
        });
    }
    if (registerTab) {
        registerTab.addEventListener('click', function() {
            showRegisterForm();
            // Reset form states
            resetAuthForms();
        });
    }

    // Password strength indicator
    const passwordInput = document.getElementById('register-password');
    const strengthFill = document.querySelector('.strength-fill');
    const strengthText = document.querySelector('.strength-text');

    if (passwordInput && strengthFill && strengthText) {
        passwordInput.addEventListener('input', function() {
            const password = this.value;
            const strength = calculatePasswordStrength(password);
            updatePasswordStrength(strength);
        });
    }

    function calculatePasswordStrength(password) {
        let strength = 0;
        if (password.length >= 8) strength += 25;
        if (/[a-z]/.test(password)) strength += 25;
        if (/[A-Z]/.test(password)) strength += 25;
        if (/[0-9]/.test(password)) strength += 15;
        if (/[^A-Za-z0-9]/.test(password)) strength += 10;
        return Math.min(strength, 100);
    }

    function updatePasswordStrength(strength) {
        strengthFill.style.width = strength + '%';

        let color, text;
        if (strength < 25) {
            color = '#ff4d4d';
            text = 'Very Weak';
        } else if (strength < 50) {
            color = '#ffa500';
            text = 'Weak';
        } else if (strength < 75) {
            color = '#ffff00';
            text = 'Good';
        } else if (strength < 90) {
            color = '#9acd32';
            text = 'Strong';
        } else {
            color = '#32cd32';
            text = 'Very Strong';
        }

        strengthFill.style.background = color;
        strengthText.textContent = text;
        strengthText.style.color = color;
    }

    // Password confirmation validation
    const confirmPasswordInput = document.getElementById('register-confirm-password');
    if (confirmPasswordInput) {
        confirmPasswordInput.addEventListener('input', function() {
            const password = document.getElementById('register-password').value;
            const confirmPassword = this.value;

            if (confirmPassword && password !== confirmPassword) {
                this.setCustomValidity('Passwords do not match');
            } else {
                this.setCustomValidity('');
            }
        });
    }

    function resetAuthForms() {
        // Reset password strength
        if (strengthFill) strengthFill.style.width = '0%';
        if (strengthText) {
            strengthText.textContent = 'Password strength';
            strengthText.style.color = '#666666';
        }

        // Clear form validation
        const forms = document.querySelectorAll('.auth-form');
        forms.forEach(form => {
            form.querySelectorAll('input').forEach(input => {
                input.setCustomValidity('');
            });
        });
    }

    // Forms
    const loginForm = document.getElementById('login-form');
    const registerForm = document.getElementById('register-form');
    const checkoutForm = document.getElementById('checkout-form');

    if (loginForm) {
        loginForm.addEventListener('submit', async function(e) {
            e.preventDefault();
            const submitBtn = loginForm.querySelector('button[type="submit"]');
            const btnText = submitBtn.querySelector('.btn-text');
            const btnLoading = submitBtn.querySelector('.btn-loading');
            const originalText = btnText.textContent;

            btnText.textContent = 'Signing In...';
            btnLoading.style.display = 'inline-block';
            submitBtn.disabled = true;

            const email = document.getElementById('login-email').value;
            const password = document.getElementById('login-password').value;
            const rememberMe = document.getElementById('remember-me')?.checked;

            // Basic validation
            if (!email || !password) {
                showNotification('Please fill in all fields', 'error');
                resetSubmitButton(submitBtn, btnText, btnLoading, originalText);
                return;
            }

            try {
                const response = await fetch('/api/auth/login', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ email, password, rememberMe })
                });

                const data = await response.json();
                if (response.ok) {
                    localStorage.setItem('token', data.token);
                    token = data.token;
                    user = data;

                    // Handle remember me
                    if (rememberMe) {
                        localStorage.setItem('rememberMe', 'true');
                    } else {
                        localStorage.removeItem('rememberMe');
                    }

                    showNotification(`Welcome back, ${data.user?.name || 'User'}!`, 'success');
                    setTimeout(() => {
                        window.location.href = 'index.html';
                    }, 1500);
                } else {
                    showNotification(data.message || 'Login failed. Please check your credentials.', 'error');
                }
            } catch (error) {
                console.error('Login error:', error);
                showNotification('Login failed. Please check your connection and try again.', 'error');
            } finally {
                resetSubmitButton(submitBtn, btnText, btnLoading, originalText);
            }
        });
    }

    if (registerForm) {
        registerForm.addEventListener('submit', async function(e) {
            e.preventDefault();
            const submitBtn = registerForm.querySelector('button[type="submit"]');
            const btnText = submitBtn.querySelector('.btn-text');
            const btnLoading = submitBtn.querySelector('.btn-loading');
            const originalText = btnText.textContent;

            btnText.textContent = 'Creating Account...';
            btnLoading.style.display = 'inline-block';
            submitBtn.disabled = true;

            const firstName = document.getElementById('register-first-name').value;
            const lastName = document.getElementById('register-last-name').value;
            const name = `${firstName} ${lastName}`.trim();
            const email = document.getElementById('register-email').value;
            const password = document.getElementById('register-password').value;
            const confirmPassword = document.getElementById('register-confirm-password').value;
            const termsAgreed = document.getElementById('terms-agree').checked;
            const newsletterSignup = document.getElementById('newsletter-signup').checked;

            // Client-side validation
            if (password !== confirmPassword) {
                showNotification('Passwords do not match', 'error');
                resetSubmitButton(submitBtn, btnText, btnLoading, originalText);
                return;
            }

            if (!termsAgreed) {
                showNotification('Please agree to the Terms & Conditions', 'error');
                resetSubmitButton(submitBtn, btnText, btnLoading, originalText);
                return;
            }

            if (password.length < 8) {
                showNotification('Password must be at least 8 characters long', 'error');
                resetSubmitButton(submitBtn, btnText, btnLoading, originalText);
                return;
            }

            try {
                const response = await fetch('/api/auth/register', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        name,
                        email,
                        password,
                        newsletterSignup
                    })
                });

                const data = await response.json();
                if (response.ok) {
                    localStorage.setItem('token', data.token);
                    token = data.token;
                    user = data;
                    showNotification('Welcome! Your account has been created successfully!', 'success');
                    setTimeout(() => {
                        window.location.href = 'index.html';
                    }, 1500);
                } else {
                    showNotification(data.message || 'Registration failed', 'error');
                }
            } catch (error) {
                console.error('Register error:', error);
                showNotification('Registration failed. Please check your connection and try again.', 'error');
            } finally {
                resetSubmitButton(submitBtn, btnText, btnLoading, originalText);
            }
        });
    }

    function resetSubmitButton(button, textElement, loadingElement, originalText) {
        textElement.textContent = originalText;
        loadingElement.style.display = 'none';
        button.disabled = false;
    }

    // Checkout functionality
    function displayCheckoutItems() {
        const checkoutItems = document.getElementById('checkout-items');
        const checkoutSubtotal = document.getElementById('checkout-subtotal');
        const checkoutTotal = document.getElementById('checkout-total');
        const checkoutTax = document.getElementById('checkout-tax');

        if (checkoutItems && cart.length > 0) {
            checkoutItems.innerHTML = '';
            let subtotal = 0;

            cart.forEach(item => {
                subtotal += item.price * item.quantity;
                checkoutItems.innerHTML += `
                    <div class="checkout-item">
                        <img src="${item.image}" alt="${item.name}">
                        <div class="checkout-item-details">
                            <h4>${item.name}</h4>
                            <p>Qty: ${item.quantity}</p>
                        </div>
                        <div class="checkout-item-price">$${(item.price * item.quantity).toFixed(2)}</div>
                    </div>
                `;
            });

            const tax = subtotal * 0.08; // 8% tax
            const total = subtotal + tax;

            checkoutSubtotal.textContent = `$${subtotal.toFixed(2)}`;
            checkoutTax.textContent = `$${tax.toFixed(2)}`;
            checkoutTotal.textContent = `$${total.toFixed(2)}`;
        }
    }

    // Auto-save cart functionality
    function autoSaveCart() {
        const cartData = {
            items: cart,
            timestamp: new Date().toISOString(),
            expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString() // 7 days
        };
        localStorage.setItem('autoSavedCart', JSON.stringify(cartData));
    }

    // Load auto-saved cart
    function loadAutoSavedCart() {
        const savedData = localStorage.getItem('autoSavedCart');
        if (savedData) {
            try {
                const parsed = JSON.parse(savedData);
                const expires = new Date(parsed.expires);
                if (expires > new Date() && parsed.items.length > 0) {
                    cart = parsed.items;
                    saveCart();
                    showNotification('Your previous cart has been restored!', 'success');
                }
            } catch (error) {
                console.error('Error loading auto-saved cart:', error);
            }
        }
    }

    // Guest checkout toggle
    const guestCheckoutBtn = document.getElementById('guest-checkout-btn');
    const loginCheckoutBtn = document.getElementById('login-checkout-btn');

    if (guestCheckoutBtn && loginCheckoutBtn) {
        guestCheckoutBtn.addEventListener('click', function() {
            this.classList.add('active');
            loginCheckoutBtn.classList.remove('active');
            // Guest checkout - no additional requirements
        });

        loginCheckoutBtn.addEventListener('click', function() {
            this.classList.add('active');
            guestCheckoutBtn.classList.remove('active');
            // Redirect to login or show login form
            showNotification('Please sign in to continue', 'info');
            setTimeout(() => {
                window.location.href = 'login.html';
            }, 1500);
        });
    }

    // Back to cart button
    const backToCartBtn = document.getElementById('back-to-cart');
    if (backToCartBtn) {
        backToCartBtn.addEventListener('click', function() {
            window.location.href = 'cart.html';
        });
    }

    if (checkoutForm) {
        checkoutForm.addEventListener('submit', async function(e) {
            e.preventDefault();
            const submitBtn = checkoutForm.querySelector('button[type="submit"]');
            const originalText = submitBtn.textContent;
            const loading = showLoading(submitBtn);
            submitBtn.textContent = 'Processing Order...';
            submitBtn.disabled = true;

            // Update progress indicator
            document.querySelectorAll('.progress-step').forEach(step => {
                step.classList.remove('active');
            });
            document.querySelector('[data-step="3"]').classList.add('active');
            document.querySelector('[data-step="4"]').classList.add('active');

            // Simulate payment processing with more detailed steps
            setTimeout(() => {
                submitBtn.textContent = 'Verifying Payment...';
            }, 1000);

            setTimeout(() => {
                submitBtn.textContent = 'Processing Order...';
            }, 2000);

            setTimeout(() => {
                showNotification('Order placed successfully!', 'success');
                cart = [];
                saveCart();
                localStorage.removeItem('autoSavedCart'); // Clear auto-saved cart
                displayCart();
                hideLoading(loading);
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;

                setTimeout(() => {
                    window.location.href = 'index.html';
                }, 2000);
            }, 3000);
        });
    }

    // Initialize checkout if on checkout page
    if (document.getElementById('checkout-items')) {
        displayCheckoutItems();
        loadAutoSavedCart();
    }

    // Initialize cart if on cart page
    if (document.getElementById('cart-items') && !document.getElementById('checkout-items')) {
        displayCart();
    }

    // Initialize cart count on all pages
    updateCartCount();

    // Promo code functionality
    const applyPromoBtn = document.getElementById('apply-promo');
    if (applyPromoBtn) {
        applyPromoBtn.addEventListener('click', function() {
            const promoCode = document.getElementById('promo-code').value.trim().toUpperCase();
            if (promoCode === 'SAVE10') {
                showNotification('Promo code applied! 10% discount added.', 'success');
                // In a real app, this would update the total with discount
            } else if (promoCode) {
                showNotification('Invalid promo code', 'error');
            } else {
                showNotification('Please enter a promo code', 'info');
            }
        });
    }

    // Auto-save cart on changes
    const originalSaveCart = saveCart;
    saveCart = function() {
        originalSaveCart();
        autoSaveCart();
    };


    // Function to show cart data immediately
    function showCartData() {
        console.log('Current Cart Data:', cart);
        console.log('Cart Summary:');
        console.log('- Total Items:', cart.reduce((total, item) => total + item.quantity, 0));
        console.log('- Total Value:', cart.reduce((total, item) => total + (item.price * item.quantity), 0).toFixed(2));
        console.log('- Items:', cart.map(item => `${item.name} (Qty: ${item.quantity}) - $${(item.price * item.quantity).toFixed(2)}`));

        // Show notification with cart summary
        const totalItems = cart.reduce((total, item) => total + item.quantity, 0);
        const totalValue = cart.reduce((total, item) => total + (item.price * item.quantity), 0).toFixed(2);
        showNotification(`Cart updated! ${totalItems} item(s) - Total: $${totalValue}`, 'info');
    }

    // Initialize cart count on all pages
    updateCartCount();



    // About page scroll animations
    if (document.querySelector('.about-video')) {
        // Intersection Observer for about page animations
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate-in');
                }
            });
        }, observerOptions);

        // Observe about page elements
        const aboutElements = document.querySelectorAll('.story-section, .philosophy-section, .values-section, .cta-section');
        aboutElements.forEach(element => {
            observer.observe(element);
        });
    }
});