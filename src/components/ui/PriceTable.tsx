import { formatPrice, type PriceCategory } from "@/data/prices";

export function PriceTable({ category }: { category: PriceCategory }) {
  return (
    <div className="overflow-x-auto rounded-2xl border border-line bg-white">
      <table className="w-full text-left text-sm sm:text-base">
        <caption className="sr-only">{`Ориентировочные цены: ${category.title}`}</caption>
        <thead className="bg-primary text-white">
          <tr>
            <th scope="col" className="px-4 py-3 text-left font-semibold sm:px-5">
              Работа
            </th>
            <th scope="col" className="px-4 py-3 text-right font-semibold sm:px-5">
              Цена
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-line">
          {category.items.map((item) => (
            <tr key={item.name}>
              <th scope="row" className="px-4 py-3 text-left font-medium sm:px-5">
                {item.name}
              </th>
              <td className="whitespace-nowrap px-4 py-3 text-right font-bold text-primary sm:px-5">
                {formatPrice(item)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}