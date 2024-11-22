import { Billboard as BillboardType } from "@/types";
import { BackgroundBeamsWithCollision } from "./ui/background-beams-with-collision";
import { Beams, Rays } from "./billboard";

interface BillboardProps {
    data: BillboardType
}

const VideoBillboard: React.FC<BillboardProps> = ({
    data
}) => {

    
    return (
        <div className="p-4 sm:p-6 lg:p-8 rounded-xl overflow-hidden relative backdrop-blur-sm mt-4 mb-4 border-slate-600/30  dark:border-white/40 border ">
            {/* <Rays />
            <Beams /> */}
            <div
                className="rounded-xl relative aspect-square md:aspect-[2.4/1] overflow-hidden bg-cover z-10"
                style={{ backgroundImage: `url(${data?.imageUrl})`}}
            >
                <div className="h-full w-full flex flex-col justify-center items-center text-center gap-y-8">
                    <video
                        className="
                            absolute 
                            h-full
                            w-full
                            scale-x-105
                            top-0
                            object-cover
                            brightness-[110%]
                        "
                        autoPlay
                        muted
                        loop
                        poster='/logo.png'
                        src='https://res.cloudinary.com/dtx596wba/video/upload/v1732267593/xvubniq8jztw1qkyp7f5.mp4'
                    />
                    <div className="font-bold text-3xl sm:text-5xl lg:text-6xl sm:max-w-xl max-w-xs">
                        {data?.label}<br/>
                        <div className="relative mx-auto inline-block w-max [filter:drop-shadow(0px_1px_3px_rgba(27,_37,_80,_0.14))]">
                            <div className="absolute left-0 top-[1px] bg-clip-text bg-no-repeat text-transparent bg-gradient-to-r py-4 from-red-500 via-orange-500 to-yellow-500 [text-shadow:0_0_rgba(0,0,0,0.1)]">
                                <span className="">Jams Footwear.</span>
                            </div>
                            <div className="relative bg-clip-text text-transparent bg-no-repeat bg-gradient-to-r from-red-500 via-orange-500 to-yellow-500 py-4">
                                <span className="">Jams Footwear.</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* <BackgroundBeamsWithCollision  className="absolute top-0 left-0 w-full h-full">
                <div className=""></div>
            </BackgroundBeamsWithCollision> */}
        </div>
    );
}
 
export default VideoBillboard;