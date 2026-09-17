export default async function MenuItemPage({ params }) {
  const { id } = await params;
  return (
    <div className="flex flex-col flex-1 items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <h1>Menu Item {id}</h1>
      <p>Details for item {id}</p>
    </div>
  );
}
