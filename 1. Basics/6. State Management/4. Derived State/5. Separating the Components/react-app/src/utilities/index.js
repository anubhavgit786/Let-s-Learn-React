export const percentage = (num,total)=>
{
  const percentage = (num/total)*100
  return percentage.toFixed(2);
}

export const initialItems = [
  { id: 1, description: "Passports", quantity: 2, packed: false },
  { id: 2, description: "Socks", quantity: 12, packed: true },
  { id: 3, description: "Chargers", quantity: 2, packed: false },
];