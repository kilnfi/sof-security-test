import { http, createConfig } from "wagmi";
import { holesky } from "wagmi/chains";

export const config = createConfig({
  chains: [holesky],
  transports: {
    [holesky.id]: http(import.meta.env.VITE_RPC_URL),
  },
});
