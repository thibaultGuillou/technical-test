import SensorChart from '@components/SensorChart';
import { SitesList } from '@elements/SitesList';
import { useQuerySitesList } from '@hooks';
import { useState } from 'react';


const Sites = () => {
  const { data: sitesListData } = useQuerySitesList();
  const [selectedSiteId, setSelectedSiteId] = useState<number | undefined>(undefined);

  return (
    <>
      <div className="card">
        <h3 className="mb-2">Projets</h3>
        <div className="col-span-2">
          <SitesList
            sites={sitesListData}
            siteId={{ state: selectedSiteId, setState: setSelectedSiteId }}
          />
        </div>
        {selectedSiteId && (
          <div className="mt-4">
            <SensorChart siteId={selectedSiteId} />
          </div>
        )}
      </div>
    </>
  );
};

export default Sites;
