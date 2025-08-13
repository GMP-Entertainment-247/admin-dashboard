// import React, { useMemo } from "react";

// export function useSingleState<S>(initialState: S | (() => S)) {
//     const [data, setData] = React.useState(initialState);
//     const firstTime = React.useRef(true);
//     const signal = useMemo(() => {
//       return {
//         get: data,
//         set: (s: React.SetStateAction<S>) => {
//           setData(s);
//           firstTime.current = false;
//         },
//         inputSet: (
//           e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | string
//         ) => {
//           if (typeof data === "string") {
//             // @ts-ignore
//             setData(e?.target ? e.target.value : e);
//             firstTime.current = false;
//           }
//         },
//         reset: () => setData(initialState),
//         toggle: () => {
//           if (typeof data === "boolean") {
//             // @ts-ignore
//             setData((d) => !d);
//             firstTime.current = false;
//           }
//         },
//         firstTime: firstTime,
//       };
//     }, [data]);
//   return signal;
// }
