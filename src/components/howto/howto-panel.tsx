import translations from './translations.json';

interface PanelContentProps {
    mapId: string;
    buttonPanel: any;
    language: 'en-CA' | 'fr-CA';
  }
  
const w = window as any;
const cgpv = w['cgpv'];
  

export const HowtoPanel = (props: PanelContentProps) : JSX.Element => {
    const { language } = props;
    const { mui } = cgpv;
    const { SvgIcon, Typography } = mui;
    const filterIcon = <SvgIcon viewBox="0 0 32 32" className="svg-icons">
    <path d="M26,6v0.233l-8.487,9.43L17,16.233V17v7.764l-2-1V17v-0.767l-0.513-0.57L6,6.233V6H26 M28,4H4v3  l9,10v8l6,3V17l9-10V4L28,4z" />
  </SvgIcon>;
    return (
        <Typography variant="body2" color="textSecondary" component="div">
          <h3 className="section-title">
            <i className="material-icons">search</i> { translations[language]['search'] }
          </h3>
          <p>{translations[language]['geosearchdescription']}</p>
          <h3 className="section-title">
            {filterIcon} { translations[language]['filters'] }
          </h3>
          <p>{translations[language]['filtersdescription']}</p>
        </Typography>    
    );
}
