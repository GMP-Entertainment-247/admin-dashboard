import { XMarkIcon } from "@heroicons/react/24/solid";
import clsx from "clsx";
import { motion, AnimatePresence } from "framer-motion";
import Button from "../shared/Button";

interface ModalProp {
    children: React.ReactNode;
    onClose: Function;
    show: boolean;
    extraClassname?: string;
    submitClick: Function,
    submitLoading: boolean,
}

export const Modal = ({
    show,
    children,
    onClose,
    extraClassname,
    submitClick,
    submitLoading,
}: ModalProp) => {
    return (
        <AnimatePresence>
            {show && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className={clsx(
                        show ? " h-screen w-[100%] " : "h-0 w-0 opacity-0",
                        "fixed top-0 left-0 z-[50] bg-black-1 bg-opacity-70 flex justify-center mb-20 overflow-y-auto"
                    )}
                >
                    <motion.div
                        initial={{ scale: 0.5, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0.5, opacity: 0 }}
                        transition={{ type: "spring", stiffness: 300, damping: 20 }}
                        className="absolute top-[20%] mx-auto pb-20"
                    >
                        <div
                            className={`bg-white rounded-lg min-w-[400px] p-5 ${extraClassname}`}
                        >
                            <XMarkIcon className="h-5 w-5 cursor-pointer float-right" onClick={() => onClose()} />
                            <div className="pt-6 pb-5">{children}</div>
                            <div className="flex gap-5">
                                <Button 
                                    text="Cancel"
                                    type="button"
                                    onClick={()=>onClose()}
                                    extraClassName="!bg-[#E6E6E6] !text-[#1A1A1A] rounded-[8px] font-semibold"
                                />
                                <Button 
                                    text="Confirm"
                                    type="button"
                                    isLoading={submitLoading}
                                    onClick={()=>submitClick()}
                                    extraClassName="rounded-[8px] font-semibold"
                                />
                            </div>
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};
