import getBillboard from "@/actions/get-billboard";
import getProducts from "@/actions/get-products";
import Billboard from "@/components/billboard";
import ProductList from "@/components/product-list";
import Container from "@/components/ui/container";

export const revalidate = 0;

const HomePage = async () => {
    const products = await getProducts({ isFeatured: true });
    const billboard = await getBillboard("2c19f539-3548-4484-af4b-7c3ce17b4f79");

    return (
        <div className="dark:bg-black bg-white dark:bg-grid-white/[0.2] bg-grid-rose-400/75 relative">
            <div className="absolute pointer-events-none inset-0 flex items-center justify-center dark:bg-black bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"></div>            
            <Container>
                <div className="space-y-10 pb-10">
                    <Billboard data={billboard} />
                    <div className="flex flex-col gap-y-8 px-4 sm:px-6 lg:px-8">
                        <ProductList title="Featured Products" items={products} />
                    </div>
                </div>
            </Container>
        </div>
    );
}
 
export default HomePage;