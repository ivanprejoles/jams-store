"use client"

import Image from "next/image";
import { Tab } from "@headlessui/react";

import { Image as Imagetype } from "@/types" ;

import GalleryTab from "./gallery-tab";
import { Lens } from "../ui/lens";
import { useState } from "react";
import { motion } from "framer-motion";
interface GalleryProps {
    images: Imagetype[];
}

const Gallery: React.FC<GalleryProps> = ({
    images
}) => {
    const [hovering, setHovering] = useState(false);

    return (
        <Tab.Group as="div" className="flex flex-col-reverse">
            <div className="mx-auto mt-6 hidden w-full max-w-2xl sm:block lg:max-w-none">
                <Tab.List className="grid grid-cols-4 gap-6">
                    {images.map((image) => (
                        <GalleryTab key={image.id} image={image} />
                    ))}
                </Tab.List>
            </div>
            <Tab.Panels className="aspect-square w-full">
                {images.map((image) => (
                    <Tab.Panel key={image.id}>
                        <Lens hovering={hovering} setHovering={setHovering}>
                            <div className="relative z-10 aspect-square h-full w-full sm:rounded-lg overflow-hidden">
                                <Image
                                    src={image.url}
                                    alt="image"
                                    fill
                                    className="object-cover object-center"
                                />
                            </div>
                        </Lens>
                    </Tab.Panel>
                ))}
            </Tab.Panels>
        </Tab.Group>
    );
}
 
export default Gallery;