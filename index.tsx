import Header from '@/components/Header'; // The path has been updated to use the absolute alias
import ProductCard from '@/components/ProductCard'; // The path has been updated to use the absolute alias
import { prisma } from '@/lib/db'; // The path has been updated to use the absolute alias
import type { NextPage } from 'next';
import Head from 'next/head';
import Image from 'next/image';

interface HomeProps {
  products: {
    id: string;
    createdAt: Date;
    title: string;
    title_en?: string | null;
    team: string;
    price: number;
    sizes: string;
    image?: string | null;
    sku: string;
    stockXS: number;
    stockS: number;
    stockM: number;
    stockL: number;
    stockXL: number;
  }[];
}

const Home: NextPage<HomeProps> = ({ products }) => {
  return (
    <div className="bg-white min-h-screen">
      <Head>
        <title>Mundial Jerseys</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header />

      <main className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-center text-gray-800 mb-8">
          Mundial Jerseys
        </h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </main>

      <footer className="w-full text-center p-4 text-gray-600">
        <p>© 2024 Mundial Jerseys</p>
      </footer>
    </div>
  );
};

export async function getServerSideProps() {
  try {
    const products = await prisma.product.findMany();
    return {
      props: {
        products: JSON.parse(JSON.stringify(products)),
      },
    };
  } catch (e) {
    console.error(e);
    return {
      props: {
        products: [],
      },
    };
  }
}

export default Home;
