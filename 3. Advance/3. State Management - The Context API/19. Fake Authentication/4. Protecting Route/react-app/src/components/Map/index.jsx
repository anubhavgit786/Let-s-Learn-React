import React, { useEffect, useState } from 'react';
import styles from "./styles.module.css";
import { useNavigate } from 'react-router-dom';
import { MapContainer, TileLayer, Marker, Popup, useMap, useMapEvents } from 'react-leaflet';
import { useCities } from "../../contexts/CitiesContext";
import { useGeolocation } from '../../hooks/useGeolocation';
import { useURLPosition } from "../../hooks/useURLPosition";
import Button from "../Button";

const ChangeCenter = ({ position})=>
{

  const map = useMap();
  const zoomLevel = 6;
  map.setView(position, zoomLevel);
  return null;
}

const DetectClick = ()=>
{
  const navigate = useNavigate(); 
  useMapEvents(
  { 
    click: (e)=>
    {
      const lat = e.latlng.lat;
      const lng = e.latlng.lng;
      navigate(`form?lat=${lat}&lng=${lng}`);
    }
  });
}

const Map = () => 
{
 
  const { cities } = useCities();
  const [mapPosition, setMapPosition] = useState([40, 0]);
  const [mapLat, mapLng] = useURLPosition();

  const { isLoading:isLoadingPosition, position:geolocationPosition, getPosition } = useGeolocation();
  
 
  useEffect(()=>
  {
    if(mapLat && mapLng)
    {
      setMapPosition([mapLat, mapLng]);
    }

  }, [mapLat, mapLng])

  useEffect(()=>
  {
    if(geolocationPosition)
    {
      setMapPosition([geolocationPosition.lat, geolocationPosition.lng]);
    }
  }, [geolocationPosition])
  
  return (
    <div className={styles.mapContainer}>
      { !geolocationPosition && (<Button onClick={getPosition} type={"position"}>{isLoadingPosition ? "Loading....": "Use your position" }</Button>) }
      <MapContainer center={mapPosition} zoom={6} scrollWheelZoom={true} className={styles.map}>
        <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png"
          />
      { cities.map((city)=> (  
        <Marker position={[city.position.lat, city.position.lng]} key={city.id}>
          <Popup><span>{city.emoji}</span><span>{city.cityName}</span></Popup>
        </Marker>))}
        <ChangeCenter position={mapPosition}/>
        <DetectClick/>
    </MapContainer>
  </div>
  )
}

export default Map;
