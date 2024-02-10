import ReactDOM from "react-dom";

export interface IAppProps {}

export default function LoadingAny(props: IAppProps) {
  return ReactDOM.createPortal(
    <div className="fixed inset-0 flex justify-center items-center w-full h-full mask z-50">
      <div className="grid">
        <div className="grid-item"></div>
        <div className="grid-item"></div>
        <div className="grid-item"></div>
        <div className="grid-item"></div>
      </div>
    </div>,
    document.body
  );
  // return (
  //   <div className="absolute inset-0 flex justify-center items-center h-screen w-screen mask z-50">
  //     <div className="grid">
  //       <div className="grid-item"></div>
  //       <div className="grid-item"></div>
  //       <div className="grid-item"></div>
  //       <div className="grid-item"></div>
  //     </div>
  //   </div>
  // );
}
