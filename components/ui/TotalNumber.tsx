import { useRef } from "react";

export default function TotalNumber({
  render,
  total,
}: {
  render: boolean;
  total: number;
}) {
  const number = useRef<HTMLDivElement>(null);
  const left = useRef<HTMLDivElement>(null);
  const rights = useRef<HTMLDivElement>(null);
  const separator = useRef<HTMLDivElement>(null);
  let target = total;
  let current: number = 0;
  let step = 42;

  const reset = () => {
    const win: any = typeof window !== "undefined" ? window : undefined;
    if (!win) return;
    win.requestAnimationFrame(start);
  };

  const start = () => {
    // rights.current?.classList.add("animate");
    update();
  };

  const updateValues = () => {
    const [first, ...rest] = current
      .toLocaleString("en-US")
      .split(",")
      .reverse();
    let thousends = rest.reverse();

    // const thousendsString = thousends.join("");
    // 每三位加一个逗号
    const thousendsString = thousends.join(",");

    // if (left.current && +left.current?.innerText !== +thousendsString) {
    //   left.current && left.current.classList.add("animate");
    // } else {
    //   left.current && left.current?.classList.remove("animate");
    // }

    if (left.current) {
      left.current.innerText = thousendsString;
    }
    if (rights.current) {
      rights.current.innerText = first;
    }
  };

  const update = () => {
    // if (target - current > 0) {
    //   current += step;
    // } else {
    //   current -= step;
    // }
    current = target;
    if (current >= 1000) {
      separator.current && separator.current.classList.add("show");
    } else {
      separator.current && separator.current.classList.remove("show");
    }
    updateValues();
    // if (Math.abs(target - current) > step) {
    //   requestAnimationFrame(update);
    // } else {
    //   requestAnimationFrame(() => {
    //     current = target;
    //     updateValues();
    //     if (left.current) {
    //       left.current.classList.remove("animate");
    //     }
    //     if (rights.current) {
    //       rights.current.classList.remove("animate");
    //     }
    //   });
    // }
  };

  reset();

  return render ? (
    <>
      <div
        className="number text-[36px] sm:text-[48px] w-full"
        id="number"
        ref={number}
      >
        <div className="left" id="left" ref={left}></div>
        <div className="separator" id="separator" ref={separator}>
          ,
        </div>
        <div className="right" id="right" ref={rights}>
          {total}
        </div>
      </div>

      <svg
        className="svgFilter"
        xmlns="http://www.w3.org/2000/svg"
        version="1.1"
      >
        <defs>
          <filter id="blurFilter">
            <feGaussianBlur
              id="blurFilterItem"
              in="SourceGraphic"
              stdDeviation="8,0"
            />
          </filter>
        </defs>
      </svg>
    </>
  ) : null;
}
