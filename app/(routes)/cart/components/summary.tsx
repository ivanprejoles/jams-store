"use client";

import axios from "axios";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";

import {Button} from "@/components/ui/button";
import Currency from "@/components/ui/currency";
import useCart from "@/hooks/use-cart";
import { toast } from "react-hot-toast";
import { InfosModal } from "./information-modal";
import { CopyModal } from "./copy-order";
import {formatTimestamp} from '@/lib/utils'
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { SignedIn, SignedOut, SignInButton } from "@clerk/nextjs";

export interface exportedData  {
  orderItems: string[];
  createAt: string;
  address: string;
  id: string;
  isPaid: boolean;
  phone: string;
  createdAt: Date;
}
const Summary = () => {
  const searchParams = useSearchParams();
  const items = useCart((state) => state.items);
  const removeAll = useCart((state) => state.removeAll);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isCopyOpen, setIsCopyOpen] = useState(false);
  const [data, setData] = useState<exportedData|undefined>()
  const [isLoading, setIsLoading] = useState(false);
  const { isSignedIn, isLoaded , user} = useUser();
  const router = useRouter()
  
  useEffect(() => {
    if (searchParams.get('success')) {
      toast.success('Payment completed.');
      removeAll();
    }

    if (searchParams.get('canceled')) {
      toast.error('Something went wrong.');
    }
  }, [searchParams, removeAll]);

  const formatExportedDataWithDelimiter = (data: exportedData|undefined) => {
    if (data) {
      return `
        Order ID: ${data.id} | 
        Address: ${data.address} | 
        Phone: ${data.phone} | 
        Paid Status: ${data.isPaid ? 'Paid' : 'Not Paid'} | 
        Order Items: ${data.orderItems.join(', ')} | 
        Created At: ${formatTimestamp(data.createdAt.toLocaleString())}
        `.trim();
    }
    return ''
  }
  
  const onCopy = () => {
    if (!data) return
    const formattedData = formatExportedDataWithDelimiter(data);
    navigator.clipboard.writeText(formattedData);
    toast.success('Order Information Copied.')
  }

  const totalPrice = items.reduce((total, item) => {
    return total + Number(item.price)
  }, 0);

  const onCheckout = async ({
    address,
    contactNumber
  }: {
    address: string;
    contactNumber: string;
}) => {
    try {
      if (isLoading) return
      setIsLoading(true)

      if (isLoaded) {
        setIsLoading(false);
        if (!isSignedIn) {
          return router.push("/sign-in");
        }
      }
      
      const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/checkout`, {
        productIds: items.map((item) => item.id),
        address,
        contactNumber,
        userId: user?.id,
        email: user?.emailAddresses[0].emailAddress,
        name: user?.fullName
      });
      removeAll()
      setData(response.data)
      setIsCopyOpen(true)
      toast.success('Order Added.');
      onCopy()
    } catch (error) {
      toast.error('Something went wrong.');
      console.error(error)
    } finally {
      setIsLoading(false)
      setIsModalOpen(false)
    }
  }

  return ( 
    <div
      className="mt-16 rounded-lg backdrop-blur-sm bg-slate-100/5 dark:bg-white/5 border-slate-600/40 dark:border-white/40 border px-4 py-6 sm:p-6 lg:col-span-5 lg:mt-0 lg:p-8"
    >
      <h2 className="text-lg font-medium text-gray-900 dark:text-gray-200">
        Order summary
      </h2>
      <div className="mt-6 space-y-4">
        <div className="flex items-center justify-between border-t border-gray-200 pt-4">
          <div className="text-base font-medium text-gray-900 dark:text-gray-200">Order total</div>
         <Currency value={totalPrice} />
        </div>
      </div>
      <SignedIn>
        <Button onClick={() => setIsModalOpen(true)} disabled={items.length === 0 || isLoading} className="w-full mt-6 bg-gradient-to-r from-indigo-500 to-purple-500 text-white">
          Order
        </Button>
      </SignedIn>
      <SignedOut>
          <SignInButton mode="modal">
            <Button disabled={items.length === 0 || isLoading} className="w-full mt-6 text-white bg-gradient-to-r from-indigo-500 to-purple-500">
              Order
            </Button>
          </SignInButton>
      </SignedOut>
      <InfosModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={onCheckout}
        loading={isLoading}
      />
      <CopyModal
        isOpen={isCopyOpen}
        onClose={() => setIsCopyOpen(false)}
        onConfirm={onCopy}
        data={formatExportedDataWithDelimiter(data)}
      />
    </div>
  );
}
 
export default Summary;