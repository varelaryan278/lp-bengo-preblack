import { geolocation } from "@vercel/functions";

export const GET = (request: Request) => {
  const { city, countryRegion, country } = geolocation(request);
  return Response.json(
    { city: city ?? null, uf: countryRegion ?? null, country: country ?? null },
    { headers: { "Cache-Control": "private, no-store" } },
  );
};
