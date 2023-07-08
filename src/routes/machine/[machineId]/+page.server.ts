import faunaPkg from 'faunadb';
import type { Machine } from "../../../interfaces";
import { flat } from "../../../pureFunctions";
import { FAUNA_SECRET, FAUNA_ENDPOINT } from '$env/static/private';

const { Client, query } = faunaPkg;

const client = new Client({
  secret: FAUNA_SECRET,
  endpoint: FAUNA_ENDPOINT,
});

export async function load({ params }: { params: any }) {
  const machine: Machine = await client
    .query(query.Get(query.Ref(query.Collection('Machines'), params.machineId)))
    .then((res) => flat(res));
  return { machine };
}
