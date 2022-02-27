import React from "react";
import { baseUrl, FetchApi } from "../../utils/FetchApi";

const PropertyDetails = ({
  PropertyDetails: {
    coverPhoto,
    price,
    contactName,
    rooms,
    title,
    baths,
    description,
  },
}) => {
  return (
    <div className="px-14 py-14 flex flex-col justify-center items-center">
      <div className="bg-red-400 w-96 h-64">
        <img src={coverPhoto.url} alt="" />
      </div>
      <h1 className="text-5xl">{contactName}</h1>
      <div className="py-4 text-4xl">
        <h1>{title}</h1>
      </div>
      <div className="py-4">
        <p>{description}</p>
      </div>
      <div className="py-4 text-2xl flex space-x-10">
        <p>BATHS : {baths}</p>
        <p>ROOMS : {rooms}</p>
        <p>PRICE : {price}</p>
      </div>
    </div>
  );
};

export default PropertyDetails;

export async function getServerSideProps({ params: { id } }) {
  const data = await FetchApi(`${baseUrl}/properties/detail?externalID=${id}`);

  return {
    props: {
      PropertyDetails: data,
    },
  };
}
