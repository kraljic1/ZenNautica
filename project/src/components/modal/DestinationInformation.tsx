import React from 'react';
import { Info, Navigation, Ship, Clock } from 'lucide-react';

interface DestinationInformationProps {
  name: string;
  description: string;
  distance: string;
  duration: string;
}

const DestinationInformation: React.FC<DestinationInformationProps> = ({
  name,
  description,
  distance,
  duration
}) => {
  const getDifficulty = () => {
    switch (name) {
      case "Otok Cres": return "Moderate";
      case "Otok Rab": return "Easy";
      case "Otok Grgur": return "Easy";
      case "Otok Plavnik": return "Moderate";
      case "Krug oko Krka": return "Moderate";
      default: return "N/A";
    }
  };

  return (
    <div className="destination-info">
      <h2 className="destination-info__title">{name}</h2>
      
      <div className="destination-info__grid">
        <div className="space-y-6">
          <section className="destination-info__section">
            <h3 className="destination-info__section-title">
              <Info className="destination-info__section-icon" />
              About
            </h3>
            <p className="destination-info__description">{description}</p>
          </section>

          <section className="destination-info__section">
            <h3 className="destination-info__section-title">
              <Navigation className="destination-info__section-icon" />
              Distance & Duration
            </h3>
            <div className="destination-info__details">
              <div>
                <p className="destination-info__detail-label">Distance from Malinska</p>
                <p className="destination-info__detail-value">{distance}</p>
              </div>
              <div>
                <p className="destination-info__detail-label">Average Duration</p>
                <p className="destination-info__detail-value">{duration}</p>
              </div>
            </div>
          </section>
        </div>

        <div className="space-y-6">
          <section className="destination-info__section">
            <h3 className="destination-info__section-title">
              <Ship className="destination-info__section-icon" />
              Trip Details
            </h3>
            <div className="destination-info__details">
              <div>
                <p className="destination-info__detail-label">Best Time</p>
                <p className="destination-info__detail-value">9:00 - 18:00</p>
              </div>
              <div>
                <p className="destination-info__detail-label">Difficulty</p>
                <p className="destination-info__detail-value">{getDifficulty()}</p>
              </div>
            </div>
          </section>

          <section className="destination-info__tips">
            <h3 className="destination-info__tips-title">
              <Clock className="destination-info__tips-icon" />
              Planning Tips
            </h3>
            <ul className="destination-info__tips-list">
              <li>Best to start early in the morning</li>
              <li>Check weather conditions before departure</li>
              <li>Bring essential items (sunscreen, water, snacks)</li>
              <li>Consider wind conditions for optimal route</li>
            </ul>
          </section>
        </div>
      </div>
    </div>
  );
};

export default DestinationInformation;