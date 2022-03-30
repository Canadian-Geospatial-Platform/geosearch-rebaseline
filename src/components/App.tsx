import React, { useEffect, useState } from 'react';

import makeStyles from '@mui/styles/makeStyles';

import Header from './header/header';
// import MetaDataPage from './search/metadatapage';
// import RampViewer from './rampviewer/rampviewer';
import { HowtoPanel } from './howto/howto-panel';

import CgpModal from './modal/cgpmodal';
import MappingModal from './modal/mappingmodal';

import { MapPosition } from './MapPosition';
import { PanelContent } from './PanelContent';
import translations from './translations.json';

/**
 * main container and map styling
 */
const useStyles = makeStyles((theme) => ({
  container: {
    height: '100%',
  },
}));

// get reference to window object
const w = window as any;

// get reference to geoview apis
const cgpv = w['cgpv'];

/**
 * Create a container containing a leaflet map using the GeoView viewer
 *
 * @returns {JSX.Elemet} the element that creates the container and the map
 */
const App = (): JSX.Element => {
  const classes = useStyles();
  const [siteLang, setLang] = useState<'en-CA' | 'fr-CA'>('en-CA');
  const [showmappinglist, setSML] = useState(false);
  /**
   * initialize the map after it has been loaded
   */
  useEffect(() => {
    cgpv.init(() => {
      /**
       * translations object to inject to the viewer translations
       */
      
      // create a new component on the leaflet map after it has been rendered

      /**
       * First parameter is the id of that new component
       * the id can be used to remove the added component using the .removeComponent(id) function
       *
       * Second parameter is the component to add, this can be a react component written in JSX
       * or HTML created using React.createElement
       */
      // get map instance
      const mapInstance = cgpv.api.map('mapWM');

      // add custom languages
      mapInstance.i18nInstance.addResourceBundle(
        'en-CA',
        'translation',
        translations['en-CA'],
        true,
        false,
      );
      mapInstance.i18nInstance.addResourceBundle(
        'fr-CA',
        'translation',
        translations['fr-CA'],
        true,
        false,
      );

      // get language
      const { language }: { language: 'en-CA' | 'fr-CA' } = mapInstance;
      
      // cgpv.api.map('mapWM').addComponent('text', <MapPosition />);
      mapInstance.addComponent('text', <Header language={language} changeLanguage = {(lang: 'en-CA' | 'fr-CA')=>mapInstance.changeLanguage(lang)} mappingClick={() => setSML(!showmappinglist)} />);


      // remove existing default panel
      mapInstance.appBarButtons.removeAppbarPanel('default-panel');

      // button props
      const howtoButton = {
        // set ID to testPanelButton so that it can be accessed from the core viewer
        id: 'howtoPanelButton',
        tooltip: translations[language]['howto'],
        tooltipPlacement: 'right',
        icon: '<i class="material-icons">help_outline</i>',
        visible: true,
        type: 'icon',
      };

      // panel props
      const howtoPanel = {
        title: translations[language]['howto'],
        icon: '<i class="material-icons">help_outline</i>',
        width: 300,
      };

      // create a new button panel on the appbar
      const howtoButtonPanel = cgpv.api
        .map('mapWM')
        .appBarButtons.createAppbarPanel(howtoButton, howtoPanel, null);

      // set panel content
      howtoButtonPanel?.panel?.changeContent(
        // <PanelContent buttonPanel={buttonPanel} mapId={'mapWM'} />,
        <HowtoPanel buttonPanel={howtoButtonPanel} language={language} mapId={'mapWM'} />
      );
      setLang(language);
    });
  }, []);

  return (
    <div className="mapPage">
      <CgpModal
        className="cgp-modal-dialog"
        wrapClassName="cgp-modal-wrap"
        modalClassName="cgp-modal"
        openOnLoad
        center
        unmountOnClose
        language={siteLang}
      />
      <MappingModal
        className="mapping-modal-dialog"
        wrapClassName="mapping-modal-wrap"
        modalClassName="mapping-modal"
        isTestDemo={true}
        openOnLoad={showmappinglist}
        toggle={() => setSML(!showmappinglist)}
        onClosed = {null}
        language={siteLang}
      />
      <div className="mapContainer">
        <div
          id="mapWM"
          className="llwp-map"
          style={{
            width: '100%',
            height: 'calc(100vh - 90px)',
          }}
          data-leaflet="{ 'name': 'Web Mercator', 'projection': 3857, 'zoom': 4, 'center': [60,-100], 'language': 'en-CA', 'basemapOptions': { 'id': 'transport', 'shaded': false, 'labeled': true }, 'layers': [] } "
        ></div>
      </div>
    </div>  
  );
};

export default App;
