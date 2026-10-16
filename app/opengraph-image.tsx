/* eslint-disable @next/next/no-img-element */
import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { LIVE_LABEL } from "@/lib/event";

export const alt = "Pré-Black Bengô Açaí — live exclusiva para futuros franqueados";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const asset = (file: string) => readFile(join(process.cwd(), "assets/og", file));
const dataUri = (buf: Buffer) => `data:image/png;base64,${buf.toString("base64")}`;

const Image = async () => {
  const [black, bold, regular, tigela, simbolo] = await Promise.all([
    asset("Kanit-Black.ttf"),
    asset("Kanit-Bold.ttf"),
    asset("Kanit-Regular.ttf"),
    asset("tigela.png"),
    asset("simbolo.png"),
  ]);

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          position: "relative",
          background: "#0e0d1c",
          fontFamily: "Kanit",
          color: "white",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            position: "absolute",
            left: -420,
            top: -420,
            width: 1300,
            height: 1300,
            borderRadius: 1300,
            background: "radial-gradient(circle, rgba(113,0,78,0.85) 0%, rgba(113,0,78,0.35) 40%, rgba(113,0,78,0) 70%)",
          }}
        />
        <div
          style={{
            position: "absolute",
            right: -120,
            top: 40,
            width: 700,
            height: 700,
            borderRadius: 700,
            background: "radial-gradient(circle, rgba(151,206,37,0.35) 0%, rgba(151,206,37,0) 65%)",
          }}
        />
        <img alt="" src={dataUri(tigela)} width={440} height={443} style={{ position: "absolute", right: 36, top: 94 }} />

        <div style={{ display: "flex", flexDirection: "column", padding: "52px 64px", width: 780, position: "relative" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
            <img alt="" src={dataUri(simbolo)} width={52} height={52} />
            <span style={{ fontSize: 34, fontWeight: 700 }}>Bengô Açaí</span>
          </div>

          <div
            style={{
              display: "flex",
              marginTop: 34,
              alignSelf: "flex-start",
              padding: "8px 20px",
              borderRadius: 999,
              border: "2px solid rgba(151,206,37,0.6)",
              background: "rgba(151,206,37,0.12)",
              color: "#97ce25",
              fontSize: 24,
              fontWeight: 700,
              letterSpacing: 2,
              textTransform: "uppercase",
            }}
          >
            {`Live exclusiva · ${LIVE_LABEL}`}
          </div>

          <div style={{ display: "flex", flexDirection: "column", marginTop: 22, fontSize: 116, fontWeight: 900, lineHeight: 0.9 }}>
            <span>PRÉ-BLACK</span>
            <span style={{ color: "#97ce25" }}>BENGÔ</span>
          </div>

          <span style={{ marginTop: 26, fontSize: 30, fontWeight: 400, color: "rgba(255,255,255,0.85)", lineHeight: 1.3, width: 640 }}>
            A condição de franquia mais agressiva do ano, liberada ao vivo. Só no grupo VIP.
          </span>
        </div>

        <div style={{ position: "absolute", left: 0, right: 0, bottom: 0, height: 14, display: "flex", background: "linear-gradient(90deg, #97ce25, #71004e)" }} />
      </div>
    ),
    {
      ...size,
      fonts: [
        { name: "Kanit", data: black, weight: 900, style: "normal" },
        { name: "Kanit", data: bold, weight: 700, style: "normal" },
        { name: "Kanit", data: regular, weight: 400, style: "normal" },
      ],
    },
  );
};

export default Image;
