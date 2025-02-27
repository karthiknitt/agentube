import { getTemporaryAccessToken } from "@/actions/getTemporaryAccessToken";
import SchematicEmbed from "./SchematicEmbed";

async function SchematicComponent({ componentId }: { componentId: string }) {
  if (!componentId) return null;
  //Get Access Token
  const accessToken = await getTemporaryAccessToken();
  if (!accessToken) throw new Error("Missing Access Token");
  return <SchematicEmbed accessToken={accessToken} componentId={componentId} />;
}
export default SchematicComponent;
