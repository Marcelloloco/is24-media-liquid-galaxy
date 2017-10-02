export interface Property {
   counter: string;
    id: string;
    panoId: string;
    title: string;
    titlePicture: string;
    address: {
      street: string;
      houseNumber: string;
      postcode: string;
      city: string;
      quarter: string;
      wgs84Coordinate: {
        latitude: number;
        longitude: number;
      };
      preciseHouseNumber: boolean;
    };
}
