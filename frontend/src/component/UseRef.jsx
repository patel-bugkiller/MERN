// import { useEffect, useState } from "react"

// const UseRef =() =>{
//     var [text,setText] = useState("")
//     var previousRender = UseRef();
//     useEffect(()=>{
//         previousRender.current = text
//     },[text])
//     return(
//         <div>
//             <input value={text} onChange={(e) => setText(e.target.value)} />
//             <h1>current value :{text}</h1>
//             <h1>previous value:{previousRender.current}</h1>
//         </div>
//     );
// }
// export default UseRef;


import { useEffect, useState, useRef } from "react";

const UseRefExample = () => {
  const [text, setText] = useState("");
  const previousRender = useRef(""); // ✅ useRef hook

  useEffect(() => {
    previousRender.current = text; // store the last value
  }, [text]);

  return (
    <div>
      <input
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Type something..."
      />
      <h1>Current value: {text}</h1>
      <h1>Previous value: {previousRender.current}</h1>
    </div>
  );
};

export default UseRefExample;
