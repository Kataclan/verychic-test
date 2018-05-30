import { IProduct } from "./IProduct";

/**
 * Get the array of products from Verychic API URL
 * @returns {Promise<IProduct[]>} - Array of products
 */
export const GetProductsAsync = function (): Promise<IProduct[]> {
    return new Promise<IProduct[]>(
        (resolve, reject) => {
            fetch("https://api.verychic.com/verychic-endpoints/v1/products.json?language=fr&currency=EUR&detailed=false&publishingStatus=nonexpired&size=3")
                .then(async (data: any) => {
                    let result = await data.json();
                    resolve(result.content as IProduct[]);
                })
                .catch(error => reject(error))
        }
    );
}