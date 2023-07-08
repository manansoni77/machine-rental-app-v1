import faunaPkg from "faunadb";
import type { Machine, Market_Option } from "../../interfaces";
import { flat } from "../../pureFunctions";
import { FAUNA_SECRET, FAUNA_ENDPOINT } from '$env/static/private';

const { Client, query } = faunaPkg;

const client = new Client({
  secret: FAUNA_SECRET,
  endpoint: FAUNA_ENDPOINT,
});

export async function load() {
  const machines: Machine[] = await client
    .query(
      query.Map(
        query.Paginate(query.Documents(query.Collection("Machines"))),
        query.Lambda((x) => query.Get(x))
      )
    )
    .then((res) => flat(res));
  const market_options: Market_Option[] = await client
    .query(
      query.Map(
        query.Paginate(query.Documents(query.Collection("FilterOptions"))),
        query.Lambda((x) => query.Get(x))
      )
    )
    .then((res) => flat(res));
  return { machines, market_options };
}
