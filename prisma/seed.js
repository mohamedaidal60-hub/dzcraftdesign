const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');

const prisma = new PrismaClient();

async function main() {
    console.log('Initialisation de la base de donnees DZCRAFTDESIGN...');

    const hashedPassword = await bcrypt.hash('@sba-Trs2026', 12);

    const admin = await prisma.admin.upsert({
        where: { phone: '0XXXXXXXXXX' },
        update: {},
        create: {
            phone: '0XXXXXXXXXX',
            password: hashedPassword,
            name: 'Administrateur DZCRAFTDESIGN',
        },
    });
    console.log('Admin cree:', admin.phone);

    const categories = [
        { name: 'Adulte', slug: 'adulte', description: 'Collection adulte fabriquee en Algerie', order: 1, image: '/images/cat-adulte.jpg' },
        { name: 'Enfant', slug: 'enfant', description: 'Collection enfant made in Algeria', order: 2, image: '/images/cat-enfant.jpg' },
        { name: 'Bebe', slug: 'bebe', description: 'Collection bebe avec des matieres douces algeriennes', order: 3, image: '/images/cat-bebe.jpg' },
        { name: 'Accessoires', slug: 'accessoires', description: 'Accessoires authentiques algeriens', order: 4, image: '/images/cat-accessoires.jpg' },
    ];

    for (const cat of categories) {
        await prisma.category.upsert({
            where: { slug: cat.slug },
            update: {},
            create: cat,
        });
    }
    console.log('Categories creees');

    const adulte = await prisma.category.findUnique({ where: { slug: 'adulte' } });
    const enfant = await prisma.category.findUnique({ where: { slug: 'enfant' } });
    const bebe = await prisma.category.findUnique({ where: { slug: 'bebe' } });
    const accessoires = await prisma.category.findUnique({ where: { slug: 'accessoires' } });

    const allProducts = [
        {
            name: 'T-Shirt Alger Skyline',
            slug: 'tshirt-alger-skyline',
            description: 'T-shirt premium avec illustration de la skyline d\'Alger. 100% coton algerien.',
            price: 2500,
            comparePrice: 3000,
            categoryId: adulte.id,
            featured: true,
            images: [
                { url: '/images/products/tshirt-alger-1.jpg', alt: 'T-Shirt Alger Skyline face', order: 0 },
                { url: '/images/products/tshirt-alger-2.jpg', alt: 'T-Shirt Alger Skyline dos', order: 1 },
            ],
            variants: [
                { type: 'size', value: 'XS' }, { type: 'size', value: 'S' }, { type: 'size', value: 'M' },
                { type: 'size', value: 'L' }, { type: 'size', value: 'XL' }, { type: 'size', value: 'XXL' },
                { type: 'color', value: 'Blanc' }, { type: 'color', value: 'Noir' }, { type: 'color', value: 'Vert Algeria' },
            ],
        },
        {
            name: 'Hoodie Casbah Alger',
            slug: 'hoodie-casbah-alger',
            description: 'Hoodie chaud avec broderie Casbah d\'Alger. Tissu molleton de qualite superieure.',
            price: 4500,
            comparePrice: 5500,
            categoryId: adulte.id,
            featured: true,
            images: [{ url: '/images/products/hoodie-casbah-1.jpg', alt: 'Hoodie Casbah face', order: 0 }],
            variants: [
                { type: 'size', value: 'S' }, { type: 'size', value: 'M' },
                { type: 'size', value: 'L' }, { type: 'size', value: 'XL' },
                { type: 'color', value: 'Sable' }, { type: 'color', value: 'Kaki' }, { type: 'color', value: 'Blanc' },
            ],
        },
        {
            name: 'Polo Tipaza Heritage',
            slug: 'polo-tipaza-heritage',
            description: 'Polo elegant inspire des ruines de Tipaza. Coupe moderne, style intemporel.',
            price: 3200,
            comparePrice: null,
            categoryId: adulte.id,
            featured: false,
            images: [{ url: '/images/products/polo-tipaza-1.jpg', alt: 'Polo Tipaza face', order: 0 }],
            variants: [
                { type: 'size', value: 'S' }, { type: 'size', value: 'M' },
                { type: 'size', value: 'L' }, { type: 'size', value: 'XL' },
                { type: 'color', value: 'Blanc' }, { type: 'color', value: 'Marine' },
            ],
        },
        {
            name: 'T-Shirt Enfant Berbere',
            slug: 'tshirt-enfant-berbere',
            description: 'T-shirt colore pour enfants avec motifs berberes. Coton doux et hypoallergenique.',
            price: 1800,
            comparePrice: 2200,
            categoryId: enfant.id,
            featured: true,
            images: [{ url: '/images/products/tshirt-enfant-1.jpg', alt: 'T-Shirt Enfant berbere', order: 0 }],
            variants: [
                { type: 'size', value: '2 ans' }, { type: 'size', value: '4 ans' },
                { type: 'size', value: '6 ans' }, { type: 'size', value: '8 ans' },
                { type: 'size', value: '10 ans' }, { type: 'size', value: '12 ans' },
                { type: 'color', value: 'Blanc' }, { type: 'color', value: 'Rouge' }, { type: 'color', value: 'Bleu' },
            ],
        },
        {
            name: 'Sweat Enfant Taghit',
            slug: 'sweat-enfant-taghit',
            description: 'Sweat confortable avec illustration des dunes du Sahara. Pour les petits aventuriers.',
            price: 2800,
            comparePrice: 3200,
            categoryId: enfant.id,
            featured: false,
            images: [{ url: '/images/products/sweat-enfant-1.jpg', alt: 'Sweat Enfant Taghit', order: 0 }],
            variants: [
                { type: 'size', value: '4 ans' }, { type: 'size', value: '6 ans' },
                { type: 'size', value: '8 ans' }, { type: 'size', value: '10 ans' },
                { type: 'color', value: 'Sable' }, { type: 'color', value: 'Orange Sahara' },
            ],
        },
        {
            name: 'Body Bebe DZCraft',
            slug: 'body-bebe-dzcraft',
            description: 'Body bebe 100% coton bio. Doux contre la peau des nourrissons. Made in Algeria.',
            price: 1200,
            comparePrice: 1500,
            categoryId: bebe.id,
            featured: true,
            images: [{ url: '/images/products/body-bebe-1.jpg', alt: 'Body Bebe DZCraft', order: 0 }],
            variants: [
                { type: 'size', value: '0-3 mois' }, { type: 'size', value: '3-6 mois' },
                { type: 'size', value: '6-12 mois' }, { type: 'size', value: '12-18 mois' },
                { type: 'color', value: 'Blanc' }, { type: 'color', value: 'Jaune' },
                { type: 'color', value: 'Rose' }, { type: 'color', value: 'Bleu Ciel' },
            ],
        },
        {
            name: 'Pyjama Bebe Etoile',
            slug: 'pyjama-bebe-etoile',
            description: 'Pyjama bebe avec motif croissant et etoile algerienne. Confortable pour les nuits douces.',
            price: 1500,
            comparePrice: null,
            categoryId: bebe.id,
            featured: false,
            images: [{ url: '/images/products/pyjama-bebe-1.jpg', alt: 'Pyjama Bebe etoile', order: 0 }],
            variants: [
                { type: 'size', value: '0-3 mois' }, { type: 'size', value: '3-6 mois' }, { type: 'size', value: '6-12 mois' },
                { type: 'color', value: 'Blanc' }, { type: 'color', value: 'Vert Menthe' },
            ],
        },
        {
            name: 'Tote Bag Casbah',
            slug: 'tote-bag-casbah',
            description: 'Sac cabas avec serigraphie de la Casbah d\'Alger. Toile de coton resistante.',
            price: 1500,
            comparePrice: 1800,
            categoryId: accessoires.id,
            featured: true,
            images: [{ url: '/images/products/tote-casbah-1.jpg', alt: 'Tote Bag Casbah', order: 0 }],
            variants: [
                { type: 'color', value: 'Naturel' }, { type: 'color', value: 'Noir' },
            ],
        },
        {
            name: 'Casquette DZCraftDesign',
            slug: 'casquette-dzcraftdesign',
            description: 'Casquette brodee avec le logo DZCRAFTDESIGN. Style streetwear algerien.',
            price: 1800,
            comparePrice: 2200,
            categoryId: accessoires.id,
            featured: true,
            images: [{ url: '/images/products/casquette-1.jpg', alt: 'Casquette DZCraft', order: 0 }],
            variants: [
                { type: 'color', value: 'Noir' }, { type: 'color', value: 'Blanc' }, { type: 'color', value: 'Vert Algeria' },
            ],
        },
        {
            name: 'Echarpe Motifs Kabyle',
            slug: 'echarpe-motifs-kabyle',
            description: 'Echarpe tissee avec motifs kabyles traditionnels. Laine merinos algerienne.',
            price: 2200,
            comparePrice: null,
            categoryId: accessoires.id,
            featured: false,
            images: [{ url: '/images/products/echarpe-1.jpg', alt: 'Echarpe Kabyle', order: 0 }],
            variants: [
                { type: 'color', value: 'Rouge et Or' },
                { type: 'color', value: 'Bleu et Blanc' },
                { type: 'color', value: 'Noir et Argent' },
            ],
        },
    ];

    for (const prod of allProducts) {
        const existing = await prisma.product.findUnique({ where: { slug: prod.slug } });
        if (!existing) {
            await prisma.product.create({
                data: {
                    name: prod.name,
                    slug: prod.slug,
                    description: prod.description,
                    price: prod.price,
                    comparePrice: prod.comparePrice,
                    categoryId: prod.categoryId,
                    featured: prod.featured,
                    images: { create: prod.images },
                    variants: { create: prod.variants },
                },
            });
        }
    }
    console.log('Produits crees');

    const historyPosts = [
        {
            title: 'Le Textile Algerien : Un Savoir-Faire Millenaire',
            content: "L'Algerie possede une tradition textile riche qui remonte a des millenaires. Des berberes aux artisans modernes, l'art du tissage et de la broderie a traverse les ages. DZCRAFTDESIGN s'inscrit dans cette continuite en valorisant les artisans locaux et les techniques traditionnelles adaptees a la mode contemporaine.",
            image: '/images/history/textile-algerien.jpg',
            published: true,
            order: 1,
        },
        {
            title: "La Casbah d'Alger : Inspiration Eternelle",
            content: "Classee au patrimoine mondial de l'UNESCO, la Casbah d'Alger est un labyrinthe de ruelles et de maisons blanches qui inspire nos creations. Ses motifs geometriques, ses zeliges et son architecture mauresque se retrouvent dans chaque piece DZCRAFTDESIGN.",
            image: '/images/history/casbah-alger.jpg',
            published: true,
            order: 2,
        },
        {
            title: "Les Motifs Berberes : Symboles d'Identite",
            content: "Les motifs berberes, aussi appeles amazighs, sont bien plus que des decorations. Chaque symbole raconte une histoire, protege son porteur ou celebre un evenement. DZCRAFTDESIGN integre ces symboles dans ses creations pour preserver et transmettre cet heritage culturel precieux.",
            image: '/images/history/motifs-berberes.jpg',
            published: true,
            order: 3,
        },
        {
            title: "Le Sahara : Source d'Inspiration Infinie",
            content: "Des ergs dores de Taghit aux vastes etendues du Grand Sud, le Sahara algerien offre des paysages a couper le souffle. Ses couleurs - sable, ocre, or - inspirent notre palette de couleurs. Chaque collection porte en elle un souffle du desert.",
            image: '/images/history/sahara-algerie.jpg',
            published: true,
            order: 4,
        },
    ];

    for (const post of historyPosts) {
        await prisma.historyPost.create({ data: post });
    }
    console.log('Posts histoire crees');

    await prisma.aboutContent.create({
        data: {
            title: 'DZCRAFTDESIGN - Fierement Algerien',
            content: "DZCRAFTDESIGN est nee d'une passion profonde pour l'Algerie et d'une volonte de valoriser les savoir-faire algeriens a travers la mode.\n\nNotre demarche est simple : creer des vetements et accessoires de qualite qui font reference a l'histoire, la culture et la beaute de l'Algerie, tout en soutenant l'economie locale.\n\nFabrication 100% en Algerie. Partenariat avec des artisans et ateliers algeriens. Matieres premieres locales de qualite. Impression realisee par des imprimeurs algeriens. Emballage eco-responsable made in Algeria.\n\nFaire rayonner l'Algerie a travers la mode, du salon de l'Algerie a Lyon jusqu'aux quatre coins du monde.",
            image: '/images/about/founder.jpg',
        },
    });
    console.log('Contenu A propos cree');

    console.log('Base de donnees initialisee avec succes !');
    console.log('Connexion admin: 0XXXXXXXXXX / @sba-Trs2026');
}

main()
    .catch((e) => {
        console.error('Erreur:', e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
