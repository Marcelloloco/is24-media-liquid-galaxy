export interface Property {
   counter: String;
    id: String;
    title: String;
    titlePicture: String;
    address: {
      street: String;
      houseNumber: String;
      postcode: String;
      city: String;
      quarter: String;
      wgs84Coordinate: {
        latitude: Number;
        longitude: Number;
      };
      preciseHouseNumber: Boolean;
    };
}
