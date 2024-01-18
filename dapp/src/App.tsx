import { FormEvent, useEffect, useState } from "react";
import { KilnLogoShort, LoadingIcon } from "./Icons";
import {
  useAccount,
  useConnect,
  useReadContract,
  useWaitForTransactionReceipt,
  useWriteContract,
} from "wagmi";
import { CHAT_ABI } from "./abi";
import { injected } from "wagmi/connectors";

const address = import.meta.env.VITE_CHAT_ADDRESS as `0x${string}`;

function App() {
  const [message, setMessage] = useState("");

  const is_connected = Boolean(useAccount().address);
  const { connect, isPending: is_wallet_conneting } = useConnect();

  const { data, isLoading, refetch } = useReadContract({
    address,
    abi: CHAT_ABI,
    functionName: "renderMessages",
  });

  const {
    data: hash,
    writeContractAsync,
    isPending: is_signing_pending,
  } = useWriteContract();

  const { isLoading: is_submit_pending, error } = useWaitForTransactionReceipt({
    hash,
  });

  const is_tx_pending = is_submit_pending || is_signing_pending;

  const resetChallenge = async () => {
    await writeContractAsync({
      abi: CHAT_ABI,
      address,
      functionName: "reset",
    });
  };

  const sendMessage = async (e: FormEvent) => {
    e.preventDefault();

    if (message.length === 0) return;

    await writeContractAsync({
      abi: CHAT_ABI,
      address,
      functionName: "sendMessage",
      args: [message],
    });
    setMessage("");
  };

  useEffect(() => {
    if (!is_tx_pending) {
      refetch();
    }
  }, [is_tx_pending, refetch]);

  useEffect(() => {
    if (error) {
      alert(error.message);
    }
  }, [error]);

  return (
    <>
      <header className="self-center my-8">
        <h1 className="text-xl flex gap-2">
          <KilnLogoShort className="w-6 h-6" /> Case study
        </h1>
      </header>

      <main className="w-full flex flex-col">
        <p className="self-center mb-8">
          Call the{" "}
          <code className="px-1 py-0.5 bg-gray-50 rounded border">kiln</code>{" "}
          function
        </p>

        <section className="self-center flex flex-col gap-6 w-full max-w-2xl border p-4 rounded">
          <h2 className="border-b pb-3">Latest messages</h2>

          {isLoading ? (
            <p>Loading...</p>
          ) : data && data !== "<ul></ul>" ? (
            <div
              className="[&>ul]:flex [&>ul]:gap-4 pl-3 [&>ul]:flex-col [&>ul>li]:p-2 [&>ul>li]:border [&>ul>li]:rounded [&>ul>li]:bg-gray-50"
              dangerouslySetInnerHTML={{ __html: data }}
            />
          ) : (
            <p>No messages yet</p>
          )}

          {is_connected ? (
            <form onSubmit={sendMessage} className="flex gap-2">
              <input
                placeholder="Message"
                onChange={(e) => setMessage(e.target.value)}
                type="text"
                className="w-full border rounded px-3 py-1"
              />

              <button
                type="submit"
                disabled={message.length === 0 || is_tx_pending}
                className="bg-orange-500 text-white flex gap-2 items-center rounded px-3 py-1"
              >
                {is_tx_pending && <LoadingIcon className="w-4 h-4" />} Send
              </button>
            </form>
          ) : (
            <button
              disabled={is_wallet_conneting}
              onClick={() => connect({ connector: injected() })}
              className="bg-orange-500 text-white flex gap-2 items-center rounded px-3 py-1"
            >
              {is_wallet_conneting && <LoadingIcon className="w-4 h-4" />}{" "}
              Connect wallet
            </button>
          )}
        </section>
      </main>

      <footer className="mt-auto flex justify-center p-1">
        <button className="hover:underline" onClick={resetChallenge}>
          reset challenge
        </button>
      </footer>
    </>
  );
}

export default App;
