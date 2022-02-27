import React from "react";
import { useRouter } from "next/router";
import { baseUrl, FetchApi } from "../utils/FetchApi";
import { FaBath, FaBed } from "react-icons/fa";
import Link from "next/link";
import SearchFilters from "../components/SearchFilters";
import millify from "millify";
const Search = ({ properties }) => {
  const router = useRouter();
  return (
    <>
      <div className="flex justify-center items-center w-screen h-24 bg-red-400">
        <SearchFilters />
      </div>

      <h1 className="px-8 py-8 text-4xl">Property {router.query.purpose} </h1>

      <div className="flex w-screen">
        <div className="w-screen px-4 grid grid-cols-6 gap-4 py-4">
          {properties.map((property) => (
            <>
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
            </>
          ))}
        </div>

        {properties.length === 0 && (
          <h1 className="text-center w-screen text-2xl">NO RESULTS FOUND</h1>
        )}
      </div>
    </>
  );
};

export default Search;

export async function getServerSideProps({ query }) {
  const purpose = query.purpose || "for-rent";
  const rentFrequency = query.rentFrequency || "yearly";
  const minPrice = query.minPrice || "0";
  const maxPrice = query.maxPrice || "1000000";
  const roomsMin = query.roomsMin || "0";
  const bathsMin = query.bathsMin || "0";
  const sort = query.sort || "price-desc";
  const areaMax = query.areaMax || "35000";
  const locationExternalIDs = query.locationExternalIDs || "5002";
  const categoryExternalID = query.categoryExternalID || "4";
  const data = await FetchApi(
    `${baseUrl}/properties/list?locationExternalIDs=${locationExternalIDs}&purpose=${purpose}&categoryExternalID=${categoryExternalID}&bathsMin=${bathsMin}&rentFrequency=${rentFrequency}&priceMin=${minPrice}&priceMax=${maxPrice}&roomsMin=${roomsMin}&sort=${sort}&areaMax=${areaMax}`
  );

  return {
    props: {
      properties: data?.hits,
    },
  };
}
