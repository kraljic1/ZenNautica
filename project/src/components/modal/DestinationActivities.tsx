import React from 'react';
import { Activity } from 'lucide-react';

interface DestinationActivitiesProps {
  name: string;
  activities: string[];
}

const DestinationActivities: React.FC<DestinationActivitiesProps> = ({
  name,
  activities
}) => {
  return (
    <div className="destination-activities">
      <h2 className="destination-activities__title">Activities at {name}</h2>
      
      <div className="destination-activities__grid">
        {activities.map((activity, index) => (
          <div key={index} className="destination-activities__card">
            <div className="destination-activities__card-content">
              <div className="destination-activities__icon-container">
                <Activity className="destination-activities__icon" />
              </div>
              <div>
                <h3 className="destination-activities__activity-title">{activity}</h3>
                <p className="destination-activities__activity-subtitle">Available during your visit</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="destination-activities__guidelines">
        <h3 className="destination-activities__guidelines-title">Activity Guidelines</h3>
        <div className="destination-activities__guidelines-grid">
          <div className="destination-activities__guideline">
            <div className="destination-activities__guideline-dot" />
            <p>All activities are weather dependent and subject to seasonal conditions</p>
          </div>
          <div className="destination-activities__guideline">
            <div className="destination-activities__guideline-dot" />
            <p>Safety equipment is provided for water activities</p>
          </div>
          <div className="destination-activities__guideline">
            <div className="destination-activities__guideline-dot" />
            <p>Activities can be customized based on group preferences</p>
          </div>
          <div className="destination-activities__guideline">
            <div className="destination-activities__guideline-dot" />
            <p>Professional guidance available upon request</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DestinationActivities;