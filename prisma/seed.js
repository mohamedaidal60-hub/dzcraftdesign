const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');

const prisma = new PrismaClient();

async function main() {
    console.log('Initialisation de la base de donnees DZCRAFTDESIGN sur Supabase...');

    const hashedPassword = await bcrypt.hash('@sba-Trs2026', 12);

    const admin = await prisma.admin.upsert({
        where: { phone: '+33767099115' },
        update: { password: hashedPassword },
        create: {
            phone: '+33767099115',
            password: hashedPassword,
            name: 'Propriétaire DZCRAFTDESIGN',
        },
    });
    console.log('Admin cree:', admin.phone);

    const categories = [
        { name: 'Adulte', slug: 'adulte', description: 'Collection adulte fabriquee en Algerie', order: 1, image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&q=80' },
        { name: 'Enfant', slug: 'enfant', description: 'Collection enfant made in Algeria', order: 2, image: 'https://images.unsplash.com/photo-1519706332593-e6753462441d?auto=format&fit=crop&q=80' },
        { name: 'Bebe', slug: 'bebe', description: 'Collection bebe avec des matieres douces algeriennes', order: 3, image: 'https://images.unsplash.com/photo-1522771935876-2497116a7a9e?auto=format&fit=crop&q=80' },
        { name: 'Accessoires', slug: 'accessoires', description: 'Accessoires authentiques algeriens', order: 4, image: 'https://images.unsplash.com/photo-1544441893-675973e31985?auto=format&fit=crop&q=80' },
    ];

    for (const cat of categories) {
        await prisma.category.upsert({
            where: { slug: cat.slug },
            update: cat,
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
            images: [{ url: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&q=80', alt: 'T-Shirt Alger face', order: 0 }],
            variants: [{ type: 'size', value: 'M' }, { type: 'size', value: 'L' }, { type: 'color', value: 'Blanc' }],
        },
        {
            name: 'Hoodie Casbah Alger',
            slug: 'hoodie-casbah-alger',
            description: 'Hoodie chaud avec broderie Casbah d\'Alger. Tissu molleton de qualite superieure.',
            price: 4500,
            comparePrice: 5500,
            categoryId: adulte.id,
            featured: true,
            images: [{ url: 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?auto=format&fit=crop&q=80', alt: 'Hoodie Casbah', order: 0 }],
            variants: [{ type: 'size', value: 'L' }, { type: 'color', value: 'Sable' }],
        },
        {
            name: 'Polo Tipaza Heritage',
            slug: 'polo-tipaza-heritage',
            description: 'Polo elegant inspire des ruines de Tipaza. Coupe moderne, style intemporel.',
            price: 3200,
            categoryId: adulte.id,
            featured: false,
            images: [{ url: 'https://images.unsplash.com/photo-1581655353564-df123a1eb820?auto=format&fit=crop&q=80', alt: 'Polo Tipaza', order: 0 }],
            variants: [{ type: 'size', value: 'M' }, { type: 'color', value: 'Marine' }],
        },
        {
            name: 'T-Shirt Enfant Berbere',
            slug: 'tshirt-enfant-berbere',
            description: 'T-shirt colore pour enfants avec motifs berberes. Coton doux et hypoallergenique.',
            price: 1800,
            categoryId: enfant.id,
            featured: true,
            images: [{ url: 'https://images.unsplash.com/photo-1519706332593-e6753462441d?auto=format&fit=crop&q=80', alt: 'T-Shirt Enfant', order: 0 }],
            variants: [{ type: 'size', value: '6 ans' }, { type: 'color', value: 'Rouge' }],
        },
        {
            name: 'Body Bebe DZCraft',
            slug: 'body-bebe-dzcraft',
            description: 'Body bebe 100% coton bio. Doux contre la peau des nourrissons. Made in Algeria.',
            price: 1200,
            categoryId: bebe.id,
            featured: true,
            images: [{ url: 'https://images.unsplash.com/photo-1522771935876-2497116a7a9e?auto=format&fit=crop&q=80', alt: 'Body Bebe', order: 0 }],
            variants: [{ type: 'size', value: '6-12 mois' }, { type: 'color', value: 'Blanc' }],
        },
        {
            name: 'Tote Bag Casbah',
            slug: 'tote-bag-casbah',
            description: 'Sac cabas avec serigraphie de la Casbah d\'Alger. Toile de coton resistante.',
            price: 1500,
            categoryId: accessoires.id,
            featured: true,
            images: [{ url: 'https://images.unsplash.com/photo-1544441893-675973e31985?auto=format&fit=crop&q=80', alt: 'Tote Bag', order: 0 }],
            variants: [{ type: 'color', value: 'Naturel' }],
        }
    ];

    for (const prod of allProducts) {
        const { images, variants, ...prodData } = prod;
        await prisma.product.upsert({
            where: { slug: prod.slug },
            update: prodData,
            create: {
                ...prodData,
                images: { create: images },
                variants: { create: variants },
            },
        });
    }
    console.log('Produits crees');

    const historyPosts = [
        {
            title: 'Le Textile Algerien',
            content: "L'Algerie possede une tradition textile riche qui remonte a des millenaires. DZCRAFTDESIGN s'inscrit dans cette continuite.",
            image: 'https://images.unsplash.com/photo-1544441893-675973e31985?auto=format&fit=crop&q=80',
            published: true,
            order: 1,
        }
    ];

    for (const post of historyPosts) {
        await prisma.historyPost.create({ data: post });
    }
    console.log('Posts histoire crees');

    await prisma.aboutContent.create({
        data: {
            title: 'DZCRAFTDESIGN - Fierement Algerien',
            content: "DZCRAFTDESIGN est nee d'une passion profonde pour l'Algerie.",
            image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&q=80',
        },
    });
    console.log('Contenu A propos cree');

    console.log('Base de donnees initialisee avec succès !');
}

main()
    .catch((e) => {
        console.error('Erreur:', e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
