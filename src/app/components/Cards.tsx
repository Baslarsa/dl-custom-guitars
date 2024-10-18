import Container from "./layout/Container";

const Cards = () => {
  return (
    <div className="w-full flex gap-4 justify-between flex-wrap relative">
      <div className="h-[400px] w-[300px] bg-slate-950 -mt-16 rounded-sm">
        <div className="h-[60%] w-full bg-slate-400"></div>
        <div className="p-4">
          <h6 className="font-semibold">Card Title</h6>
        </div>
      </div>
    </div>
  );
};

export default Cards;
