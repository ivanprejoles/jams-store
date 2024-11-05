import Image from "next/image"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "../../ecommerce-admin/components/ui/dialog"
import { usePaymentModal } from "@/hooks/use-payment-modal"
import { ScrollArea } from "./ui/scroll-area"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import axios from "axios"
import { Form, FormControl, FormField, FormItem, FormMessage } from "../../ecommerce-admin/components/ui/form"
import { useEffect, useMemo, useState } from "react"
import toast from "react-hot-toast"
import { Textarea } from "./ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../ecommerce-admin/components/ui/select"
import { AspectRatio } from "./ui/aspect-ratio"
import { CldUploadWidget } from "next-cloudinary"
import { CalendarIcon, ImagePlus } from "lucide-react"
import { useRouter } from "next/navigation"
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover"
import { cn } from "@/lib/utils"
import { format } from "date-fns"
import { Calendar } from "./ui/calendar"

const formSchema = z.object({
    orderId: z.string().min(2, {
        message: 'Order ID is not valid.'
    }),
    email: z.string().min(2, {
      message: "email is not valid.",
    }),
    phone: z.string().min(2, {
      message: "phone is not valid.",
    }),
    address: z.string().min(2, {
        message: 'address is needed.'
    }),
    name: z.string().min(2, {
        message: 'name is needed.'
    }),
    date: z.date({
        required_error: "date is required.",
    }),
    amount: z.number().min(2, {
        message: 'total payment is required.'
    }),
    imageSrc: z.string().min(2, {
        message: 'payment reference is required.'
    })
})

export function PaymentModal() {
    const [currentImage, setCurrentImage] = useState('')
    const [newImage, setNewImage] = useState<File>();
    const {
        isOpen,
        onClose,
        data
    } = usePaymentModal()

    const router = useRouter()

    const handleClose = () => {
        setNewImage(undefined)
        onClose()

        setTimeout(() => {
            document.body.style.pointerEvents = "auto"; // Restore pointer events
        }, 1000);
    }

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            orderId: '',
            email: '',
            phone: '',
            address: '',
            name: '',
            date: new Date(),
            amount: 0,
            imageSrc: ''
        },
    })

    useEffect(() => {
        formReset()
    }, [data])

    const formReset = () => {
        form.setValue('orderId', data.orderId)
        form.setValue('name', data.name)
        form.setValue('date', new Date())
        form.setValue('amount', data.amount)
        form.setValue('imageSrc', data.imageSrc)
        form.setValue('email', data.email)
        form.setValue('phone', data.phone)
        form.setValue('address', data.address)
        setCurrentImage(data.imageSrc)
    }

    const imageUrl = useMemo(() => {
        if (newImage) {
          return URL.createObjectURL(newImage);
        }
        return undefined;
    }, [newImage]);

    const isLoading = form.formState.isSubmitting

    async function onSubmit(values: z.infer<typeof formSchema>) {
        if (isLoading) return
        
        // if (newImage) {
        //     const date = new Date();
        //     const dateString = date.toISOString().replace(/[-:.T]/g, '');
        //     const storageRef = ref(storage, `${dateString}-${newImage.name.split('.').pop()}`)
        //     const uploadTask = uploadBytesResumable(storageRef, newImage);

        //     try {
        //         const downloadURL = await new Promise<string>((resolve, reject) => {
        //             uploadTask.on(
        //               'state_changed',
        //               (snapshot: UploadTaskSnapshot) => {
        //                 // Monitor progress
        //                 const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        //                 console.log(`Upload is ${progress}% done`);
        //               },
        //               (error) => {
        //                 reject(new Error('Something went wrong uploading the new image.'));
        //               },
        //               async () => {
        //                 try {
        //                   const url = await getDownloadURL(uploadTask.snapshot.ref);
        //                   resolve(url);
        //                 } catch (error) {
        //                   reject(new Error('Failed to retrieve download URL.'));
        //                 }
        //               }
        //             );
        //         });
    
        //         values.imageSrc = downloadURL
        //         const filePath = decodeURIComponent(currentImage.split('/o/')[1].split('?')[0])
        //         const desertRef = ref(storage, filePath);

        //         deleteObject(desertRef)
        //             .then(() => {
        //                 toast({
        //                     title: `Previous Image Updated`,
        //                     description: 'Previous image updated successfully.',
        //                 })
        //             })
        //             .catch((error) => {
        //                 toast({
        //                     title: `Error Updating Image`,
        //                     description: 'Something went wrong deleting image.',
        //                 })
        //             });
        //     } catch (error) {
        //         toast({
        //             title: `Error Uploading Image`,
        //             description: 'Something went wrong uploading image. make sure the image size is not too large.',
        //         })
        //     }

        // }
        
        await axios.patch('/api/updateProduct', values)
            .then((response) => {
                toast.success('Payment Reference Added.')
                router.refresh()
            })
            .catch((error) => {
                console.error('error: ', error)
                toast.error('Something went wrong. Please try again.')
            })
            .finally(() => {
                handleClose()
            })
    }

    const onUpload = (result: any) => {
        // onChange(result.info.secure_url);
    }

    const handleFileUpload = (files: File[]) => {
        setNewImage(files[0])
    };

    const onClearForm = () => {
        form.reset()
        formReset()
        setNewImage(undefined)
    }
        
    return (
        <Dialog open={isOpen} onOpenChange={handleClose}>
            <DialogContent className='w-full max-w-[90vw] md:max-w-[80vw] h-[90vh] shadow-lg mt-8'>
                <DialogHeader>
                    <DialogTitle>Proof of Payment</DialogTitle>
                    <DialogDescription>
                        This section serves as proof of payment for the transaction made via GCash. Please provide the information.
                    </DialogDescription>
                </DialogHeader>
                <ScrollArea className="px-0 md:px-3">
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 px-0 md:px-2">
                            <div className="flex min-h-screen w-full flex-col bg-muted/40">
                                <div className="flex flex-col sm:gap-4 sm:py-4 sm:pr-4 mt-6">
                                    <main className="grid flex-1 items-start gap-4 px-0 sm:px-6 sm:py-0 md:gap-8">
                                    <div className="mx-auto grid max-w-full flex-1 auto-rows-max gap-4">
                                        <div className="grid gap-4 md:grid-cols-[1fr_250px] lg:grid-cols-3 lg:gap-8">
                                        <div className="grid auto-rows-max items-start gap-4 lg:col-span-2 lg:gap-8">
                                            <Card x-chunk="dashboard-07-chunk-0">
                                                <CardHeader>
                                                    <CardTitle>User Section</CardTitle>
                                                    <CardDescription>
                                                        Insert your current information.
                                                    </CardDescription>
                                                </CardHeader>
                                                <CardContent>
                                                    <div className="grid gap-6">
                                                        <div className="grid gap-3">
                                                            <Label htmlFor="name">Name</Label>
                                                            <FormField
                                                                control={form.control}
                                                                name="name"
                                                                disabled
                                                                render={({ field }) => (
                                                                    <FormItem>
                                                                        <FormControl>
                                                                            <Input disabled={isLoading} type='text' placeholder="Insert Name" {...field} />
                                                                        </FormControl>
                                                                        <FormMessage />
                                                                    </FormItem>
                                                                )}
                                                            />
                                                        </div>
                                                        <div className="grid gap-3">
                                                            <Label htmlFor="name">Email</Label>
                                                            <FormField
                                                                control={form.control}
                                                                name="email"
                                                                disabled
                                                                render={({ field }) => (
                                                                    <FormItem>
                                                                        <FormControl>
                                                                            <Input disabled={isLoading} type='email' placeholder="Insert Email" {...field} />
                                                                        </FormControl>
                                                                        <FormMessage />
                                                                    </FormItem>
                                                                )}
                                                            />
                                                        </div>
                                                        <div className="grid gap-3">
                                                            <Label htmlFor="address">Address</Label>
                                                            <FormField
                                                                control={form.control}
                                                                name="address"
                                                                render={({ field }) => (
                                                                    <FormItem>
                                                                    <FormControl>
                                                                        <Textarea
                                                                            disabled={isLoading}
                                                                            placeholder="Tell us about your product size and description."
                                                                            className="resize-none"
                                                                            {...field}
                                                                        />
                                                                    </FormControl>
                                                                    <FormMessage />
                                                                    </FormItem>
                                                                )}
                                                            />
                                                        </div>
                                                        <div className="grid gap-3">
                                                            <Label htmlFor="address">Contact Number</Label>
                                                            <FormField
                                                                control={form.control}
                                                                name="phone"
                                                                render={({ field }) => (
                                                                    <FormItem>
                                                                        <FormControl>
                                                                            <Input disabled={isLoading} type='tel' placeholder="Product Title" {...field} />
                                                                        </FormControl>
                                                                        <FormMessage />
                                                                    </FormItem>
                                                                )}
                                                            />
                                                        </div>
                                                    </div>
                                                </CardContent>
                                            </Card>
                                            <Card x-chunk="dashboard-07-chunk-1">
                                                <CardHeader>
                                                    <CardTitle>Payment Section</CardTitle>
                                                    <CardDescription>
                                                        Amount Paid
                                                    </CardDescription>
                                                </CardHeader>
                                                <CardContent>
                                                    <Table>
                                                        <TableHeader>
                                                            <TableRow>
                                                            <TableHead>Payment (₱)</TableHead>
                                                            </TableRow>
                                                        </TableHeader>
                                                        <TableBody>
                                                            <TableRow>
                                                                <TableCell>
                                                                    <Label htmlFor="price-1" className="sr-only">
                                                                        Amount Paid
                                                                    </Label>
                                                                    <FormField
                                                                        control={form.control}
                                                                        name="amount"
                                                                        render={({ field }) => (
                                                                            <FormItem>
                                                                                <FormControl>
                                                                                    <Input disabled={isLoading} type='number' placeholder="Price" {...field} />
                                                                                </FormControl>
                                                                                <FormMessage />
                                                                            </FormItem>
                                                                        )}
                                                                    />
                                                                </TableCell>
                                                            </TableRow>
                                                        </TableBody>
                                                    </Table>
                                                </CardContent>
                                            </Card>
                                        </div>
                                        <div className="grid auto-rows-max items-start gap-4 lg:gap-8">
                                            <Card x-chunk="dashboard-07-chunk-3">
                                                <CardHeader>
                                                    <CardTitle>Date Section</CardTitle>
                                                    <CardDescription>
                                                        Date Paid
                                                    </CardDescription>
                                                </CardHeader>
                                                <CardContent>
                                                    <div className="grid gap-6">
                                                        <Label htmlFor="date" className="sr-only">
                                                            Payment Date
                                                        </Label>
                                                        <FormField
                                                            control={form.control}
                                                            name="date"
                                                            render={({ field }) => (
                                                                <FormItem className="flex flex-col">
                                                                <Popover>
                                                                    <PopoverTrigger asChild>
                                                                    <FormControl>
                                                                        <Button
                                                                        variant={"outline"}
                                                                        className={cn(
                                                                            "w-[240px] pl-3 text-left font-normal",
                                                                            !field.value && "text-muted-foreground"
                                                                        )}
                                                                        >
                                                                        {field.value ? (
                                                                            format(field.value, "PPP")
                                                                        ) : (
                                                                            <span>Pick a date</span>
                                                                        )}
                                                                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                                                        </Button>
                                                                    </FormControl>
                                                                    </PopoverTrigger>
                                                                    <PopoverContent className="w-auto p-0" align="start">
                                                                    <Calendar
                                                                        mode="single"
                                                                        selected={field.value}
                                                                        onSelect={field.onChange}
                                                                        disabled={(date: any) =>
                                                                        date > new Date() || date < new Date("1900-01-01")
                                                                        }
                                                                        initialFocus
                                                                    />
                                                                    </PopoverContent>
                                                                </Popover>
                                                                <FormMessage />
                                                                </FormItem>
                                                            )}
                                                        />
                                                    </div>
                                                </CardContent>
                                            </Card>
                                            <Card
                                                className="overflow-hidden" x-chunk="dashboard-07-chunk-4"
                                            >
                                                <CardHeader>
                                                    <CardTitle>Image Reference Section</CardTitle>
                                                    <CardDescription>
                                                        Image as proof of payment.
                                                    </CardDescription>
                                                </CardHeader>
                                                <CardContent>
                                                    <div className="grid gap-2">
                                                        <div className="w-full h-full">
                                                            <AspectRatio ratio={4/3} className="bg-muted">
                                                                <Image
                                                                    alt="Product image"
                                                                    fill
                                                                    className="h-full w-full rounded-md object-cover"
                                                                    src={(imageUrl) ? imageUrl : currentImage}
                                                                />
                                                            </AspectRatio>
                                                        </div>
                                                        <div className="grid grid-cols-1 gap-2">
                                                        <CldUploadWidget onUpload={onUpload} uploadPreset="stivkcjg">
                                                            {({ open }) => {
                                                                const onClick = () => {
                                                                    open();
                                                                }   

                                                                return (
                                                                    <Button
                                                                        type="button"
                                                                        disabled={isLoading}
                                                                        variant="secondary"
                                                                        onClick={onClick}
                                                                    >
                                                                        <ImagePlus className="h-4 w-4 mr-2" />
                                                                        Upload GCash Image
                                                                    </Button>
                                                                );
                                                            }}
                                                        </CldUploadWidget>
                                                        </div>
                                                    </div>
                                                </CardContent>
                                            </Card>
                                            <Card x-chunk="dashboard-07-chunk-3">
                                            <CardHeader>
                                                <CardTitle>Submit Area</CardTitle>
                                            </CardHeader>
                                            <CardContent>
                                                <div className="flex gap-3 items-center justify-end">
                                                    <Button
                                                        disabled={isLoading} 
                                                        type="button" 
                                                        onClick={onClearForm} 
                                                        variant='outline'
                                                        size="sm"
                                                    >
                                                        Reset Product
                                                    </Button>
                                                    <Button 
                                                        disabled={isLoading} 
                                                        size="sm"
                                                    >
                                                        Update Product
                                                    </Button>
                                                </div>
                                            </CardContent>
                                            </Card>
                                        </div>
                                        </div>
                                    </div>
                                    </main>
                                </div>
                            </div>
                        </form>
                    </Form>
                </ScrollArea>
            </DialogContent>
        </Dialog>
    )
}