export default function PopularBangladesh() {
  const tabs = ['Domestic cities', 'International cities', 'Regions', 'Countries', 'Places to stay'];
  const items = [
    { name: "Cox's Bazar", count: '1,220 properties' },
    { name: 'Chattogram', count: '180 properties' },
    { name: 'Rajshahi', count: '62 properties' },
    { name: 'Sylhet', count: '240 properties' },
    { name: 'Rangpur', count: '54 properties' },
    { name: 'Khulna', count: '88 properties' }
  ];

  return (
    <section className="pb-10 pt-8">
      <div className="container">
        <div className="mb-4 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <h2 className="text-[1.35rem] font-semibold">Popular with travelers from Bangladesh</h2>
          <div className="flex flex-wrap gap-2">
            {tabs.map((tab, index) => (
              <button
                key={tab}
                className={`rounded-full border px-3 py-1 text-sm ${
                  index === 0 ? 'border-[#bcd6ff] bg-[#eaf2ff] text-link' : 'border-border text-muted'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>
        <div className="grid gap-4 md:grid-cols-3">
          {items.map((item) => (
            <div key={item.name}>
              <h4 className="font-semibold">{item.name}</h4>
              <p className="text-sm text-muted">{item.count}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
