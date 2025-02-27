"use client";

import { SchematicEmbed as SchematicEmbedComponent } from "@schematichq/schematic-components";

const SchematicEmbed = ({
  accessToken,
  componentId,
}: {
  accessToken: string;
  componentId: string;
}) => {
  //   const token = " ... ";
  //   const componentId = "cmpn_DP3KTsEkCeW";

  return <SchematicEmbedComponent accessToken={accessToken} id={componentId} />;
};
export default SchematicEmbed;
