import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import styles from "../styles/Home.module.css";
import { baseUrl, FetchApi } from "../utils/FetchApi";
export default function Home({ propertiesForRent, propertiesForSale }) {
  console.log(propertiesForRent);
  console.log(propertiesForSale);

  return (
    <>
      <div className="flex w-screen py-14 justify-center items-center flex-col">
        <h1 className="text-red-400 text-4xl">Realtoz</h1>
        <Link href="/search?purpose=for-rent">
          <button className="mt-14 w-44 h-8 rounded-lg text-white bg-blue-400 px-2 py2">
            For Rent
          </button>
        </Link>
        <Link href="/search?purpose=for-sale">
          <button className="mt-14 w-44 h-8 rounded-lg text-white bg-green-400 px-2 py2">
            For Sale
          </button>
        </Link>
        {propertiesForRent.map((property) => (
          <div className="w-screen px-4 grid grid-cols-4 gap-4 py-4">
            <img src={property.coverPhoto.url} alt="" />
            <p>NAME : {property.contactName.slice(0, 20)}</p>
            <p>BATHS : {property.baths}</p>

            <p>PRICE : {property.price}</p>
          </div>
        ))}
      </div>
    </>
  );
}

export async function getStaticProps() {
  const propertyForSale = await FetchApi(
    `${baseUrl}/properties/list?locationExternalIDs=5002&purpose=for-sale&hitsPerPage=6`
  );
  const propertyForRent = await FetchApi(
    `${baseUrl}/properties/list?locationExternalIDs=5002&purpose=for-rent&hitsPerPage=4`
  );

  return {
    props: {
      propertiesForSale: propertyForSale?.hits,
      propertiesForRent: propertyForRent?.hits,
    },
  };
}
