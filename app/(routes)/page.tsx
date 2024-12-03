import getBillboard from "@/actions/get-billboard";
import getProducts from "@/actions/get-products";
import Billboard from "@/components/billboard";
import ProductList from "@/components/product-list";
import Container from "@/components/ui/container";
import VideoBillboard from "@/components/video-billboard";

export const revalidate = 0;

const HomePage = async () => {
    const products = await getProducts({ isFeatured: true });
    const billboard = await getBillboard("16b75cee-a720-457c-9027-eb3821e42aea");

    return (
        <div className="dark:bg-black bg-white dark:bg-grid-small-orange/[0.2] bg-grid-small-rose-400/95 relative">
            <div className="absolute pointer-events-none inset-0 flex items-center justify-center dark:bg-black bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"></div>            
            <Container>
                <div className="space-y-10 pb-10">
                    <VideoBillboard data={billboard} />
                    <div className="flex flex-col gap-y-8 px-4 sm:px-6 lg:px-8">    
                        <ProductList title="Featured Products" items={products} />
                    </div>
                </div>
            </Container>
        </div>
    );
}
 
export default HomePage;