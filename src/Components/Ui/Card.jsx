export const Card = ({ header, currency, amount, icon, desc, }) => {
    return (<div className="md:w-[15rem] lg:w-[15rem] xl:w-[18rem] w-[22rem]">
      <div className="shadow-xl border-sky-950 bg-white p-8  rounded-xl flex items-center justify-center gap-10">
        <div className="space-y-2 w-full">
          <h1 className="text-neutral-500 text-sm font-medium ">{header}</h1>
          <p>
            {currency}
            <span className="text-2xl text-neutral-700 font-medium">
              {" "}
              {amount.toLocaleString("en-US", {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
        })}
            </span>
          </p>
          <p className="text-sky-950 text-xs">{desc}</p>
        </div>
        <div>
          <span>{icon}</span>
        </div>
      </div>
    </div>);
};
//# sourceMappingURL=Card.jsx.map