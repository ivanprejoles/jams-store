import { create} from 'zustand'
import { Payment } from '@/types'
import { formatDateStamp } from '@/lib/utils'

interface paymentType {
    isOpen: boolean,
    data: Payment,
    onOpen: (data: Payment) => void,
    onClose: () => void,
}

export const usePaymentModal = create<paymentType>((set) => ({
    isOpen: false,
    data: {
        orderId: '',
        name: '',
        date: formatDateStamp(new Date),
        amount: 0,
        imageSrc: '',
        email: '',
        phone: '',
        address: ''
    },
    onOpen: (data) => set(() => ({isOpen: true, data})),
    onClose: () => set({isOpen: false}),
}))