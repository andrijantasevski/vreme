export default function getCoordinatesFromBrowser() {
  return new Promise<{ latitude: number; longitude: number }>(
    (resolve, reject) => {
      navigator.geolocation.getCurrentPosition(
        (data) =>
          resolve({
            latitude: data.coords.latitude,
            longitude: data.coords.longitude,
          }),
        reject
      );
    }
  );
}
