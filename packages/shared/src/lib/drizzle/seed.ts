// seed.ts
import { drizzle } from 'drizzle-orm/node-postgres';
import { productsTable } from './schema';
import { config } from 'dotenv';

config();

const db = drizzle(String(process.env.DATABASE_URL));
const mockProducts = [
  {
    name: 'Классические кроссовки',
    desc: 'Универсальная обувь для повседневной носки',
    price: 4500,
  },
  {
    name: 'Беспроводные наушники',
    desc: 'С шумоподавлением и 20ч работой',
    price: 7990,
  },
  {
    name: 'Электронная книга',
    desc: "Экран E-Ink 6'', поддержка EPUB",
    price: 12900,
  },
  { name: 'Умные часы', desc: 'Мониторинг пульса и сна', price: 14999 },
  {
    name: 'Рюкзак городской',
    desc: 'Водонепроницаемый материал, 30л',
    price: 2990,
  },
  { name: 'Кофеварка', desc: 'Капельного типа, 1.5л', price: 4390 },
  { name: 'Беспроводная мышь', desc: 'Оптический сенсор 2400dpi', price: 1590 },
  {
    name: 'Керамический нож',
    desc: 'Шеф-нож из циркониевой керамики',
    price: 6990,
  },
  { name: 'Power Bank 20000mAh', desc: 'Быстрая зарядка 18W', price: 1890 },
  {
    name: 'Электрический чайник',
    desc: 'Мощность 2200W, стальной корпус',
    price: 2490,
  },
  { name: 'Йогуртница', desc: '6 стеклянных баночек', price: 3490 },
  { name: 'Блендер погружной', desc: 'Мощность 800W', price: 2990 },
  { name: 'УФ-лампа для сушки геля', desc: 'Таймер до 60 сек', price: 990 },
  {
    name: 'Геймпад беспроводной',
    desc: 'Поддержка PC/PS4/Android',
    price: 4590,
  },
  {
    name: 'Набор кистей для макияжа',
    desc: '12 профессиональных кистей',
    price: 1590,
  },
  { name: 'Экшен-камера', desc: '4K 60fps, влагозащита', price: 23900 },
  { name: 'Эспрессо-турка', desc: 'Медная, 250ml', price: 2990 },
  { name: 'Коврик для йоги', desc: 'Толщина 6мм, размер 180cm', price: 890 },
  { name: 'Беспроводной звонок', desc: 'Радиус действия 300м', price: 1990 },
  { name: 'Настольная лампа', desc: 'RGB подсветка, USB-разъемы', price: 3490 },
];

async function seed() {
  try {
    console.log('⌛ Seeding products...');

    await db.delete(productsTable).execute();

    await db
      .insert(productsTable)
      .values(mockProducts)
      .onConflictDoNothing()
      .execute();

    console.log('Successfully inserted 20 products');
  } catch (error) {
    console.error('Seeding error:', error);
    process.exit(1);
  }
}

seed();
