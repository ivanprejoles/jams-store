"use client";

import { PaymentModal } from "@/components/payment-modal";
import PreviewModal from "@/components/preview-modal";
import { useEffect, useState } from "react";

const ModalProvider = () => {
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
    }, [])

    if (!isMounted) {
        return null;
    }

    return (
        <>
            <PreviewModal />
            <PaymentModal />
        </>
    );
}
 
export default ModalProvider;