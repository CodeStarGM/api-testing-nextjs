import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import styles from "../styles/Home.module.css";
import { baseUrl, FetchApi } from "../utils/FetchApi";
import millify from "millify";
import { FaBath, FaBed } from "react-icons/fa";
export default function Home({ propertiesForRent, propertiesForSale }) {
  console.log(propertiesForRent);
  return (
    <>
      <div className="flex space-x-6 w-screen py-14 justify-center items-center ">
        <h1 className="text-red-400 text-4xl">Realtoz</h1>
        <Link href="/search?purpose=for-rent">
          <button className=" w-44 h-8 rounded-lg text-white bg-blue-600 px-2 py2">
            For Rent
          </button>
        </Link>
        <Link href="/search?purpose=for-sale">
          <button className=" w-44 h-8 rounded-lg text-white bg-green-600 px-2 py2">
            For Sale
          </button>
        </Link>
        <Link href="/search">
          <button className=" w-44 h-8 rounded-lg text-white bg-purple-500 px-2 py2">
            Search
          </button>
        </Link>
      </div>
      <div className="text-3xl font-bold flex justify-center items-center w-screen h-14 bg-gray-200">
        Properties For Rent
      </div>
      {propertiesForRent.map((property) => (
        <div className="w-screen px-4 grid grid-cols-6 gap-4 py-4">
          <img src={property.coverPhoto.url} alt="" />
          <div>
            <p>NAME : {property.contactName.slice(0, 20)}</p>
            <img
              src={property.agency?.logo?.url}
              style={{ width: 100, height: 50 }}
              alt=""
            />
          </div>
          <p className="flex items-center">
            <FaBath className="mx-1 " />
            BATHS : {property.baths}
          </p>
          <p className="flex items-center">
            <FaBed className="mx-1" />
            ROOMS : {property.rooms}
          </p>

          <p>
            PRICE : {millify(property.price)} / {property.rentFrequency}
          </p>

          <Link href={`/property/${property.externalID}`}>
            <button className="text-white font-bold text-xs bg-blue-600 w-24 h-8 rounded-lg">
              DETAILS
            </button>
          </Link>
        </div>
      ))}
      <div className="text-3xl font-bold flex justify-center items-center w-screen h-14 bg-gray-200">
        Properties For Sale
      </div>
      {propertiesForSale.map((property) => (
        <div className="w-screen px-4 grid grid-cols-6 gap-4 py-4">
          <img src={property.coverPhoto.url} alt="" />
          <div>
            <p>NAME : {property.contactName.slice(0, 20)}</p>
            <img
              src={property.agency?.logo?.url}
              style={{ width: 100, height: 50 }}
              alt=""
            />
          </div>
          <p className="flex items-center">
            <FaBath className="mx-1 " />
            BATHS : {property.baths}
          </p>
          <p className="flex items-center">
            <FaBed className="mx-1" />
            ROOMS : {property.rooms}
          </p>
          <p>PRICE : {millify(property.price)}</p>
          <Link href={`/property/${property.externalID}`}>
            <button className="text-white font-bold text-xs bg-green-600 w-24 h-8 rounded-lg">
              DETAILS
            </button>
          </Link>
        </div>
      ))}
    </>
  );
}

export async function getStaticProps() {
  const propertyForSale = await FetchApi(
    `${baseUrl}/properties/list?locationExternalIDs=5002&purpose=for-sale&hitsPerPage=6`
  );
  const propertyForRent = await FetchApi(
    `${baseUrl}/properties/list?locationExternalIDs=5002&purpose=for-rent&hitsPerPage=6`
  );

  return {
    props: {
      propertiesForSale: propertyForSale?.hits,
      propertiesForRent: propertyForRent?.hits,
    },
  };
}
