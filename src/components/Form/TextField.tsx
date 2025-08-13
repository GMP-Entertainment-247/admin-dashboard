// import clsx from "clsx";
// import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";
// import { useSingleState } from "../../utils/hooks/useSingleState";
// import { ErrorWrapper } from "./ErrorWrapper";

// interface ITextFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
//     label?: string;
//     required?: boolean;
//     type?: "text" | "number" | "password" | "email" | "tel" | "date" | "time";
//     context?: boolean;
//     extraClassName?: string;
// }
// export function TextField({
//     context = true,
//     label,
//     required,
//     extraClassName,
//     ...props
// }: ITextFieldProps) {
//     const focused = useSingleState(false);
//     const showText = useSingleState(false);

//     return (
//         <div>
//             <ErrorWrapper show={context} name={props.name}>
//                 {({ hasError } : {hasError: boolean}) => (
//                     <div className="flex flex-col relative w-full">
//                         <label className="text-white font-medium text-base mb-1.5">{label}</label>
//                         <div className="relative">
//                             <input
//                                 className={clsx([
//                                     "block w-full rounded-[12px] px-4 h-[52px] outline-none text-sm bg-transparent border border-[#F4F4F44D] text-[#F4F4F44D]",
//                                     hasError && "!border-red-400 border",
//                                     extraClassName,
//                                 ])}
//                                 {...props}
//                                 type={
//                                     props.type === "password" && showText.get
//                                     ? "text"
//                                     : props.type
//                                 }
//                                 onFocus={(e) => {
//                                     focused.set(true);
//                                     props.onFocus?.(e);
//                                 }}
//                                 onBlur={(e) => {
//                                     focused.set(false);
//                                     props.onBlur?.(e);
//                                 }}
//                             />
//                             {props.type === "password" && (
//                                 <button
//                                     type="button"
//                                     onClick={showText.toggle}
//                                     className="absolute top-[17px] right-4"
//                                 >
//                                     {showText.get ? (
//                                         <EyeSlashIcon className="h-5 w-5 text-white" />
//                                         ) : (
//                                         <EyeIcon className="h-5 w-5 text-white" />
//                                     )}
//                                 </button>
//                             )}
//                         </div>
//                     </div>
//                 )}
//             </ErrorWrapper>
//         </div>
//     );
// }
