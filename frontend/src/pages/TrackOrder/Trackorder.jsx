// // import React, { useState } from 'react'

// // const Trackorder = () => {
// //     const[latitude,setlatitude] = useState()
// //     const[lomgitude,setlongitude] = useState()
// //     const geo = navigator.geolocation
// //     geo.getCurrentPosition(userCoords)
// //     function userCoords(){
// //         let userlatitude = position.coords.latitude
// //         let userlongitude = position.coords.setlongitude
// //         console.log(userlatitude,userlongitude)
// //     }
// //     const getuseradd = async () =>{
// //         let url = `https://api.opencagedata.com/geocode/v1/json?key=c5a740ecb3d74680b77ea85c2250d5cf&q=${latitude}52.3877830%2C+${lomgitude}9.7334394&pretty=1&no_annotations=1`
// //         const loc = await fetch(url)
// //         const data = await loc.json
// //         console.log(data)
// //     }
// //     const handeladdress = ()=>{

// //     }
// //   return (
// //     <div>Trackorder
    
    
// //     </div>
// //   )
// // }

// // export default Trackorder

// import React, { useState, useEffect } from 'react';
// import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
// import L from 'leaflet';
// import 'leaflet/dist/leaflet.css';

// // Custom marker icon
// const customMarker = new L.Icon({
//   iconUrl: 'https://cdn-icons-png.flaticon.com/512/252/252025.png', // URL to your custom marker icon
//   iconSize: [32, 32],
// });

// const Trackorder = () => {
//   const [latitude, setLatitude] = useState(null);
//   const [longitude, setLongitude] = useState(null);
//   const [address, setAddress] = useState('');

//   useEffect(() => {
//     const geo = navigator.geolocation;
//     geo.getCurrentPosition(userCoords);
//   }, []);

//   const userCoords = (position) => {
//     const userLatitude = position.coords.latitude;
//     const userLongitude = position.coords.longitude;
//     setLatitude(userLatitude);
//     setLongitude(userLongitude);
//     console.log(userLatitude, userLongitude);
//     getUserAddress(userLatitude, userLongitude);
//   };

//   const getUserAddress = async (lat, lon) => {
//     const url = `https://api.opencagedata.com/geocode/v1/json?key=c5a740ecb3d74680b77ea85c2250d5cf&q=${lat}+${lon}&pretty=1&no_annotations=1`;
//     const loc = await fetch(url);
//     const data = await loc.json();
//     const formattedAddress = data.results[0]?.formatted;
//     setAddress(formattedAddress || 'Address not found');
//   };

//   return (
//     <div>
//       <h1>Track Order</h1>
//       <div>
//         {latitude && longitude ? (
//           <MapContainer center={[latitude, longitude]} zoom={13} style={{ height: '400px', width: '100%' }}>
//             <TileLayer
//               url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
//               attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
//             />
//             <Marker position={[latitude, longitude]} icon={customMarker}>
//               <Popup>
//                 Your Location <br /> {address}
//               </Popup>
//             </Marker>
//           </MapContainer>
//         ) : (
//           <p>Loading your location...</p>
//         )}
//       </div>
//     </div>
//   );
// };

// export default Trackorder;



import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import io from 'socket.io-client';

// Custom marker icon
const customMarker = new L.Icon({
  iconUrl: 'https://cdn-icons-png.flaticon.com/512/252/252025.png', // URL to your custom marker icon
  iconSize: [32, 32],
});

const Trackorder = () => {
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);
  const [riderLatitude, setRiderLatitude] = useState(null);
  const [riderLongitude, setRiderLongitude] = useState(null);
  const [address, setAddress] = useState('');
  
  // Initialize WebSocket connection
  useEffect(() => {
    const socket = io('http://localhost:3000'); // Change to your backend URL
    socket.on('riderLocation', (data) => {
      setRiderLatitude(data.latitude);
      setRiderLongitude(data.longitude);
    });
    
    return () => {
      socket.disconnect();
    };
  }, []);

  useEffect(() => {
    const geo = navigator.geolocation;
    geo.getCurrentPosition(userCoords);
  }, []);

  const userCoords = (position) => {
    const userLatitude = position.coords.latitude;
    const userLongitude = position.coords.longitude;
    setLatitude(userLatitude);
    setLongitude(userLongitude);
    console.log(userLatitude, userLongitude);
    getUserAddress(userLatitude, userLongitude);
  };

  const getUserAddress = async (lat, lon) => {
    const url = `https://api.opencagedata.com/geocode/v1/json?key=c5a740ecb3d74680b77ea85c2250d5cf&q=${lat}+${lon}&pretty=1&no_annotations=1`;
    const loc = await fetch(url);
    const data = await loc.json();
    const formattedAddress = data.results[0]?.formatted;
    setAddress(formattedAddress || 'Address not found');
  };

  return (
    <div>
      <h1>Track Order</h1>
      <div>
        {latitude && longitude ? (
          <MapContainer center={[latitude, longitude]} zoom={13} style={{ height: '400px', width: '100%' }}>
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />
            <Marker position={[latitude, longitude]} icon={customMarker}>
              <Popup>
                Your Location <br /> {address}
              </Popup>
            </Marker>
            {riderLatitude && riderLongitude && (
              <Marker position={[riderLatitude, riderLongitude]} icon={customMarker}>
                <Popup>
                  Rider's Location
                </Popup>
              </Marker>
            )}
          </MapContainer>
        ) : (
          <p>Loading your location...</p>
        )}
      </div>
    </div>
  );
};

export default Trackorder;

