<script lang="ts">
  import { Datepicker } from "svelte-calendar";
  import dayjs from "dayjs";
  import type { Estimations } from "../../../interfaces/index.js";
  import DownloadIcon from "../../../icons/downloadIcon.svelte";

  export let data;

  const theme = {
    calendar: {
      width: "700px",
      maxWidth: "50vh",
      shadow: "0px 0px 5px rgba(0, 0, 0, 0.25)",
    },
  };
  const extraInfo = { a: "aaa", b: "bbb", c: "ccc", d: "ddd" };
  const faqs = [
    {
      qn: "Is the machine same as the one in the image?",
      ans: "Yes, it is the exact same machine, all pictures are clicked and submitted by the leaser",
    },
    {
      qn: "Will driver be included with the machine for operating it, or will we have to get our own driver?",
      ans: "The driver will be provided with the machine and also to look after it, during the work period he is the only one that will be authorised to operate the machine",
    },
    {
      qn: "What if any will be the delivery fees of the machine to the site?",
      ans: "The delivery fees will be dependent on the distance of the work site from the leaser's location and will be borne by the renter",
    },
  ];
  const estimations: Estimations = {
    days: { value: "-", suffix: " days" },
    rent: { value: data.machine.Rent, suffix: " ₹ per day" },
    cost: { value: "-", suffix: " ₹" },
  };
  let storeStart: any, storeEnd: any;
  let downloadLink: HTMLAnchorElement;
  $: machine = data.machine;

  function estimateCosts() {
    const startDay = dayjs(storeStart.getState().selected);
    const endDay = dayjs(storeEnd.getState().selected);
    let days = endDay.diff(startDay, "day");
    estimations.days.value = days;
    estimations.cost.value = days * Number(estimations.rent.value);
    // startDay.format('DD/MM/YYYY'), endDay.format('DD/MM/YYYY')
  }

  const downloadContract = async () => {
    const res = await fetch(
      "https://pub-3bc74d921a6a4be993e38714c4250c3a.r2.dev/machine-rental-contract.pdf"
    );
    const file = await res.blob();
    downloadLink.href = URL.createObjectURL(file);
    downloadLink.download = "machine-rental-contract.pdf";
    downloadLink.click();
  };
</script>

<div class="px-6 py-2 w-full flex flex-col">
  <div class="w-full min-h-fit flex flex-row px-2 py-2 space-x-8 shrink-0">
    <img
      src={machine.img.src}
      alt={machine.img.alt}
      class="max-h-[50vh] relative z-[-1] aspect-square rounded-md shadow-[rgba(0,0,0,0.19)_0px_10px_20px,rgba(0,0,0,0.23)_0px_6px_6px] shadow-lg"
    />
    <div class="w-full h-auto flex flex-col justify-between">
      <h1 class="py-2 text-3xl font-bold">
        {machine.Model}
      </h1>
      <div class="w-full h-0.5 border-t-0 px-2 bg-slate-200" />
      <div class="flex-grow flex flex-col py-1 space-y-1">
        <table>
          {#each Object.entries(machine.highlight) as [key, value]}
            <tr>
              <td class="font-bold" colspan="1">{key}</td>
              <td colspan="1">{value}</td>
            </tr>
          {/each}
        </table>
      </div>
      <div class="w-full h-0.5 border-t-0 px-2 bg-slate-200" />
      <h2 class="py-2 text-xl font-medium">
        Rent - {machine.Rent} ₹ per day
      </h2>
    </div>
  </div>
  <div class="w-full h-full px-2 py-6">
    <table class="w-full border">
      {#each Object.entries(extraInfo) as [key, value]}
        <tr>
          <td class="w-[25%] border border-slate-300 bg-blue-100 px-4 py-2">
            {key}
          </td>
          <td class="w-[75%] border border-slate-300 px-4 py-2">
            {value}
          </td>
        </tr>
      {/each}
    </table>
  </div>
  <div class="w-full h-full px-2 py-6 space-y-2 flex flex-col">
    {#each faqs as { qn, ans }}
      <div>
        <p class="bg-blue-100 px-2 pb-2 pt-3 rounded-t-lg">
          {qn}
        </p>
        <p class="bg-slate-100 px-2 pt-2 pb-3 rounded-b-lg">
          {ans}
        </p>
      </div>
    {/each}
  </div>
  <div class="flex justify-between px-8">
    <div class="flex flex-col w-[40%] space-y-2">
      <div class="flex w-full space-x-4">
        <Datepicker {theme} start={new Date()} bind:store={storeStart} />
        <Datepicker {theme} start={new Date()} bind:store={storeEnd} />
        <button
          class="grow rounded-full bg-slate-200 py-2 text-lg font-semi"
          on:click={estimateCosts}>Estimate Cost</button
        >
      </div>
      <div class="flex flex-col space-y-2 px-4 py-2 text-xl">
        {#each Object.entries(estimations) as [_key, value]}
          <div class="flex space-x-2 w-full">
            <div class="w-1/2">
              <p class="font-bold">{value.value}</p>
              <hr />
            </div>
            <p>{value.suffix}</p>
          </div>
        {/each}
      </div>
    </div>
    <div class="w-1/3 flex flex-col space-y-2">
      <button
        on:click={downloadContract}
        class="grow rounded-full bg-slate-200 text-lg font-semi"
        ><div class="h-8 flex items-center justify-center space-x-2">
          <DownloadIcon />
          <p>Download Contract</p>
        </div></button
      >
      <button class="grow rounded-full bg-slate-200 text-lg font-semi"
        ><div class="h-8 flex items-center justify-center space-x-2">
          <DownloadIcon />
          <p>Upload Signed Contract</p>
        </div></button
      >
    </div>
  </div>
  <a class="hidden" bind:this={downloadLink} href="/" target="_blank">-</a>
</div>
