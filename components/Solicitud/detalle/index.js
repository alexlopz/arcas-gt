import TabPanel from "@components/tab-panel";
import InformacionBasica from "./basica";
import InformacionLogistica from "./logistica";
import InformacionSaludEmergencia from "./salud-emergencia";

export default function DetalleSolicitud(props) {
  const { solicitud } = props;

  return (
    <TabPanel solicitud={solicitud}>
      <InformacionBasica solicitud={solicitud} />
      {solicitud?.logistica && (
        <InformacionLogistica logistica={solicitud?.logistica} />
      )}
      {solicitud?.voluntario?.emergencia && (
        <InformacionSaludEmergencia voluntario={solicitud?.voluntario} />
      )}
    </TabPanel>
  );
}
