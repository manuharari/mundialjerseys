
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
async function main(){
  await prisma.product.createMany({
    data: [
      { sku: 'MX-24-H', title:'México Local 24', title_en:'Mexico Home 24', team:'Mexico', price: 169900, sizes:'S,M,L,XL', stockS:10, stockM:20, stockL:20, stockXL:10, image:'/mx-home.png' },
      { sku: 'AR-24-H', title:'Argentina Local 24', title_en:'Argentina Home 24', team:'Argentina', price: 179900, sizes:'S,M,L,XL', stockS:10, stockM:20, stockL:20, stockXL:10, image:'/ar-home.png' },
    ]
  });
}
main().finally(()=>prisma.$disconnect());
